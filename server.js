// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors()); // for dev: restrict in production
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error('OPENAI_API_KEY missing in .env');
  process.exit(1);
}

app.post('/api/predict', async (req, res) => {
  try {
    const { news, event } = req.body;
    if (!news || !event) return res.status(400).json({ error: 'news and event required' });

    // Build a focused prompt for the model
    const promptSystem = `
You are a careful historian and analyst. Given a modern news headline + snippet and a historical event (title, year, summary), produce:
1) a concise "similarity" sentence (what they share, tags/causes),
2) a short "historical outcome" summary (2-3 sentences) describing what happened after the historical event,
3) a cautious prediction (1-2 sentences) about plausible near-term outcomes if the modern event continues in a similar pattern,
4) a brief chain-of-thought style "reasoning" paragraph explaining your inference (2-4 sentences).
Return JSON with keys: similarity, outcomeSummary, prediction, reasoning.
Be concise, avoid hallucinated facts about modern events. When unsure, qualify your statements (e.g., "may", "could", "likely").
`;

    const promptUser = `
News:
Title: ${news.title}
Snippet: ${news.snippet}
Tags: ${JSON.stringify(news.tags || [])}

Historical Event:
Title: ${event.title}
Year: ${event.year}
Summary: ${event.summary}
Tags: ${JSON.stringify(event.tags || [])}
`;

    // Call OpenAI Chat Completions (gpt-3.5-turbo default)
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: promptSystem },
          { role: 'user', content: promptUser }
        ],
        temperature: 0.6,
        max_tokens: 500
      })
    });

    if (!apiRes.ok) {
      const txt = await apiRes.text();
      console.error('OpenAI API error', apiRes.status, txt);
      return res.status(502).send(txt);
    }

    const apiData = await apiRes.json();
    const content = apiData.choices?.[0]?.message?.content || '';

    // Try to parse JSON out of the response. If model returned text, fall back to simple extraction
    let parsed = null;
    try {
      // If model returned a JSON block, extract the first JSON object
      const firstJson = content.match(/\{[\s\S]*\}/);
      if (firstJson) parsed = JSON.parse(firstJson[0]);
    } catch (err) {
      // ignore JSON parse errors
    }

    if (!parsed) {
      // Fallback: attempt to split by headings
      parsed = {
        similarity: (() => {
          const m = content.match(/Similarity[:\-\s]*(.+)/i);
          return m ? m[1].trim().split('\n')[0] : content.slice(0, 140);
        })(),
        outcomeSummary: (() => {
          const m = content.match(/(Outcome|Historical outcome)[:\-\s]*([\s\S]*?)(Prediction|Prediction[:\-\s]|Reasoning|$)/i);
          return m ? m[2].trim() : '';
        })(),
        prediction: (() => {
          const m = content.match(/Prediction[:\-\s]*([\s\S]*?)(Reasoning|$)/i);
          return m ? m[1].trim().split('\n')[0] : '';
        })(),
        reasoning: (() => {
          const m = content.match(/Reasoning[:\-\s]*([\s\S]*)/i);
          return m ? m[1].trim() : '';
        })()
      };
    }

    return res.json(parsed);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'server error' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`AI proxy running on http://localhost:${port}`));
