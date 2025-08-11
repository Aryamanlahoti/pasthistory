import React, { useEffect, useMemo, useState, useRef } from "react";

/* ========================== BRAND ========================== */
const BRAND = "PastForward";

/* ============================================================
   CURATED PLAYBOOKS (high-precision)
   ============================================================ */
const PLAYBOOKS = [
  {
    id: "stagflation_energy",
    title: "Stagflation & Energy Shock",
    era: "1973–1982",
    tags: ["economy", "inflation", "energy", "supply"],
    keywords: ["inflation","cpi","cost","oil","gasoline","energy","prices","rate","price","subsidies"],
    summary:
      "Energy chokepoints and policy slippage lifted prices while growth sagged. Disinflation arrived only after credible tightening and time.",
    outcome:
      "Multiple recessions; unemployment rose; inflation broke following sustained policy tightening and structural efficiency gains.",
    signals: [
      "Large energy/food pass-through to headline prices",
      "Wage catch-up demands and indexation",
      "Policy hesitation or mixed guidance",
      "Rationing/price caps talk; subsidies to households",
    ],
    whatToWatch: [
      "Fuel inventories and shipping rates",
      "Inflation expectations & wage settlements",
      "Fiscal stance vs central bank guidance",
      "Sector-by-sector price diffusion",
    ],
    cases: [
      { name: "1973 Oil Crisis (US/EU)", year: 1973, result: "Rationing; speed limits; strategic reserves" },
      { name: "1979 Energy Shock (US)", year: 1979, result: "Tight policy; deep recession; inflation anchored" },
    ],
    scenarios: {
      baseline: "Prices stay sticky for 2–3 quarters; growth slows; gradual cooling as supply reroutes.",
      escalation: "Wage-price spiral risk if guidance weakens; deeper recession under forced disinflation.",
      deescalation: "Clear policy, targeted support, diversification cool inflation without severe output loss.",
    },
  },
  {
    id: "bank_panic",
    title: "Banking Panic / Liquidity Crunch",
    era: "1907, 2008–2009",
    tags: ["economy", "finance"],
    keywords: ["bank","run","liquidity","deposit","withdrawal","bailout","lender","contagion","credit"],
    summary:
      "When asset values fall and funding seizes, withdrawals and margin calls cascade across institutions.",
    outcome:
      "Containment required guarantees, capital injections, facility lines, and later reforms (FDIC expansions, stress tests, Basel III).",
    signals: [
      "Funding spreads widening quickly",
      "Insured vs uninsured deposit flight",
      "Fire-sales of assets, collateral calls",
      "Rumor-driven runs via social platforms",
    ],
    whatToWatch: [
      "Central bank facilities uptake",
      "Deposit mix; unrealized losses",
      "Interbank/CP spreads; CDS",
      "Regulatory communications",
    ],
    cases: [
      { name: "Panic of 1907 (US)", year: 1907, result: "Private pooling; later creation of the Federal Reserve" },
      { name: "Global Financial Crisis", year: 2008, result: "TARP, guarantees; multi-year recovery; tighter rules" },
    ],
    scenarios: {
      baseline: "Backstops stabilize funding; tighter credit weighs on growth.",
      escalation: "Contagion to multiple lenders; forced mergers; larger fiscal bill.",
      deescalation: "Transparent audits + guarantees restore confidence over months.",
    },
  },
  {
    id: "protest_wave",
    title: "Sustained Protest Cycle → Reform or Repression",
    era: "2011, 2019–2020",
    tags: ["politics", "protests"],
    keywords: ["protest","march","curfew","riot","strike","movement","square","security","law"],
    summary:
      "Bread-and-butter grievances + legitimacy crises mobilize crowds. Trajectories depend on security responses and elite splits.",
    outcome:
      "Some concessions and elections; elsewhere crackdowns or civil conflict; international attention alters incentives.",
    signals: [
      "Growing weekend peaks, better logistics, legal-aid tents",
      "Cross-class coalition with clear, limited demands",
      "Security tactics shift (restraint vs mass arrests)",
      "Livestreams and diaspora support",
    ],
    whatToWatch: [
      "Arrest numbers and charges",
      "Union participation and strikes",
      "Mediator presence (church/NGO/foreign)",
      "Elite defections or unity",
    ],
    cases: [
      { name: "Arab Spring (various)", year: 2011, result: "Mixed transitions and repression" },
      { name: "Hong Kong Protests", year: 2019, result: "Security law; reduced civil space" },
    ],
    scenarios: {
      baseline: "Negotiations on process reforms; protests ebb/flow with visible concessions.",
      escalation: "Violent episodes radicalize actors; emergency laws and broader arrests.",
      deescalation: "Verified reforms with timetables; third-party monitors; channeling into elections.",
    },
  },
  {
    id: "encryption_debate",
    title: "Encryption ‘Going Dark’ Debate",
    era: "1993–1996, 2015–present",
    tags: ["technology", "politics", "security"],
    keywords: ["encryption","lawful","access","backdoor","escrow","end","to","end","privacy","warrant","clipper"],
    summary:
      "Governments seek exceptional access; industry and researchers warn about systemic risk and circumvention.",
    outcome:
      "Key-escrow proposals withdrawn historically; strong encryption remained; debates recur with new legislation.",
    signals: [
      "Consultation papers and draft bills",
      "Coalitions of firms, academics, civil groups",
      "Court challenges and compliance timelines",
      "Cross-border data/interop frictions",
    ],
    whatToWatch: ["Scope of covered services/devices","Liability rules","Feasibility reviews","Allies’ alignment"],
    cases: [
      { name: "Clipper Chip", year: 1995, result: "Withdrawn after critique" },
      { name: "Apple–FBI", year: 2016, result: "No universal backdoor" },
    ],
    scenarios: {
      baseline: "Narrowed bill with oversight; prolonged litigation.",
      escalation: "Broad mandate passes; fragmented markets; chilling effect on secure apps.",
      deescalation: "Targeted warrants and device-side safety features without backdoors.",
    },
  },
  {
    id: "streaming_disruption",
    title: "Streaming Disrupts Legacy Media",
    era: "2007–2020",
    tags: ["technology", "economy"],
    keywords: ["streaming","youtube","cord","cutting","ratings","advertising","viewership","subscription"],
    summary:
      "On-demand shifts fragment audiences and budgets; legacy schedules lean on live events and news.",
    outcome:
      "Consolidation, telemetry metrics, creator partnerships, shorter seasons.",
    signals: [
      "Declining live ratings except sports/news",
      "Budget reallocations to digital",
      "Creator-economy tie-ups",
      "Exclusive platform deals",
    ],
    whatToWatch: ["ARPU/churn","Sports rights cycles","Ad-tech privacy changes","Regional quotas"],
    cases: [{ name: "Cable → Streaming", year: 2010, result: "Cord-cutting; bundle reconfigured" }],
    scenarios: {
      baseline: "Hybrid bundles; ad-supported tiers grow.",
      escalation: "Rights bidding wars squeeze margins; layoffs, consolidation.",
      deescalation: "Shared rights & interoperable IDs cut costs; steadier margins.",
    },
  },
  {
    id: "supply_chokepoint",
    title: "Maritime Chokepoint Disruption",
    era: "1956, 2021–2024",
    tags: ["supply", "economy"],
    keywords: ["canal","strait","shipping","reroute","container","port","embargo","blockade"],
    summary:
      "When canals/straits jam, transit times stretch and spot rates spike until carriers reroute and ports rebalance.",
    outcome:
      "Temporary scarcity and price spikes; medium-term rerouting and inventory changes.",
    signals: [
      "Backlogs/ETA slippage on key lanes",
      "Carrier advisories & surcharges",
      "Insurance changes on war-risk lanes",
      "Inventory prioritization memos",
    ],
    whatToWatch: ["Dwell time, blank sailings","Port throughput by lane","Airfreight substitution","Retail stockouts"],
    cases: [
      { name: "Suez Closure", year: 1956, result: "Cape reroute; cost/time up" },
      { name: "Ever Given / Suez", year: 2021, result: "Global backlog; months of normalization" },
    ],
    scenarios: {
      baseline: "Rates spike, then cool across 1–2 quarters; shelves stagger.",
      escalation: "Extended conflict/closure → multi-quarter disruption; inflation impulse.",
      deescalation: "Convoys and time windows clear queues; capacity rebalances.",
    },
  },
  {
    id: "data_privacy_backlash",
    title: "Data Privacy Backlash",
    era: "2018–present",
    tags: ["technology", "politics"],
    keywords: ["data","privacy","breach","consent","profile","surveillance","adtech","cookie"],
    summary:
      "Opaque data flows and profiling face regulatory scrutiny and advertiser flight.",
    outcome:
      "Fines, stricter consent, API changes, and audits; developers rework identity and measurement.",
    signals: [
      "Regulator inquiries & DPAs",
      "Advertiser boycotts",
      "SDK/API tightening",
      "Opt-out spikes",
    ],
    whatToWatch: ["Cross-app identifiers","Consent strings & dark-pattern claims","Data localization rules","Walled-garden shifts"],
    cases: [{ name: "Cambridge Analytica", year: 2018, result: "Fines; GDPR/CCPA momentum; API restrictions" }],
    scenarios: {
      baseline: "Compliance costs up; ad targeting shifts to contextual & first-party.",
      escalation: "Heavy fines + ban on cross-site tracking; small apps struggle.",
      deescalation: "Clear guidance; industry standards; stable ad yields.",
    },
  },
  {
    id: "public_health_outbreak",
    title: "Public Health Outbreak",
    era: "2003, 2020–2022",
    tags: ["health", "economy"],
    keywords: ["outbreak","virus","quarantine","mask","cases","hospital","variant","surge"],
    summary:
      "Early transparency, testing, and tracing change epidemic curves and economic impact.",
    outcome:
      "Containment (SARS) with months of disruption; large systemic shock (COVID-19) when delayed/mass spread.",
    signals: [
      "Hospital clusters, nosocomial spread",
      "Genomic surveillance reporting",
      "Border/testing policy shifts",
      "Vaccine/therapeutic timelines",
    ],
    whatToWatch: ["Rt and hospitalization trends","Testing positivity & coverage","Workplace/school guidance","Global variant detection"],
    cases: [
      { name: "SARS", year: 2003, result: "Contained after months; reporting rules strengthened" },
      { name: "COVID-19", year: 2020, result: "Global pandemic; sustained systemic impacts" },
    ],
    scenarios: {
      baseline: "Localized waves; targeted measures; modest economic drag.",
      escalation: "Widespread transmission; travel curbs; service-sector hit.",
      deescalation: "Rapid case-finding + vaccines/boosters; quick normalization.",
    },
  },
  {
    id: "territorial_fait_accompli",
    title: "Territorial Fait Accompli",
    era: "2014–present",
    tags: ["war", "diplomacy"],
    keywords: ["annexation","referendum","troops","border","occupation","sanctions"],
    summary:
      "Facts on the ground created quickly while diplomacy lags; disputes often freeze with sanctions and standoffs.",
    outcome:
      "Sanctions, military mobilization, long disputes, and occasional skirmishes along contact lines.",
    signals: [
      "Unmarked troops or rapid buildup",
      "Local political moves/referendums",
      "Sanctions & counter-sanctions",
      "Frozen-conflict indicators",
    ],
    whatToWatch: ["Logistics lines and depots","Third-party mediation prospects","Recognition votes & court cases","Cross-border trade adjustments"],
    cases: [{ name: "Crimea Annexation", year: 2014, result: "Annexation; sanctions; prolonged standoff" }],
    scenarios: {
      baseline: "Frozen conflict with periodic flare-ups; sanctions persist.",
      escalation: "Expanded operations; broader war; tighter sanctions.",
      deescalation: "Demilitarized buffer; partial deals; confidence measures.",
    },
  },
  {
    id: "alliance_crisis",
    title: "Alliance Crisis & Mobilization Trap",
    era: "1914, recurring",
    tags: ["war", "diplomacy", "security"],
    keywords: ["mobilization","alliance","border","ultimatum","drill","railhead","red","line"],
    summary:
      "Tight timetables and prestige costs compress decision windows, raising miscalculation risk.",
    outcome:
      "Escalation can leap from local incident to multi-party war; off-ramps: verified pull-backs, hotlines, and face-saving mediation.",
    signals: [
      "Overlapping exercises near borders",
      "Ultimatums with short deadlines",
      "Rail/air logistics activation",
      "Information blackouts or jamming",
    ],
    whatToWatch: ["Deconfliction hotline usage","Observer access to drills","Border crossing closures","Alliance statements timing"],
    cases: [{ name: "July Crisis → WWI", year: 1914, result: "Alliance commitments dragged many states into war" }],
    scenarios: {
      baseline: "Extended standoff; sporadic incidents; heavy signaling.",
      escalation: "Accident during drills; rapid mobilization; widened conflict.",
      deescalation: "Sequenced de-escalation; hotline & monitors; limited pull-backs.",
    },
  },

  // Extra curated topics
  {
    id: "election_integrity",
    title: "Election Integrity & Contested Results",
    era: "1876, 2000, 2019–2024",
    tags: ["politics"],
    keywords: ["election","ballot","recount","fraud","court","commission","transition","audit"],
    summary:
      "Close counts and disputed procedures shift resolution to courts/commissions; legitimacy hinges on transparency.",
    outcome:
      "Resolutions via recounts/courts/power-sharing; later procedural reforms.",
    signals: ["Parallel tabulations","Chain-of-custody fights","Board pressure","Observer statements"],
    whatToWatch: ["Margins vs thresholds","Uniform standards","Court calendars","Infra security"],
    cases: [
      { name: "US 1876", year: 1877, result: "Commission; political bargain" },
      { name: "US 2000", year: 2000, result: "Court decision; reforms" },
    ],
    scenarios: {
      baseline: "Court-driven resolution; reforms debate.",
      escalation: "Mass protests; dual slates.",
      deescalation: "Bipartisan audits; acceptance signals.",
    },
  },
  {
    id: "ai_regulation",
    title: "AI Regulation & Safety Regimes",
    era: "2023–present (echoes: nuclear/pharma)",
    tags: ["technology", "politics"],
    keywords: ["ai","model","safety","audits","licensing","compute","export","transparency"],
    summary:
      "Governments adapt safety regimes (testing, disclosure, incident reporting) from high-risk sectors to AI.",
    outcome:
      "Registries, audits, red-team standards; licensing for frontier systems in some jurisdictions.",
    signals: ["Model/eval rules","Compute thresholds","Incident databases","Audit markets"],
    whatToWatch: ["Alignment abroad","Open vs closed treatment","Liability","Export enforcement"],
    cases: [
      { name: "Nuclear safety regimes", year: 1957, result: "International standards" },
      { name: "Drug trials standards", year: 1962, result: "Phased trials; reporting" },
    ],
    scenarios: {
      baseline: "Risk-tiered rules; audit ecosystem grows.",
      escalation: "Low thresholds; SME burden high.",
      deescalation: "Harmonized baselines; interop.",
    },
  },
  {
    id: "sovereign_debt",
    title: "Sovereign Debt Stress & Restructuring",
    era: "1980s, 1998, 2010–2015",
    tags: ["economy", "finance"],
    keywords: ["default","haircut","imf","bond","rollover","swap","reserves","spread"],
    summary:
      "Interest burdens outpace capacity; states seek rollovers or restructure with official and private creditors.",
    outcome:
      "Haircuts/maturity extensions; conditional programs; multi-year growth drag.",
    signals: ["Spreads/CDS","Reserves drop","IMF talks","Bank exposure"],
    whatToWatch: ["Debt/GDP","Primary balance","FX liabilities","Recap needs"],
    cases: [
      { name: "Argentina", year: 2001, result: "Default; long restructuring" },
      { name: "Greece", year: 2012, result: "PSI; austerity" },
    ],
    scenarios: {
      baseline: "Liability management + support.",
      escalation: "Hard default; controls.",
      deescalation: "Soft reprofiling; access returns.",
    },
  },
  {
    id: "currency_slide",
    title: "Rapid Currency Slide & Pass-Through",
    era: "1994, 1997–1998, 2018",
    tags: ["economy", "inflation", "finance"],
    keywords: ["devaluation","fx","outflow","peg","import","dollarization","exchange"],
    summary:
      "FX shocks lift import prices; without anchors, indexation can entrench inflation.",
    outcome:
      "Stabilization via rate hikes/controls; sometimes regime change (float/peg break).",
    signals: ["Reserves drawdown","Parallel markets","Import spikes","Unhedged FX debt stress"],
    whatToWatch: ["Real rates","Intervention cadence","Invoicing mix","Rollover risk"],
    cases: [
      { name: "Tequila Crisis", year: 1994, result: "Rescue; float" },
      { name: "Asian Crisis", year: 1997, result: "Peg breaks; IMF" },
    ],
    scenarios: {
      baseline: "Volatile FX; gradual stabilization.",
      escalation: "Controls; deep recession.",
      deescalation: "Credible plan + FX lines.",
    },
  },
  {
    id: "critical_infra_cyber",
    title: "Cyberattack on Critical Infrastructure",
    era: "2015–present",
    tags: ["security", "technology"],
    keywords: ["ransomware","pipeline","grid","water","hospital","ics","scada","incident"],
    summary:
      "Ransomware/targeted intrusions disrupt energy, water, and hospitals; restoration hinges on backups and segmentation.",
    outcome:
      "Service interruptions; tighter rules; incident-response drills and segmentation investments.",
    signals: ["Lateral movement","Privilege escalation","Exfiltration/leaks","Ransom notes"],
    whatToWatch: ["Backup integrity","Manual overrides","Vendor exposure","Public health impact"],
    cases: [
      { name: "Ukraine Grid", year: 2015, result: "Outages; defenses upgraded" },
      { name: "Colonial Pipeline", year: 2021, result: "Fuel disruption; new rules" },
    ],
    scenarios: {
      baseline: "Localized outages; staged restoration.",
      escalation: "Multi-site disruption; emergency powers.",
      deescalation: "Rapid isolate/restore; drills.",
    },
  },
  {
    id: "housing_bubble",
    title: "Housing Bubble & Correction",
    era: "2006–2012",
    tags: ["economy", "finance"],
    keywords: ["mortgage","subprime","starts","delinquencies","securitization","foreclosure"],
    summary:
      "Leverage + lax underwriting inflate prices; when credit turns, defaults and price declines feed back into the real economy.",
    outcome:
      "Foreclosures, bank stress, negative wealth effects; underwriting reforms.",
    signals: ["Price/rent divergence","Delinquencies","Tighter lending","Builder cancellations"],
    whatToWatch: ["Mortgage spreads","Debt service ratios","Construction jobs","REO pipeline"],
    cases: [{ name: "US Housing Bust", year: 2008, result: "GFC trigger; Dodd-Frank" }],
    scenarios: {
      baseline: "Regional corrections; slower construction.",
      escalation: "Credit crunch; broader recession.",
      deescalation: "Targeted relief; soft landing with time.",
    },
  },
  {
    id: "semiconductor_controls",
    title: "Semiconductor Export Controls",
    era: "1980s, 2022–present",
    tags: ["technology", "diplomacy", "economy"],
    keywords: ["export","semiconductor","lithography","sanctions","foundry","node","fab"],
    summary:
      "States restrict advanced chips/tools to maintain advantage; firms rework supply chains.",
    outcome:
      "Tech bifurcation, compliance costs, regional fabs; short-term shortages.",
    signals: ["Entity lists","License holds","Capacity shifts","Allied alignment"],
    whatToWatch: ["Node availability","Alt tools","Retaliation","Capex"],
    cases: [{ name: "Toshiba-Kongsberg", year: 1987, result: "Stronger export regime" }],
    scenarios: {
      baseline: "Gradual decoupling; regional capacity grows.",
      escalation: "Tit-for-tat bans; acute shortages.",
      deescalation: "Narrow carve-outs; license pathways.",
    },
  },
  {
    id: "trade_war",
    title: "Trade War & Tariff Escalation",
    era: "1930s, 2018–2020",
    tags: ["economy", "diplomacy"],
    keywords: ["tariff","retaliation","quota","dumping","wto","supply"],
    summary:
      "Tariff cycles shift sourcing and prices; retaliation can spread beyond the initial sector.",
    outcome:
      "Trade diversion, higher consumer costs, and negotiated truces; re-shoring incentives.",
    signals: ["Investigations","Retaliatory lists","Rules-of-origin changes","Currency counters"],
    whatToWatch: ["Import prices","Sourcing moves","WTO dockets","Lobbying"],
    cases: [
      { name: "Smoot-Hawley", year: 1930, result: "Global retaliation; contraction" },
      { name: "US–China Tariffs", year: 2018, result: "Partial truce; supply shifts" },
    ],
    scenarios: {
      baseline: "Targeted tariffs; gradual reshoring.",
      escalation: "Broad retaliation; growth hit.",
      deescalation: "Sector deals; tariff-rate quotas.",
    },
  },
  {
    id: "refugee_crisis",
    title: "Refugee Crisis & Host Capacity",
    era: "2015–2016, recurring",
    tags: ["politics", "health", "economy"],
    keywords: ["refugee","asylum","border","resettlement","integration","quota"],
    summary:
      "Sudden inflows test housing, services, and politics; capacity and coordination shape outcomes.",
    outcome:
      "Policy overhauls, burden-sharing deals, and long-term integration programs.",
    signals: ["Arrival spikes","Processing backlogs","Capacity strain","Border policy shifts"],
    whatToWatch: ["Housing/healthcare bottlenecks","Labor-market absorption","Local political reactions","International funding"],
    cases: [{ name: "EU Refugee Crisis", year: 2015, result: "Quota debates; agreements with neighbors" }],
    scenarios: {
      baseline: "Managed inflows; services scale gradually.",
      escalation: "Overruns; irregular routes; political backlash.",
      deescalation: "Funding + coordination; faster processing.",
    },
  },
  {
    id: "drought_famine",
    title: "Drought, Crop Failure & Famine Risk",
    era: "1876–1878, 1983–1985, 2010–2011",
    tags: ["health", "economy"],
    keywords: ["drought","crop","harvest","famine","food","aid","malnutrition"],
    summary:
      "Severe droughts plus conflict/market failures create food insecurity; logistics and early warning matter most.",
    outcome:
      "Mortality depends on rapid response, access corridors, and political conditions.",
    signals: ["Rainfall anomalies","Staple price spikes","Access restrictions","Malnutrition surveys"],
    whatToWatch: ["Funding gaps","Port/road access","Local grain reserves","Pastoralist migration"],
    cases: [{ name: "Ethiopia Famine", year: 1984, result: "International mobilization; reforms" }],
    scenarios: {
      baseline: "Localized crisis; targeted aid reduces mortality.",
      escalation: "Multi-region famine; excess mortality.",
      deescalation: "Access corridors + pre-positioned stocks; rains return.",
    },
  },
  {
    id: "coup_dynamics",
    title: "Coup Dynamics & Post-Takeover Paths",
    era: "1960s–present",
    tags: ["politics", "security"],
    keywords: ["coup","junta","suspension","constitution","transition","sanctions"],
    summary:
      "Elites seize power amid legitimacy crises; trajectories depend on cohesion, public reaction, and external pressure.",
    outcome:
      "Short juntas with elections or prolonged military rule; sanctions and mediation shape timelines.",
    signals: ["Media control, curfews, airport closures","Elite splits or unity","Street reactions and strikes","External recognition or sanctions"],
    whatToWatch: ["Security force cohesion","Transitional charters","Mediator leverage","Border and trade status"],
    cases: [{ name: "Numerous coups", year: 1960, result: "Mixed: quick transitions or long rule" }],
    scenarios: {
      baseline: "Negotiated transition roadmap.",
      escalation: "Repression + insurgency; prolonged isolation.",
      deescalation: "Inclusive talks; monitored elections.",
    },
  },
  {
    id: "earthquake_response",
    title: "Major Earthquake Urban Response",
    era: "1995, 2010, 2011, 2023",
    tags: ["health", "supply"],
    keywords: ["earthquake","aftershock","search and rescue","building code","aid","logistics"],
    summary:
      "Rescue windows are short; building standards and logistics corridors drive survival and recovery.",
    outcome:
      "Higher survival with rapid SAR, corridor access, and resilient codes; long rebuilds where codes were weak.",
    signals: ["Aftershock forecasts","Airport/port status","SAR team mobilization","Fuel/water distribution"],
    whatToWatch: ["Shelter capacity","Cold chain for meds","Debris removal pace","Temporary housing plans"],
    cases: [
      { name: "Kobe", year: 1995, result: "Fast rebuild; code upgrades" },
      { name: "Haiti", year: 2010, result: "Severe losses; logistics bottlenecks" },
    ],
    scenarios: {
      baseline: "Weeks of SAR; months of temporary housing.",
      escalation: "Infrastructure collapse; disease risk.",
      deescalation: "International air bridge; prefab housing surge.",
    },
  },
];

/* ============================================================
   UNIVERSAL COVERAGE: TEMPLATE PLAYBOOKS (auto-synthesized)
   ============================================================ */
const TEMPLATES = {
  economy: {
    title: "Macro Inflation & Slowdown Pattern",
    era: "Cross-episode",
    tags: ["economy", "inflation"],
    summary:
      "Prices rise across essentials while growth cools; expectations and energy/supply slack drive the arc.",
    outcome:
      "Soft landings when guidance is clear and shocks fade; recessions when disinflation is forced or delayed.",
    signals: ["Headline vs core divergence","Wage bargaining rounds","Energy/food pass-through","Price-setting frequency"],
    whatToWatch: ["Inflation expectations","Real incomes","Policy path","Sector diffusion"],
    cases: [
      { name: "US 1970s", year: 1979, result: "Tightening; recession; disinflation" },
      { name: "Global 2021–2023", year: 2022, result: "Supply normalization; gradual cooling" },
    ],
    scenarios: {
      baseline: "Sticky prints for 2–3 quarters; gradual cooling.",
      escalation: "Wage-price loop; painful disinflation.",
      deescalation: "Energy slack + credible policy → soft landing.",
    },
  },
  finance: {
    title: "Market Stress & Liquidity Strain",
    era: "1907, 1998, 2008",
    tags: ["finance", "economy"],
    summary:
      "Rapid repricing and margin calls force deleveraging; confidence measures and backstops restore function.",
    outcome:
      "Facilities, guarantees, and capital injections; reforms follow.",
    signals: ["Funding spread blowouts","Collateral haircuts","Redemptions","Rumor cascades"],
    whatToWatch: ["Facility uptake","Deposit mix","CDS","Supervisor comms"],
    cases: [
      { name: "LTCM", year: 1998, result: "Coordinated unwind" },
      { name: "GFC", year: 2008, result: "TARP; reforms" },
    ],
    scenarios: {
      baseline: "Targeted support; credit tight.",
      escalation: "Contagion; forced mergers.",
      deescalation: "Transparency + guarantees stabilize.",
    },
  },
  protests: {
    title: "Sustained Protest Cycle",
    era: "Recurring",
    tags: ["protests", "politics"],
    summary:
      "Crowds organize around grievances; security posture and elite splits steer outcomes.",
    outcome:
      "From negotiated reforms to repression; sometimes elections.",
    signals: ["Weekend peaks","Union join-ins","Arrest counts","Media control"],
    whatToWatch: ["Mediator presence","Elite cohesion","Rule-of-law steps","Crowd logistics"],
    cases: [
      { name: "Eastern Europe 1989", year: 1989, result: "Transitions" },
      { name: "Various 2019–20", year: 2020, result: "Mixed outcomes" },
    ],
    scenarios: {
      baseline: "Talks on process reforms.",
      escalation: "Emergency laws; mass arrests.",
      deescalation: "Verified concessions; monitors.",
    },
  },
  election: {
    title: "Contested Vote & Legitimacy",
    era: "1876, 2000, recent",
    tags: ["politics"],
    summary:
      "Close margins push disputes to audits and courts; public trust depends on transparent rules.",
    outcome:
      "Legal resolution; later procedural reforms.",
    signals: ["Recounts","Court filings","Board pressure","Observer notes"],
    whatToWatch: ["Margins vs law","Uniform standards","Timelines","Infra security"],
    cases: [
      { name: "US 2000", year: 2000, result: "Court decision" },
      { name: "Global close races", year: 2019, result: "Audits/coalitions" },
    ],
    scenarios: {
      baseline: "Court-guided finish.",
      escalation: "Mass mobilization; dual claims.",
      deescalation: "Bipartisan audits; acceptance signals.",
    },
  },
  technology: {
    title: "Platform Disruption & Regulation",
    era: "2010s–present",
    tags: ["technology", "economy"],
    summary:
      "Platforms reshape markets; outages, safety, or data rules trigger audits and compliance work.",
    outcome:
      "Standards, fines, or product changes; consolidation and new measurement.",
    signals: ["Outages/incidents","Regulator notices","APIs tightening","User migration"],
    whatToWatch: ["Reliability SLOs","Consent & safety","Market share shifts","Bills/cases"],
    cases: [
      { name: "Major social outage", year: 2021, result: "Audits; reliability focus" },
      { name: "Privacy cases", year: 2018, result: "Fines; API changes" },
    ],
    scenarios: {
      baseline: "Audits + incremental rules.",
      escalation: "Heavy fines; feature removals.",
      deescalation: "Self-reg + transparency reports.",
    },
  },
  cyber: {
    title: "Enterprise/Infra Cyber Incident",
    era: "2015–present",
    tags: ["technology", "security"],
    summary:
      "Intrusions disrupt services or leak data; recovery hinges on backups, segmentation, and comms.",
    outcome:
      "Restoration + compliance; upgrades to architecture.",
    signals: ["Privilege escalation","Exfiltrations","Leak sites","Ransom notes"],
    whatToWatch: ["Backup RTO","Segmentation","Vendor risk","Public impact"],
    cases: [
      { name: "NotPetya", year: 2017, result: "Mass disruption; rebuilds" },
    ],
    scenarios: {
      baseline: "Localized outage; restore in days.",
      escalation: "Multi-site; emergency powers.",
      deescalation: "Rapid isolate/patch; drills.",
    },
  },
  energy: {
    title: "Fuel/Oil Shock",
    era: "1973, 1979, 2022",
    tags: ["energy", "economy"],
    summary:
      "Supply cuts or war risk spike fuel costs; inflation impulse spreads through logistics.",
    outcome:
      "Rationing/efficiency; strategic reserves; diversification.",
    signals: ["Inventories drop","Shipping risk","Embargo rhetoric","Subsidy debates"],
    whatToWatch: ["Freight rates","Refining margins","SPR moves","Alt supply deals"],
    cases: [
      { name: "1973 Oil Crisis", year: 1973, result: "Rationing; SPR" },
      { name: "2022 shocks", year: 2022, result: "Diversification; caps" },
    ],
    scenarios: {
      baseline: "Higher prices; gradual reroute.",
      escalation: "Extended shortage; stagflation risk.",
      deescalation: "Release reserves; demand mgmt.",
    },
  },
  supply: {
    title: "Supply Chain Dislocation",
    era: "1956, 2021–24",
    tags: ["supply", "economy"],
    summary:
      "Transport nodes clog; queues and surcharges ripple through inventories.",
    outcome:
      "Staggered arrivals; alternate routing; price spikes then normalization.",
    signals: ["Dwell times","Blank sailings","Port backlogs","War-risk premiums"],
    whatToWatch: ["ETA drift","Airfreight use","Retail stockouts","Order cancellations"],
    cases: [
      { name: "Suez events", year: 2021, result: "Global delays" },
    ],
    scenarios: {
      baseline: "1–2 quarter normalization.",
      escalation: "Protracted disruption.",
      deescalation: "Convoys, time windows.",
    },
  },
  health: {
    title: "Outbreak & Public Health Response",
    era: "2003, 2020",
    tags: ["health"],
    summary:
      "Testing, tracing, and transparent comms change epidemic curves.",
    outcome:
      "Containment with early action; systemic shock if delayed.",
    signals: ["Hosp clusters","Genomic reports","Policy pivots","Therapeutics"],
    whatToWatch: ["Rt/hospital","Positivity","Procurement","Variants"],
    cases: [
      { name: "SARS", year: 2003, result: "Contained" },
      { name: "COVID-19", year: 2020, result: "Pandemic" },
    ],
    scenarios: {
      baseline: "Localized waves.",
      escalation: "Widespread spread.",
      deescalation: "Vaccines + tracing.",
    },
  },
  disaster_storm: {
    title: "Major Storm/Hurricane Impact",
    era: "1992, 2005, 2017",
    tags: ["disaster", "supply"],
    summary:
      "Wind/flood damage disrupts power, logistics, and housing; recovery hinges on pre-positioned stocks and codes.",
    outcome:
      "Restoration over weeks; code upgrades; insurance reshuffles.",
    signals: ["Track & surge","Evac orders","Grid damage","Fuel distribution"],
    whatToWatch: ["Mutual-aid crews","Shelter capacity","Debris removal","Insurance claims"],
    cases: [
      { name: "Katrina", year: 2005, result: "Mass displacement; reforms" },
      { name: "Harvey", year: 2017, result: "Flooding; rebuilds" },
    ],
    scenarios: {
      baseline: "Weeks-long outages; staged reopen.",
      escalation: "Levee failures; health crises.",
      deescalation: "Rapid grid repair; relief flow.",
    },
  },
  disaster_flood: {
    title: "Urban/Regional Flooding",
    era: "Recurring",
    tags: ["disaster", "supply"],
    summary:
      "Floods disrupt transport, housing, and services; insurance and drainage determine resilience.",
    outcome:
      "Rebuilds and drainage upgrades; zoning changes.",
    signals: ["River crest forecasts","Reservoir releases","Road closures","Boil-water notices"],
    whatToWatch: ["Pumps/drainage","Shelter capacity","Insurance gaps","Mold/health"],
    cases: [{ name: "Various rivers", year: 2010, result: "Zoning upgrades" }],
    scenarios: {
      baseline: "Localized damage; reopen in weeks.",
      escalation: "Widespread inundation.",
      deescalation: "Diversions; pump staging.",
    },
  },
  disaster_wildfire: {
    title: "Wildfire Season & Evacuations",
    era: "Recurring",
    tags: ["disaster", "health"],
    summary:
      "Drought + heat produce megafires; smoke affects health and grids.",
    outcome:
      "Evacuations; grid hardening; building codes for defensible space.",
    signals: ["Red-flag warnings","Fuel moisture","Lightning events","Wind shifts"],
    whatToWatch: ["Air quality","Grid PSPS","Evac routes","Firebreak status"],
    cases: [{ name: "California seasons", year: 2020, result: "PSPS; code changes" }],
    scenarios: {
      baseline: "Periodic evacuations; smoke events.",
      escalation: "Urban interface losses.",
      deescalation: "Moisture return; fuel breaks.",
    },
  },
  disaster_drought: {
    title: "Drought & Water Scarcity",
    era: "Recurring",
    tags: ["environment", "economy"],
    summary:
      "Persistent deficits hit agriculture and power; rationing and pricing reforms follow.",
    outcome:
      "Efficiency investments; water markets; crop shifts.",
    signals: ["Reservoir levels","Soil moisture","Crop stress","Hydro output"],
    whatToWatch: ["Allocations","Pricing rules","Desal/reuse","Food prices"],
    cases: [{ name: "Cape Town Day Zero", year: 2018, result: "Rationing; conservation" }],
    scenarios: {
      baseline: "Rationing + pricing.",
      escalation: "Agr losses; migration.",
      deescalation: "Rains + reuse projects.",
    },
  },
  war: {
    title: "Border Clashes & Limited War",
    era: "Recurring",
    tags: ["war", "diplomacy"],
    summary:
      "Local incidents escalate through mobilization and prestige costs; de-confliction avoids spirals.",
    outcome:
      "Frozen lines or limited deals; sanctions risk.",
    signals: ["Troop movements","Shelling","Ultimatums","Hotlines"],
    whatToWatch: ["Supply lines","Observers","Sanction cycles","Back-channel talks"],
    cases: [{ name: "Multiple theaters", year: 2014, result: "Frozen conflicts" }],
    scenarios: {
      baseline: "Extended standoff.",
      escalation: "Accident → wider war.",
      deescalation: "Sequenced pull-backs.",
    },
  },
  migration: {
    title: "Sudden Migration & Host Capacity",
    era: "Recurring",
    tags: ["politics", "health", "economy"],
    summary:
      "Inflows strain housing/services; politics react to bottlenecks.",
    outcome:
      "Capacity expansion or curbs; integration over years.",
    signals: ["Arrivals spike","Processing backlogs","Shelter strain","Border policy shifts"],
    whatToWatch: ["Housing/health capacity","Funding","Labor absorption","Local politics"],
    cases: [{ name: "EU 2015", year: 2015, result: "Quotas; neighbor deals" }],
    scenarios: {
      baseline: "Managed scaling.",
      escalation: "Overruns; backlash.",
      deescalation: "Funding + coordination.",
    },
  },
  water_crisis: {
    title: "Urban Water Contamination/Shortage",
    era: "Recurring",
    tags: ["health", "environment"],
    summary:
      "Aging systems or drought cause unsafe/insufficient water; trust hinges on testing and transparent fixes.",
    outcome:
      "Pipe replacements or treatment upgrades; boil-water periods.",
    signals: ["Boil notices","Test failures","Pressure drops","Supply cuts"],
    whatToWatch: ["Replacement timelines","Funding","Alt supply","Public comms"],
    cases: [{ name: "Flint", year: 2014, result: "Pipe replacements; oversight" }],
    scenarios: {
      baseline: "Bottled/boil advisories; staged fixes.",
      escalation: "Widespread health effects.",
      deescalation: "Rapid upgrades; clear comms.",
    },
  },
  transport_aviation: {
    title: "Aviation Grounding & Safety Review",
    era: "1990s–present",
    tags: ["supply"],
    summary:
      "Crashes or sensor/software issues ground fleets; recertification and redesign follow.",
    outcome:
      "Operational constraints; compensation; safety upgrades.",
    signals: ["ADs/Directives","Sensor faults","Pilot reports","Software patches"],
    whatToWatch: ["Recert timelines","Fleet swaps","Insurance","Regulator alignment"],
    cases: [{ name: "737 MAX", year: 2019, result: "Grounding; recert" }],
    scenarios: {
      baseline: "Limited capacity; gradual return.",
      escalation: "Extended grounding; shortages.",
      deescalation: "Fix certified; capacity restored.",
    },
  },
  space: {
    title: "Launch/Return Anomaly Management",
    era: "1960s–present",
    tags: ["space","technology"],
    summary:
      "Abort modes and recovery procedures contain risk; programs adjust cadence after anomalies.",
    outcome:
      "Inspection campaigns and schedule reshuffles; safety culture gains.",
    signals: ["Scrubs/holds","Telemetry flags","Debris/splashdown","Post-flight checks"],
    whatToWatch: ["Heat-shield/booster wear","Crew medical","Cadence changes","Pad availability"],
    cases: [{ name: "Apollo/Soyuz eras", year: 1975, result: "Procedural playbooks" }],
    scenarios: {
      baseline: "Short cadence pause; reviews.",
      escalation: "Grounding; design changes.",
      deescalation: "Fix rolled out; cadence resumes.",
    },
  },
};

/* ============================================================
   TEXT PROCESSING & MATCHING
   ============================================================ */
const tokenizer = (s) => (s || "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

function extractTagsFromText(s) {
  const t = (s || "").toLowerCase();
  const tags = new Set();
  const has = (arr) => arr.some((w) => t.includes(w));
  const add = (tag) => tags.add(tag);

  const map = {
    economy: ["economy","inflation","cpi","prices","budget","stimulus","rate","recession","jobs","wage","tariff","gdp"],
    energy: ["oil","gasoline","energy","opec","fuel","diesel"],
    supply: ["supply","shipping","canal","port","reroute","blockade","embargo","logistics","container","freight"],
    finance: ["bank","deposit","run","liquidity","credit","bailout","default","bond","cds","spread"],
    protests: ["protest","march","curfew","riot","strike","sit-in","occupation"],
    politics: ["parliament","congress","minister","referendum","law","constitution","governance","corruption"],
    election: ["election","ballot","recount","vote","commission","certification","poll"],
    technology: ["encryption","privacy","data","platform","streaming","youtube","ai","outage","algorithm","moderation"],
    cyber: ["ransomware","malware","phishing","intrusion","scada","ics","ddos","breach","leak"],
    health: ["virus","outbreak","mask","quarantine","vaccine","cases","hospital","malnutrition","public health"],
    diplomacy: ["sanction","ceasefire","cease-fire","treaty","talks","mediation","negotiation","summit","export control","alignment"],
    war: [
      "war","fight(s|ing)?","clash(es)?","hostilities","airstrike(s)?","rocket(s)?",
      "bombardment","incursion","offensive","shelling","ground operation","troops","missile","border"
    ],
    space: ["nasa","spacex","capsule","rover","iss","splashdown","reentry","launch"],
    disaster: ["earthquake","hurricane","storm","typhoon","flood","wildfire","drought"],
    water_crisis: ["boil-water","boil water","lead","pipe","reservoir","shortage","rationing","water"],
    migration: ["refugee","asylum","migrant","resettlement"],
    transport: ["airline","aircraft","grounding","derailment","train","vessel","shipping lane"],
    currency: ["devaluation","exchange rate","fx","peg","reserves","dollarization"],
    trade: ["tariff","quota","retaliation","dumping","wto","trade war"],
    semiconductor: ["semiconductor","chip","lithography","foundry","node","fab"]
  };

  Object.entries(map).forEach(([tag, words]) => { if (has(words)) add(tag); });

  const conflictCue =
    /\b(war|fight(s|ing)?|clash(es)?|hostilities|airstrike(s)?|rocket(s)?|shelling|incursion|offensive|ground operation|missile)\b/.test(t) ||
    /\bvs\.?\b/.test(t) ||
    /\b(israel|gaza|palestin(e|ian)|west bank|lebanon|hezbollah|hamas|kashmir|donbas|crimea|taiwan|south china sea)\b/.test(t);

  if (conflictCue) add("war");
  if (conflictCue && /\b(truce|talks?|mediat|negotiat|cease-?fire|hostage|deal)\b/.test(t)) add("diplomacy");

  return [...tags];
}

function buildInputFeatures(text) {
  const tokens = tokenizer(text);
  const textTokens = new Set(tokens);
  const tags = new Set(extractTagsFromText(text));
  return { textTokens, tags };
}

function scorePlaybook(input) {
  const { textTokens, tags } = input;
  return (pb) => {
    let score = 0;
    pb.tags.forEach((t) => tags.has(t) && (score += 6));
    (pb.keywords || []).forEach((k) => textTokens.has(k) && (score += 2));
    return score;
  };
}

function chooseMatchesStrict(text, limit = 5) {
  const f = buildInputFeatures(text);
  const scored = PLAYBOOKS.map((pb) => ({ pb, score: scorePlaybook(f)(pb) }))
    .filter((x) => x.score >= 6)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map((x) => ({ ...x.pb, _score: x.score }));
}

/* ---------- Universal coverage (fallback synthesis) ---------- */
function synthesizeFromTemplates(text, limit = 5) {
  const tags = extractTagsFromText(text);
  const priorities = [
    "war","diplomacy","protests","election","politics","finance","currency","economy",
    "trade","energy","supply","technology","cyber","semiconductor","health","disaster",
    "water_crisis","migration","transport","space",
  ];
  const picked = [];
  const used = new Set();

  function pushTemplate(key) {
    const base = TEMPLATES[key];
    if (!base || used.has(key)) return;
    used.add(key);
    picked.push({
      id: `template_${key}`,
      title: base.title,
      era: base.era,
      tags: base.tags,
      summary: base.summary,
      outcome: base.outcome,
      signals: base.signals,
      whatToWatch: base.whatToWatch,
      cases: base.cases,
      scenarios: base.scenarios,
      synthetic: true,
      _score: 6,
    });
  }

  const tl = (text || "").toLowerCase();
  if (tags.includes("disaster")) {
    if (tl.includes("hurricane") || tl.includes("storm") || tl.includes("typhoon")) pushTemplate("disaster_storm");
    else if (tl.includes("flood")) pushTemplate("disaster_flood");
    else if (tl.includes("wildfire")) pushTemplate("disaster_wildfire");
    else if (tl.includes("drought")) pushTemplate("disaster_drought");
  }
  if (tags.includes("transport") || tl.includes("aircraft") || tl.includes("grounding")) pushTemplate("transport_aviation");

  priorities.forEach((k) => { if (tags.includes(k)) pushTemplate(k); });

  if (picked.length === 0) pushTemplate("economy");
  return picked.slice(0, limit);
}

function chooseMatches(text, limit = 5) {
  const strict = chooseMatchesStrict(text, limit);
  if (strict.length >= Math.min(3, limit)) return strict;
  const synth = synthesizeFromTemplates(text, limit);
  const merged = [...strict];
  for (const m of synth) {
    if (merged.length >= limit) break;
    if (!merged.find((x) => x.id === m.id)) merged.push(m);
  }
  if (merged.length < limit) {
    const filler = synthesizeFromTemplates("economy inflation energy supply technology protests war", limit);
    for (const m of filler) {
      if (merged.length >= limit) break;
      if (!merged.find((x) => x.id === m.id)) merged.push(m);
    }
  }
  return merged;
}

/* ============================================================
   FUTURE TEXT & RISK
   ============================================================ */
function futureFromTags(tagSet, toggles) {
  const t = toggles || {};
  const pick = (c, a, b) => (c ? a : b);
  if (tagSet.has("finance")) {
    return [
      "Immediate: guarantees, facility lines, and transparent audits to stabilize funding.",
      pick(t.finCond === "tight", "Tight conditions amplify deleveraging; SME credit weakens.", "Loose policy cushions credit but raises moral-hazard debate."),
      pick(t.institutions === "strong", "Clear disclosures shorten the panic window.", "Information gaps extend deposit flight and spreads.")
    ].join(" ");
  }
  if (tagSet.has("economy") || tagSet.has("inflation")) {
    return [
      "Near-term: choppy prints as energy/food pass through; wage talks broaden.",
      pick(t.supplySlack === "high", "Slack cools headline inflation sooner.", "Limited slack prolongs pressure."),
      pick(t.finCond === "tight", "Tighter policy slows growth but anchors expectations.", "Loose credit risks persistence.")
    ].join(" ");
  }
  if (tagSet.has("protests") || tagSet.has("politics")) {
    return [
      "Next weeks: larger weekend gatherings and legal-aid infrastructure.",
      pick(t.mediators, "Mediators structure verifiable concessions.", "Without mediators, policing posture sets momentum.")
    ].join(" ");
  }
  if (tagSet.has("war") || tagSet.has("diplomacy")) {
    return [
      "Expect sanctions and standoff lines; hotline usage and observers determine miscalculation risk.",
      pick(t.mediators, "Third-party monitors stabilize a freeze.", "Absent observers, violations persist.")
    ].join(" ");
  }
  if (tagSet.has("technology") || tagSet.has("cyber")) {
    return [
      "Audits and incident reporting accelerate; product and API changes roll out in phases.",
      pick(t.institutions === "strong", "Standards emerge; compliance becomes predictable.", "Patchwork rules increase drag.")
    ].join(" ");
  }
  if (tagSet.has("health")) {
    return [
      "Case-finding, procurement, and transparent reporting drive the curve.",
      pick(t.institutions === "strong", "Rapid adjustments minimize disruption.", "Delays fuel rumor cycles and late interventions.")
    ].join(" ");
  }
  if (tagSet.has("supply") || tagSet.has("energy") || tagSet.has("trade")) {
    return [
      "Carriers reroute; surcharges appear first, then normalize as capacity rebalances.",
      pick(t.supplySlack === "high", "Inventory buffers blunt stockouts.", "Low buffers cause staggered shelves.")
    ].join(" ");
  }
  if (tagSet.has("disaster") || tagSet.has("water_crisis")) {
    return [
      "Response hinges on logistics corridors and pre-positioned stocks; transparent risk comms matter.",
      "Expect staged restoration and code upgrades."
    ].join(" ");
  }
  return "Expect clarifying follow-ups on actors, budgets, and timelines; outcomes range from small pilots to binding measures.";
}

function possibleFutureText(pb, t) {
  if (pb.synthetic) return futureFromTags(new Set(pb.tags || []), t);
  const pick = (cond, a, b) => (cond ? a : b);
  const A = [];
  if (pb.id === "stagflation_energy") {
    A.push(
      "Near-term: prices stay choppy as energy/food pass through; wage talks broaden.",
      pick(t.finCond === "tight", "Tighter financial conditions slow growth but help anchor expectations.", "Loose credit risks longer-lasting price momentum."),
      pick(t.institutions === "strong", "Clear guidance supports disinflation.", "Mixed signals entrench frequent repricing."),
      pick(t.supplySlack === "high", "Slack improves, cooling headline prints sooner.", "Limited slack prolongs the shock across categories.")
    );
  } else if (pb.id === "bank_panic") {
    A.push(
      "Immediate: guarantees, facility lines, and forensic audits to stabilize funding.",
      pick(t.institutions === "strong", "Transparent disclosures reduce rumor-driven runs.", "Information gaps fuel depositor flight and wider spreads."),
      pick(t.finCond === "tight", "Deleveraging accelerates; credit to SMEs falls.", "Looser policy cushions credit but raises moral-hazard debates.")
    );
  } else if (pb.id === "protest_wave") {
    A.push(
      "Next weeks: weekend peaks, better logistics, livestreams, and legal-aid tents.",
      pick(t.mediators, "Third-party mediators structure verifiable concessions.", "Without mediators, talks stall and policing sets momentum."),
      pick(t.infoVolatile, "Viral clips raise escalation risk after clashes.", "Lower volatility enables de-escalation playbooks.")
    );
  } else if (pb.id === "encryption_debate") {
    A.push(
      "Policy path: consultation → revisions → court tests if mandates persist.",
      pick(t.institutions === "strong", "Impact assessments and narrower scopes are likely.", "Broad mandates risk fragmentation and compliance exits."),
      "Expect industry coalitions and academic reviews to shape amendments."
    );
  } else if (pb.id === "streaming_disruption") {
    A.push(
      "Budgets continue shifting to on-demand; ad-supported tiers expand.",
      pick(t.infoVolatile, "Short-form spikes whipsaw schedules and marketing spends.", "Stable metrics favor long-form franchises and live events.")
    );
  } else if (pb.id === "supply_chokepoint") {
    A.push(
      "Carriers reroute; spot rates spike first, then cool as capacity rebalances.",
      pick(t.supplySlack === "high", "High buffers blunt stockouts.", "Low buffers cause staggered shelves and shrinkflation."),
      "Airfreight substitution grows for time-sensitive goods."
    );
  } else if (pb.id === "data_privacy_backlash") {
    A.push(
      "Audits and consent changes roll out; advertisers pivot to contextual and first-party data.",
      pick(t.institutions === "strong", "Clear guidance reduces legal uncertainty.", "Patchy enforcement keeps risk premiums high.")
    );
  } else if (pb.id === "public_health_outbreak") {
    A.push(
      "Case-finding and targeted testing shape the curve; schools/workplaces update guidance.",
      pick(t.institutions === "strong", "Transparent reporting and rapid procurement reduce disruption.", "Slow reporting fuels rumor cycles and late interventions.")
    );
  } else if (pb.id === "territorial_fait_accompli") {
    A.push(
      "Expect sanctions and standoff lines; skirmishes along contact points.",
      pick(t.mediators, "Monitors and DMZs stabilize a freeze.", "Absent monitors, violations and tit-for-tat fire are common.")
    );
  } else if (pb.id === "alliance_crisis") {
    A.push(
      "Overlapping drills and tight timetables elevate accident risk.",
      pick(t.mediators, "Hotlines and observers lower misread signals.", "No observers = higher miscalculation risk.")
    );
  } else {
    A.push(futureFromTags(new Set(pb.tags || []), t));
  }
  return A.join(" ");
}

function riskFromToggles(pb, t) {
  let base = 50;
  const add = (n) => (base = Math.max(0, Math.min(100, base + n)));

  if (t.institutions === "strong") add(-10);
  else if (t.institutions === "weak") add(+10);
  if (t.mediators) add(-8); else add(+5);
  if (t.infoVolatile) add(+6);
  if (t.supplySlack === "low") add(+6); else if (t.supplySlack === "high") add(-4);
  if (t.finCond === "tight") add(+4); else if (t.finCond === "loose") add(-2);

  const tagSet = new Set(pb.tags || []);
  if (tagSet.has("finance") && t.finCond === "tight") add(+6);
  if (tagSet.has("economy") && t.supplySlack === "low") add(+6);
  if (tagSet.has("protests") && t.infoVolatile) add(+6);

  return Math.round(base);
}

/* ============================================================
   QUANT PACK (legacy, tag-based)
   ============================================================ */
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const nowISO = () => new Date().toISOString();
function boolScore(cond, yes = 0.8, no = 0.2) { return cond ? yes : no; }
function wordHit(t, words) { return words.some(w => t.includes(w)); }

function makeEvent(input, playbook, toggles) {
  const t = (input || "").toLowerCase();
  const tagSet = new Set(extractTagsFromText(input));

  const context = {
    inflationPressure: clamp01(
      (wordHit(t, ["inflation","cpi","prices","wage","cost"]) ? 0.7 : 0) +
      (tagSet.has("economy") ? 0.2 : 0) +
      (tagSet.has("energy") ? 0.1 : 0)
    ),
    energyShock: clamp01(wordHit(t, ["oil","gasoline","diesel","opec","refinery","pipeline"]) ? 0.8 : (tagSet.has("energy") ? 0.5 : 0)),
    fundingStress: clamp01(
      (wordHit(t, ["bank","run","liquidity","deposit","cds","spread"]) ? 0.8 : 0) +
      (tagSet.has("finance") ? 0.2 : 0) +
      (toggles.finCond === "tight" ? 0.1 : 0)
    ),
    protestIntensity: clamp01((tagSet.has("protests") || tagSet.has("politics")) ? 0.6 : 0),
    conflictRisk: clamp01((tagSet.has("war") || tagSet.has("diplomacy")) ? 0.6 : 0),
    supplyDisruption: clamp01(
      (wordHit(t, ["canal","port","shipping","blockade","reroute","container"]) ? 0.8 : 0) +
      (tagSet.has("supply") ? 0.2 : 0)
    ),
    publicHealth: clamp01(tagSet.has("health") ? 0.7 : 0),
    policyTightness: clamp01(toggles.finCond === "tight" ? 0.75 : 0.35),
    institutionalStrength: clamp01(toggles.institutions === "strong" ? 0.75 : 0.35),
    infoVolatility: clamp01(toggles.infoVolatile ? 0.8 : 0.3),
    mediatorPresence: clamp01(boolScore(!!toggles.mediators))
  };

  return {
    id: `evt_${Date.now()}`,
    timestamp: nowISO(),
    type: playbook?.id || "unknown",
    entities: [],
    rawText: input,
    context
  };
}

const ctxKeys = [
  "inflationPressure","energyShock","fundingStress","protestIntensity","conflictRisk",
  "supplyDisruption","publicHealth","policyTightness","institutionalStrength","infoVolatility","mediatorPresence"
];

function toVec(ctx){ return ctxKeys.map(k => ctx[k] ?? 0); }
function dot(a,b){ return a.reduce((s,x,i)=>s+x*(b[i]||0),0); }
function norm(a){ return Math.sqrt(dot(a,a)) || 1; }
function cosine(a,b){ return dot(a,b)/(norm(a)*norm(b)); }

function caseVectorFromPlaybookTags(pb){
  const tagBias = {
    economy: { inflationPressure: .6, policyTightness: .5 },
    energy: { energyShock: .8, inflationPressure: .3 },
    finance: { fundingStress: .8, policyTightness: .3 },
    protests: { protestIntensity: .8, infoVolatility: .3, mediatorPresence: .2 },
    war: { conflictRisk: .8, supplyDisruption: .3 },
    supply: { supplyDisruption: .8, energyShock: .2 },
    health: { publicHealth: .8, infoVolatility: .3 },
    technology: {},
    politics: {},
    disaster: { supplyDisruption: .4 },
  };
  const out = Object.fromEntries(ctxKeys.map(k => [k, 0]));
  (pb.tags || []).forEach(t => {
    const bias = tagBias[t]; if (!bias) return;
    Object.entries(bias).forEach(([k,v]) => { out[k] = Math.max(out[k], v); });
  });
  return out;
}

function buildAnalogsForPlaybook(event, pb){
  if (!pb || !Array.isArray(pb.cases)) return [];
  const evtVec = toVec(event.context);
  return pb.cases.map(c => {
    const base = caseVectorFromPlaybookTags(pb);
    const recencyBoost = c.year ? Math.max(0, 1 - Math.abs(new Date().getFullYear() - c.year)/60) * 0.1 : 0;
    const sim = cosine(evtVec, toVec(base)) + recencyBoost;
    return {
      case: c.name,
      period: String(c.year || "n/a"),
      similarity: Math.round(Math.max(0, Math.min(1, sim)) * 100),
      outcome: c.result
    };
  }).sort((a,b) => b.similarity - a.similarity).slice(0,5);
}

function outcomeStats(analogs){
  if (!analogs.length) return {winRate:null,effectRange:null,medianTime:null,n:0};
  const goodWords = /(stabiliz|cool|recover|contain|restore|diversif|deal|soft landing|audits?)/i;
  const wins = analogs.filter(a => goodWords.test(a.outcome || "")).length;
  const effectRange = wins >= Math.ceil(analogs.length/2) ? "moderate improvement likely" : "risk of adverse outcome";
  const medianTime =
    analogs.some(a => /bank|liquid|deposit|credit|run/i.test(a.case)) ? "weeks"
    : analogs.some(a => /inflation|energy|supply/i.test(a.case)) ? "1–2 quarters"
    : analogs.some(a => /protest|election|law|security/i.test(a.case)) ? "weeks–months"
    : "varies";
  return {
    winRate: Math.round((wins/analogs.length)*100),
    effectRange,
    medianTime,
    n: analogs.length
  };
}

function keyMetricsNow(event, pb){
  const c = event.context;
  const mk = (name, value, unit, note) => ({name, value, unit, note});
  const out = [];

  if (c.inflationPressure > .5) out.push(mk("Inflation pressure", Math.round(c.inflationPressure*100), "/100", "Heuristic index"));
  if (c.energyShock > .4) out.push(mk("Energy shock", Math.round(c.energyShock*100), "/100", "Heuristic index"));
  if (c.fundingStress > .4) out.push(mk("Funding stress", Math.round(c.fundingStress*100), "/100", "Heuristic index"));
  if (c.supplyDisruption > .4) out.push(mk("Supply disruption", Math.round(c.supplyDisruption*100), "/100", "Heuristic index"));
  if (c.protestIntensity > .4) out.push(mk("Protest intensity", Math.round(c.protestIntensity*100), "/100", "Heuristic index"));

  out.push(mk("Policy tightness", Math.round(c.policyTightness*100), "/100", "Assumption"));
  out.push(mk("Institutional strength", Math.round(c.institutionalStrength*100), "/100", "Assumption"));
  out.push(mk("Info volatility", Math.round(c.infoVolatility*100), "/100", "Assumption"));
  out.push(mk("Mediators present", Math.round(c.mediatorPresence*100), "/100", "Assumption"));

  return out.slice(0, 6);
}

function buildQuantPack(event, pb){
  const analogs = buildAnalogsForPlaybook(event, pb);
  const stats = outcomeStats(analogs);
  const metrics = keyMetricsNow(event, pb);
  const citations = [{ name: "Methodology", url: "#", source: "PastForward Heuristics v0" }];
  const avgSim = analogs.length ? Math.round(analogs.reduce((a,x)=>a+x.similarity,0)/analogs.length) : null;
  return { metrics, analogs, stats, citations, avgSim };
}


/* ============================================================
   NEW: Evidence + Metric composites (backing the big numbers)
   ============================================================ */

function toScore(x, median, mad, direction = "higher=hotter") {
  const z = mad === 0 ? 0 : (x - median) / (1.4826 * mad);
  const s = 1 / (1 + Math.exp(-z));
  const pct = direction === "higher=hotter" ? s : 1 - s;
  return Math.round(pct * 100);
}

/* NOTE:
   Values here are “snapshot as of now” and meant to be updated monthly.
   Sources: Dallas Fed Trimmed PCE YoY (2.7% for Jun 2025) and other public dashboards.
*/
const EVIDENCE = [
  { id: "medianCPI",       group: "inflation", label: "Median CPI (y/y)", value: 3.2,  unit: "%",  asOf: "Jun 2025", method: "Cleveland Fed median CPI (12-mo)", sourceName: "Cleveland Fed", sourceUrl: "https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting/median-cpi" },
  { id: "trimmedPCE",      group: "inflation", label: "Trimmed-Mean PCE (y/y)", value: 2.7, unit: "%",  asOf: "Jun 2025", method: "12-month trimmed mean", sourceName: "Dallas Fed", sourceUrl: "https://www.dallasfed.org/research/pce" },
  { id: "diffusionShare",  group: "inflation", label: "CPI items >3% y/y", value: 47, unit: "% of basket", asOf: "Jun 2025", method: "Price diffusion share (constructed)", sourceName: "BLS", sourceUrl: "https://www.bls.gov/cpi/" },

  { id: "wtiYoY",          group: "energy",    label: "WTI crude (y/y)", value: 9, unit: "%", asOf: "Aug 2025", method: "Front-month y/y", sourceName: "EIA", sourceUrl: "https://www.eia.gov/" },
  { id: "gasInvVs5y",      group: "energy",    label: "Gasoline inv. vs 5y", value: -1, unit: "%", asOf: "Aug 2025", method: "Deviation vs 5-yr avg", sourceName: "EIA WPSR", sourceUrl: "https://www.eia.gov/petroleum/supply/weekly/" },
  { id: "distInvVs5y",     group: "energy",    label: "Distillate inv. vs 5y", value: -16, unit: "%", asOf: "Aug 2025", method: "Deviation vs 5-yr avg", sourceName: "EIA WPSR", sourceUrl: "https://www.eia.gov/petroleum/supply/weekly/" },

  { id: "hyOAS",           group: "funding",   label: "High-yield OAS", value: 3.9, unit: "pp", asOf: "Aug 2025", method: "ICE BofA HY OAS", sourceName: "FRED", sourceUrl: "https://fred.stlouisfed.org/series/BAMLH0A0HYM2" },
  { id: "cpTbill",         group: "funding",   label: "3-mo CP − T-bill", value: 0.18, unit: "pp", asOf: "Aug 2025", method: "Spread", sourceName: "FRED", sourceUrl: "https://fred.stlouisfed.org/" },

  { id: "gscpi",           group: "supply",    label: "GSCPI", value: -0.25, unit: "z", asOf: "Jul 2025", method: "NY Fed supply pressure", sourceName: "NY Fed", sourceUrl: "https://www.newyorkfed.org/research/policy/gscpi" },
  { id: "supplierDelivery",group: "supply",    label: "Supplier deliveries", value: 56.1, unit: "ISM", asOf: "May 2025", method: "Index (>50 = slower)", sourceName: "ISM", sourceUrl: "https://www.ismworld.org/" },

  { id: "taylorGap",       group: "policy",    label: "Taylor-rule gap", value: -0.6, unit: "pp", asOf: "Aug 2025", method: "Funds − simple Taylor", sourceName: "Atlanta/Cleveland Fed", sourceUrl: "https://www.atlantafed.org/cqer/research/taylor-rule" },
];

const METRIC_DEFS = [
  {
    id: "inflationPressure",
    label: "Inflation pressure",
    kind: "Heuristic index",
    explainWhat: "How hot the underlying inflation trend is, beyond noisy monthly prints.",
    explainWhy: "High pressure raises the odds of sticky inflation and more policy tightening.",
    howCalc: "Composite of median CPI, trimmed-mean PCE, and breadth (share of items >3% y/y).",
    group: "inflation",
    direction: "higher=hotter",
    weights: { medianCPI: 0.4, trimmedPCE: 0.3, diffusionShare: 0.3 },
    calibration: { median: 2.5, mad: 0.5 },
  },
  {
    id: "energyShock",
    label: "Energy shock",
    kind: "Heuristic index",
    explainWhat: "Tension in liquid fuels markets from prices and inventories.",
    explainWhy: "Energy shocks feed headline inflation and can crimp growth.",
    howCalc: "WTI y/y vs gasoline/distillate deviations from 5-yr average.",
    group: "energy",
    direction: "higher=hotter",
    calibration: { median: 0, mad: 8 },
    weights: { wtiYoY: 0.4, gasInvVs5y: 0.3, distInvVs5y: 0.3 },
  },
  {
    id: "fundingStress",
    label: "Funding stress",
    kind: "Heuristic index",
    explainWhat: "Stress in credit and short-term funding markets.",
    explainWhy: "Tighter spreads and funding pressure can foreshadow risk-off and defaults.",
    howCalc: "HY OAS + CP–T-bill spread.",
    group: "funding",
    direction: "higher=hotter",
    calibration: { median: 3.5, mad: 0.6 },
    weights: { hyOAS: 0.7, cpTbill: 0.3 },
  },
  {
    id: "supplyDisruption",
    label: "Supply disruption",
    kind: "Heuristic index",
    explainWhat: "Congestion and delays in production/shipping networks.",
    explainWhy: "Disruptions raise delivery times, prices, and output volatility.",
    howCalc: "NY Fed GSCPI plus supplier delivery times (ISM).",
    group: "supply",
    direction: "higher=hotter",
    calibration: { median: 0, mad: 0.3 },
    weights: { gscpi: 0.7, supplierDelivery: 0.3 },
  },
  {
    id: "policyTightness",
    label: "Policy tightness",
    kind: "Assumption",
    explainWhat: "Stance of monetary policy vs a rule-of-thumb benchmark.",
    explainWhy: "Over-tight policy cools growth; too loose risks re-acceleration.",
    howCalc: "Funds rate minus a simple Taylor rule (negative = tighter than rule).",
    group: "policy",
    direction: "lower=hotter",
    calibration: { median: 0, mad: 0.75 },
    weights: { taylorGap: 1.0 },
  },
];
/* ============================================================
   DATA-DRIVEN RISK & PREDICTION (uses evidence + analogs)
   ============================================================ */
function computeAllMetricScores() {
  const out = {};
  METRIC_DEFS.forEach((m) => (out[m.id] = computeMetricScore(m)));
  return out;
}

function weightedAvg(pairs) {
  let num = 0, den = 0;
  for (const [v, w] of pairs) { if (Number.isFinite(v) && Number.isFinite(w)) { num += v*w; den += w; } }
  return den ? num / den : 0;
}

function metricsCompositeForPlaybook(selected, scores) {
  const s = scores || {};
  // Default weights cover most macro situations; tweak by dominant tag
  const base = { inflationPressure: 0.35, energyShock: 0.25, fundingStress: 0.25, supplyDisruption: 0.15 };

  const tagBoost = new Set(selected.tags || []);
  if (tagBoost.has("finance"))      { base.fundingStress = 0.55; base.inflationPressure = 0.2; base.supplyDisruption = 0.15; base.energyShock = 0.1; }
  else if (tagBoost.has("energy")) { base.energyShock = 0.55; base.inflationPressure = 0.2; base.supplyDisruption = 0.15; base.fundingStress = 0.1; }
  else if (tagBoost.has("supply")) { base.supplyDisruption = 0.5; base.energyShock = 0.25; base.inflationPressure = 0.15; base.fundingStress = 0.1; }
  else if (tagBoost.has("economy") || tagBoost.has("inflation")) {
    base.inflationPressure = 0.5; base.energyShock = 0.2; base.fundingStress = 0.2; base.supplyDisruption = 0.1;
  }

  return Math.round(
    weightedAvg([
      [s.inflationPressure, base.inflationPressure],
      [s.energyShock,       base.energyShock],
      [s.fundingStress,     base.fundingStress],
      [s.supplyDisruption,  base.supplyDisruption],
      // Optionally include policy tightness (already scaled so higher = “hotter”)
      [s.policyTightness,   0.1],
    ])
  );
}

function computeDataDrivenDial(selected, toggles, scores, quant, toggleDialFn = riskFromToggles) {
  const metricsHot = metricsCompositeForPlaybook(selected, scores);              // 0..100
  const analogWin = (quant?.stats?.winRate ?? 50);                              // 0..100 (higher = more “good” outcomes historically)
  const analogRisk = 100 - analogWin;                                           // convert to risk
  const toggleDial = toggleDialFn(selected, toggles);                           // 0..100 from assumptions

  // Blend: metrics (current) + analogs (history) + assumptions (toggles)
  const dial = 0.50 * metricsHot + 0.25 * analogRisk + 0.25 * toggleDial;
  return Math.round(Math.max(0, Math.min(100, dial)));
}

function band(n) { return n >= 70 ? "HIGH" : n >= 45 ? "MODERATE" : "LOW"; }

function generateDataDrivenPrediction(selected, dial, scores, quant) {
  const top = [...METRIC_DEFS]
    .map((m) => ({ id: m.id, label: m.label, v: scores[m.id] }))
    .sort((a, b) => (b.v ?? 0) - (a.v ?? 0))
    .slice(0, 2)
    .filter((x) => Number.isFinite(x.v));

  const analog = (quant?.analogs?.[0]) || null;
  const horizon = quant?.stats?.medianTime || "varies";

  // Pick scenario text by dial band
  const sc =
    dial >= 70 ? selected.scenarios.escalation :
    dial <= 35 ? selected.scenarios.deescalation :
                 selected.scenarios.baseline;

  const hotBits = top.length
    ? `Hottest signals: ${top.map(t => `${t.label} ${t.v}/100`).join(" · ")}. `
    : "";

  const analogBit = analog
    ? `Closest analog: ${analog.case} (${analog.period}, ${analog.similarity}% match) → outcome: ${analog.outcome}. `
    : "";

  return `Data-driven read: overall risk is ${band(dial)} (${dial}/100). ${hotBits}${analogBit}Expected path: ${sc} Typical horizon: ${horizon}.`;
}


const EV = Object.fromEntries(EVIDENCE.map((e) => [e.id, e]));
function computeMetricScore(def) {
  const { weights, calibration, direction } = def;
  let combined = 0, totalW = 0;
  for (const [id, w] of Object.entries(weights)) {
    if (!EV[id]) continue;
    combined += Number(EV[id].value) * w;
    totalW += w;
  }
  const x = totalW ? combined / totalW : 0;
  return toScore(x, calibration.median, calibration.mad, direction);
}

/* ============================================================
   NEW: Case fingerprints → analog nowcast (numeric)
   ============================================================ */

const FP_KEYS = ["inflationPressure","energyShock","fundingStress","supplyDisruption","policyTightness"];

const CASE_FINGERPRINTS = {
  "1973 Oil Crisis (US/EU)": { inflationPressure: 65, energyShock: 92, fundingStress: 35, supplyDisruption: 75, policyTightness: 35, label: "energy shock → rationing; later disinflation with policy tightening", horizon: "quarters", direction: "hotter" },
  "1979 Energy Shock (US)":  { inflationPressure: 85, energyShock: 95, fundingStress: 45, supplyDisruption: 70, policyTightness: 80, label: "second oil shock; deep tightening; inflation finally anchored", horizon: "quarters-years", direction: "hotter" },

  "Panic of 1907 (US)":      { inflationPressure: 30, energyShock: 20, fundingStress: 92, supplyDisruption: 30, policyTightness: 60, label: "funding seizure; private pooling; reforms followed", horizon: "weeks-months", direction: "hotter" },
  "Global Financial Crisis":  { inflationPressure: 25, energyShock: 15, fundingStress: 96, supplyDisruption: 40, policyTightness: 70, label: "credit collapse; guarantees/capital; slow recovery", horizon: "years", direction: "hotter" },

  "Suez Closure":            { inflationPressure: 45, energyShock: 55, fundingStress: 30, supplyDisruption: 88, policyTightness: 45, label: "canal shut; Cape reroute; normalization in months", horizon: "months", direction: "hotter" },
  "Ever Given / Suez":       { inflationPressure: 50, energyShock: 40, fundingStress: 25, supplyDisruption: 86, policyTightness: 40, label: "container jam; backlog cleared in months", horizon: "months", direction: "hotter" },
};

function vectorFrom(obj, keys){ return keys.map(k => (obj?.[k] ?? 0)); }
function cosine100(a,b){ const d=a.reduce((s,x,i)=>s+x*(b[i]||0),0); const n1=Math.sqrt(a.reduce((s,x)=>s+x*x,0))||1; const n2=Math.sqrt(b.reduce((s,x)=>s+x*x,0))||1; return Math.round((d/(n1*n2))*100); }

function currentMetricScoresObj(){
  const out = {};
  METRIC_DEFS.forEach(m => { out[m.id] = computeMetricScore(m); });
  return out;
}

function analogsFromFingerprints(selected){
  const scoresNow = currentMetricScoresObj();
  const nowVec = vectorFrom(scoresNow, FP_KEYS);
  const cases = (selected?.cases || []).filter(c => CASE_FINGERPRINTS[c.name]);
  const rows = cases.map(c => {
    const fp = CASE_FINGERPRINTS[c.name];
    const sim = cosine100(nowVec, vectorFrom(fp, FP_KEYS));
    return { case: c.name, period: String(c.year || "n/a"), similarity: sim, note: fp.label, horizon: fp.horizon, direction: fp.direction };
  }).sort((a,b)=>b.similarity-a.similarity);
  return rows.slice(0, Math.min(5, rows.length));
}

function summarizeNowcast(rows){
  if (!rows.length) return {baseline: "Not enough numeric fingerprints for this playbook.", confidence: null};
  const wsum = rows.reduce((s,r)=> s + r.similarity, 0) || 1;
  const tilt = rows.reduce((s,r)=> s + (r.direction === "hotter" ? +1 : -1)*r.similarity, 0) / wsum;
  const top = rows[0];
  const leaning = tilt > 0.15 ? "pressure likely to remain elevated near-term" : tilt < -0.15 ? "cooling bias near-term" : "balanced risks";
  const horizon = top.horizon || "months";
  const baseline = `Based on the top analog${rows.length>1?"s":""} (${rows.map(r=>r.case).slice(0,3).join(", ")}), ${leaning}; typical horizon: ${horizon}.`;
  const confidence = `Similarity ${top.similarity}% to ${top.case}.`;
  return { baseline, confidence };
}

/* ============================================================
   COMPONENTS
   ============================================================ */
function ScrollFade({ children, className, maxHeight = "calc(100vh - 230px)" }) {
  const ref = useRef(null);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      setAtTop(el.scrollTop <= 1);
      setAtBottom(el.scrollHeight - el.clientHeight - el.scrollTop <= 1);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const fadeTop = { background: "linear-gradient(180deg, rgba(11,19,38,1) 0%, rgba(11,19,38,0) 100%)" };
  const fadeBottom = { background: "linear-gradient(0deg, rgba(11,19,38,1) 0%, rgba(11,19,38,0) 100%)" };
  return (
    <div className={`scrollfade ${className || ""}`} style={{ position: "relative", maxHeight }}>
      <div ref={ref} className="scrollfade-body" style={{ overflowY: "auto", paddingRight: 8, maxHeight }}>
        {children}
      </div>
      <div className="scrollfade-fade-top" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 18, pointerEvents: "none", opacity: atTop ? 0 : 1, transition: "opacity 150ms", ...fadeTop }} />
      <div className="scrollfade-fade-bottom" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18, pointerEvents: "none", opacity: atBottom ? 0 : 1, transition: "opacity 150ms", ...fadeBottom }} />
    </div>
  );
}

function HeadlineMetrics({ onJumpEvidence }) {
  return (
    <div className="headline-metrics">
      {METRIC_DEFS.map((m) => {
        const score = computeMetricScore(m);
        const inputs = Object.keys(m.weights).map((id) => EV[id]).filter(Boolean);
        return (
          <div key={m.id} className="metric-card2">
            <div className="metric-top">
              <div className="metric-kind">{m.kind}</div>
              <div className="metric-title">{m.label}</div>
            </div>
            <div className="metric-score">
              <div className="metric-score-num">{score}</div>
              <div className="metric-score-den">/100</div>
            </div>
            <details className="metric-explain">
              <summary>Explain</summary>
              <div className="metric-explain-body">
                <div className="metric-explain-block">
                  <div className="metric-explain-head">What it means</div>
                  <p>{m.explainWhat}</p>
                </div>
                <div className="metric-explain-block">
                  <div className="metric-explain-head">Why it matters</div>
                  <p>{m.explainWhy}</p>
                </div>
                <div className="metric-explain-block">
                  <div className="metric-explain-head">How we compute it</div>
                  <p>{m.howCalc}</p>
                </div>
                <div className="metric-explain-block">
                  <div className="metric-explain-head">Evidence (inputs)</div>
                  <ul className="evidence-list">
                    {inputs.map((e) => (
                      <li key={e.id}>
                        <strong>{e.label}</strong> — {e.value}{e.unit ? ` ${e.unit}` : ""} <span className="muted">({e.method})</span>
                        {" · "}
                        <a href={e.sourceUrl} target="_blank" rel="noreferrer">{e.sourceName}</a>
                        {e.asOf ? ` · As of ${e.asOf}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="btn-link" onClick={onJumpEvidence}>See all evidence →</button>
              </div>
            </details>
          </div>
        );
      })}
    </div>
  );
}

function EvidenceGridFull() {
  return (
    <div className="evidence-grid2">
      {EVIDENCE.map((e) => (
        <div key={e.id} className="evidence-card2">
          <div className="ev-top">
            <div className="ev-label">{e.label}</div>
            <a className="ev-link" href={e.sourceUrl} target="_blank" rel="noreferrer">Source ↗</a>
          </div>
          <div className="ev-value">
            <span className="ev-num">{typeof e.value === "number" ? e.value.toLocaleString() : e.value}</span>
            {e.unit ? <span className="ev-unit">{e.unit}</span> : null}
          </div>
          <div className="ev-meta">{e.method}</div>
          <div className="ev-meta muted">{e.sourceName}{e.asOf ? ` · As of ${e.asOf}` : ""}</div>
          <div className="ev-chip">{e.pctile5y !== undefined ? `5y pct: ${Math.round(e.pctile5y)}th` : " "}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [theme, setTheme] = useState("blue");
  const [tab, setTab] = useState("overview"); // "overview" | "evidence"
  const [input, setInput] = useState(
    localStorage.getItem("pf_input") ||
      "Energy prices jump as shipping reroutes; unions seek wage catch-up; central bank signals cautious cuts."
  );
  const [toggles, setToggles] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pf_toggles")) || {
        institutions: "strong",
        mediators: true,
        infoVolatile: false,
        supplySlack: "low",
        finCond: "tight",
      };
    } catch {
      return { institutions: "strong", mediators: true, infoVolatile: false, supplySlack: "low", finCond: "tight" };
    }
  });
  const [selectedId, setSelectedId] = useState(null);
  const [selectedObj, setSelectedObj] = useState(null);
  const [query, setQuery] = useState("");
  const reportRef = useRef(null);

  useEffect(() => localStorage.setItem("pf_input", input), [input]);
  useEffect(() => localStorage.setItem("pf_toggles", JSON.stringify(toggles)), [toggles]);
  useEffect(() => { setSelectedObj(null); setSelectedId(null); }, [input]);

  const matches = useMemo(() => chooseMatches(input, 5), [input]);

  useEffect(() => {
    if (selectedObj && !matches.find(m => m.id === selectedObj.id)) {
      setSelectedObj(matches[0] || null);
    }
  }, [matches, selectedObj]);

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase();
    if (!s) return PLAYBOOKS;
    return PLAYBOOKS.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.tags.some((t) => t.includes(s)) ||
        (p.keywords || []).some((k) => k.includes(s))
    );
  }, [query]);

  const selected =
    selectedObj ||
    PLAYBOOKS.find((p) => p.id === selectedId) ||
    matches[0] ||
    filtered[0] ||
    PLAYBOOKS[0];

  //const dial = riskFromToggles(selected, toggles);
  //const futureText = possibleFutureText(selected, toggles);
  const onExportPDF = () => window.print();

  const eventObj = useMemo(() => makeEvent(input, selected, toggles), [input, selected, toggles]);
  const quant = useMemo(() => buildQuantPack(eventObj, selected), [eventObj, selected]);
  // === Data-driven dial + prediction (uses evidence + analogs + toggles)
const metricScores = useMemo(() => computeAllMetricScores(), []);
const dial = useMemo(
  () => computeDataDrivenDial(selected, toggles, metricScores, quant),
  [selected, toggles, metricScores, quant]
);
const futureText = useMemo(
  () => generateDataDrivenPrediction(selected, dial, metricScores, quant),
  [selected, dial, metricScores, quant]
);


  const numericAnalogs = useMemo(() => analogsFromFingerprints(selected), [selected]);
  const nowcastSummary = useMemo(() => summarizeNowcast(numericAnalogs), [numericAnalogs]);

  return (
    <div className="app" data-theme={theme}>
      <style>{styles}</style>

      <header className="topbar no-print">
        <div className="brand">{BRAND}</div>
        <div className="tagline">Use history like a playbook for today.</div>
        <div className="actions">
          <div className="themes">
            <span className="t-label">Theme:</span>
            {["blue", "teal", "violet", "amber"].map((t) => (
              <button
                key={t}
                className={`t-btn ${theme === t ? "active" : ""}`}
                onClick={() => setTheme(t)}
                title={`Switch to ${t}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="btn export" onClick={onExportPDF}>Export to PDF</button>
        </div>
      </header>

      <div className="grid">
        {/* Left */}
        <section className="panel left no-print">
          <h2>Your Situation</h2>
          <textarea
            className="situation"
            placeholder="Paste a headline or describe what's happening…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="hint">Tip: mention key nouns/verbs (e.g., ‘wage talks’, ‘canal closure’, ‘bank run’).</div>

          <h3 className="subhead">Best Historical Playbooks</h3>
          {matches.length === 0 ? (
            <div className="empty">No strong matches yet. Add detail or pick one from the library.</div>
          ) : (
            <ul className="matches">
              {matches.map((m) => (
                <li
                  key={m.id}
                  className={`match ${selected?.id === m.id ? "active" : ""}`}
                  onClick={() => { setSelectedObj(m); setSelectedId(null); }}
                >
                  <div className="m-title">{m.title}</div>
                  <div className="m-era">{m.era}</div>
                  <div className="chips">
                    {m.tags.slice(0, 3).map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <h3 className="subhead">Library</h3>
          <input
            className="search"
            placeholder="Search playbooks…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="library">
            {filtered.map((p) => (
              <button
                key={p.id}
                className={`lib-btn ${(!selectedObj && selected?.id === p.id) ? "active" : ""}`}
                onClick={() => { setSelectedId(p.id); setSelectedObj(null); }}
                title={p.title}
              >
                {p.title}
              </button>
            ))}
          </div>
        </section>

        {/* Right (prints) */}
        <section className="panel right printable" ref={reportRef}>
          <div className="title-row">
            <h2 className="playbook-title">{selected.title}</h2>
            <div className="era">{selected.era}</div>
          </div>

          {/* Tabs */}
          <div className="tabs no-print">
            {["overview","evidence"].map(t => (
              <button
                key={t}
                className={`tab ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t === "overview" ? "Overview" : "Evidence"}
              </button>
            ))}
          </div>

          {/* OVERVIEW (scrollable) */}
          {tab === "overview" && (
            <ScrollFade>
              <p className="summary">{selected.summary}</p>

              <div className="section">
                <div className="section-title">Key Metrics (0–100, backed by evidence)</div>
                <HeadlineMetrics onJumpEvidence={() => setTab("evidence")} />
                <div className="metrics-footnote">Scale 0–100 · Click “Explain” for methods & sources.</div>
              </div>

              {/* NEW: Nowcast from historic lookalikes */}
              {numericAnalogs.length > 0 && (
                <div className="section">
                  <div className="section-title">Prediction (nowcast from historic lookalikes)</div>
                  <div className="nowcast">
                    <div className="nowcast-main">{nowcastSummary.baseline}</div>
                    {nowcastSummary.confidence && <div className="nowcast-conf">{nowcastSummary.confidence}</div>}
                    <div className="analogs-grid">
                      {numericAnalogs.map((a, i) => (
                        <div key={i} className="analog-card">
                          <div className="analog-case">{a.case}</div>
                          <div className="analog-period">{a.period}</div>
                          <div className="analog-sim">{a.similarity}% match</div>
                          <div className="analog-outcome">{a.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid2">
                <div className="section">
                  <div className="section-title">Signals (top)</div>
                  <ul className="bullets clamp-6">
                    {selected.signals.slice(0,6).map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                  {selected.signals.length > 6 && <details className="more"><summary>Show all signals</summary>
                    <ul className="bullets">{selected.signals.map((s, i) => <li key={i}>{s}</li>)}</ul>
                  </details>}
                </div>

                <div className="section">
                  <div className="section-title">What to Watch (top)</div>
                  <ul className="bullets clamp-6">
                    {selected.whatToWatch.slice(0,6).map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                  {selected.whatToWatch.length > 6 && <details className="more"><summary>Show all</summary>
                    <ul className="bullets">{selected.whatToWatch.map((s, i) => <li key={i}>{s}</li>)}</ul>
                  </details>}
                </div>
              </div>

              <div className="section">
                <div className="section-title">Tailor for Today</div>
                <div className="toggles no-print">
                  <div className="toggle">
                    <label>Institutions</label>
                    <select value={toggles.institutions} onChange={(e) => setToggles({ ...toggles, institutions: e.target.value })}>
                      <option value="strong">Strong</option><option value="weak">Weak</option>
                    </select>
                  </div>
                  <div className="toggle">
                    <label>External mediators present</label>
                    <input type="checkbox" checked={toggles.mediators} onChange={(e) => setToggles({ ...toggles, mediators: e.target.checked })}/>
                  </div>
                  <div className="toggle">
                    <label>Info environment volatile</label>
                    <input type="checkbox" checked={toggles.infoVolatile} onChange={(e) => setToggles({ ...toggles, infoVolatile: e.target.checked })}/>
                  </div>
                  <div className="toggle">
                    <label>Supply slack</label>
                    <select value={toggles.supplySlack} onChange={(e) => setToggles({ ...toggles, supplySlack: e.target.value })}>
                      <option value="high">High</option><option value="low">Low</option>
                    </select>
                  </div>
                  <div className="toggle">
                    <label>Financial conditions</label>
                    <select value={toggles.finCond} onChange={(e) => setToggles({ ...toggles, finCond: e.target.value })}>
                      <option value="loose">Loose</option><option value="tight">Tight</option>
                    </select>
                  </div>
                </div>

                <div className="risk">
                  <div className="risk-head"><span>Risk dial</span><span className="risk-num">{dial}</span></div>
                  <div className="bar"><div className="bar-fill" style={{ width: `${dial}%` }} /></div>
                  <div className="print-toggles only-print">
                    <strong>Assumptions:</strong>{" "}
                    Institutions: {toggles.institutions}; Mediators: {toggles.mediators ? "Yes" : "No"}; Info volatility: {toggles.infoVolatile ? "High" : "Normal"}; Supply slack: {toggles.supplySlack}; Financial conditions: {toggles.finCond}.
                  </div>
                </div>
              </div>

              <div className="section">
                <div className="section-title">Scenario Map</div>
                <div className="scenarios">
                  <div className="scenario"><div className="sc-title">Baseline</div><p>{selected.scenarios.baseline}</p></div>
                  <div className="scenario"><div className="sc-title">Escalation</div><p>{selected.scenarios.escalation}</p></div>
                  <div className="scenario"><div className="sc-title">De-escalation</div><p>{selected.scenarios.deescalation}</p></div>
                </div>
              </div>

              <div className="section">
                <div className="section-title">Possible Future (applied)</div>
                <p>{futureText}</p>
                <div className="report-meta only-print">Generated: {new Date().toLocaleString()} · {BRAND}</div>
              </div>

              {(quant.metrics.length + quant.analogs.length) > 0 && (
                <div className="section no-print">
                  <button className="btn export" onClick={() => setTab("evidence")}>View Evidence →</button>
                </div>
              )}
            </ScrollFade>
          )}

          {/* EVIDENCE (heavy) */}
          {tab === "evidence" && (
            <>
              <div className="section quant-pack">
                <div className="section-title">Similar Conditions & Metrics</div>

                {quant.metrics.length > 0 && (
                  <div className="quant-metrics">
                    {quant.metrics.map((m, i) => (
                      <div key={i} className="metric-card">
                        <div className="metric-name">{m.name}</div>
                        <div className="metric-value">{m.value}{m.unit ? ` ${m.unit}` : ""}</div>
                        <div className="metric-note">{m.note}</div>
                      </div>
                    ))}
                  </div>
                )}

                {numericAnalogs.length > 0 && (
                  <div className="quant-analogs">
                    <div className="analogs-title">Closest historical periods (numeric)</div>
                    <div className="analogs-grid">
                      {numericAnalogs.map((a, i) => (
                        <div key={i} className="analog-card">
                          <div className="analog-case">{a.case}</div>
                          <div className="analog-period">{a.period}</div>
                          <div className="analog-sim">{a.similarity}% match</div>
                          <div className="analog-outcome">{a.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="section">
                <div className="section-title">By-the-Numbers Evidence</div>
                <EvidenceGridFull />
              </div>

              <div className="section">
                <div className="section-title">Case Examples (full)</div>
                <div className="cases">
                  {selected.cases.map((c, i) => (
                    <div className="case" key={i}>
                      <div className="case-name">{c.name}</div>
                      <div className="case-year">{c.year}</div>
                      <div className="case-outcome">{c.result}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      <footer className="foot no-print">
        <span>© {new Date().getFullYear()} {BRAND}</span>
        <span className="sep">•</span>
        <span>Built to make history practical.</span>
      </footer>
    </div>
  );
}

/* ========================== STYLES (themes + print) ========================== */
const styles = `
:root{
  --bg:#0b1220; --panel:#0e172a; --panel2:#0b1326; --line:#1f2937; --text:#e5e7eb; --muted:#9fb1c9;
  --chipText:#083344; --good:#34d399; --warn:#f59e0b; --bad:#ef4444;
  --accent:#93c5fd; --brand:#cfe3ff; --chip:#7dd3fc; --btnText:#a7f3d0;
}
.app[data-theme="teal"]{--accent:#5eead4; --brand:#a7f3d0; --chip:#99f6e4; --btnText:#99f6e4;}
.app[data-theme="violet"]{--accent:#c4b5fd; --brand:#ddd6fe; --chip:#d8b4fe; --btnText:#e9d5ff;}
.app[data-theme="amber"]{--accent:#fcd34d; --brand:#fde68a; --chip:#fde68a; --btnText:#fde68a;}
.app[data-theme="blue"]{--accent:#93c5fd; --brand:#cfe3ff; --chip:#7dd3fc; --btnText:#a7f3d0;}

*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;background:radial-gradient(1200px 800px at 20% -10%, #111a2e 0%, #0b1220 60%), radial-gradient(1200px 800px at 120% 120%, #10172a 0%, #0b1220 60%); color:var(--text); font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
a{color:inherit}

.app{min-height:100vh;display:flex;flex-direction:column}
.topbar{display:flex;gap:16px;align-items:center;justify-content:space-between;padding:16px 20px 8px}
.brand{font-size:20px;font-weight:900;color:var(--brand);letter-spacing:.3px}
.tagline{color:var(--muted);font-size:13px}
.actions{display:flex;align-items:center;gap:12px}
.themes{display:flex;align-items:center;gap:8px}
.t-label{color:var(--muted);font-size:12px}
.t-btn{border:1px solid var(--line); background:#0f172a; color:var(--btnText); border-radius:8px; padding:6px 10px; cursor:pointer; text-transform:capitalize}
.t-btn.active{outline:2px solid var(--accent)}
.btn.export{border:1px solid var(--line); background:#0f172a; color:var(--btnText); border-radius:10px; padding:8px 12px; cursor:pointer}

.grid{display:grid;grid-template-columns:420px 1fr;gap:16px; padding:12px 16px 8px}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px}
.right{background:var(--panel2)}
.left .situation{width:100%;height:120px;border-radius:12px;border:1px solid var(--line);background:#111827;color:var(--text);padding:10px 12px;font-size:14px;resize:vertical}
.hint{color:var(--muted);font-size:12px;margin-top:8px}
.subhead{margin:16px 0 8px 0;color:#cbd5e1;font-size:14px}
.matches{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.match{border:1px solid var(--line);border-radius:12px;padding:10px;background:#0e1a33;cursor:pointer;transition:150ms}
.match:hover{border-color:#20304f}
.match.active{background:#17233f;border-color:#2a3d64}
.m-title{font-weight:800;font-size:14px;color:#dbeafe}
.m-era{color:var(--muted);font-size:12px;margin-top:4px}
.chips{margin-top:6px;display:flex;gap:6px;flex-wrap:wrap}
.chip{background:var(--chip);color:var(--chipText);padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700}

.search{width:100%;height:36px;border-radius:10px;border:1px solid var(--line);background:#111827;color:var(--text);padding:0 12px;margin-bottom:8px}
.library{display:grid;grid-template-columns:1fr;gap:8px;max-height:260px;overflow:auto}
.lib-btn{border:1px solid var(--line);background:#0e1a33;color:#dbeafe;border-radius:12px;padding:10px;text-align:left;cursor:pointer}
.lib-btn:hover{border-color:#20304f}
.lib-btn.active{background:#17233f;border-color:#2a3d64}

.right .title-row{display:flex;align-items:baseline;gap:10px}
.playbook-title{margin:0;font-size:22px;font-weight:900;color:#eaf2ff}
.era{color:#9fb1c9;font-size:13px}
.summary{margin-top:10px;color:#ced7e8}
.section{margin-top:16px;padding-top:12px;border-top:1px solid var(--line)}
.section-title{font-weight:900;color:#cbd5e1;margin-bottom:8px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.bullets{margin:0;padding-left:18px;color:#d6e1f3}
.cases{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
.case{border:1px solid var(--line);border-radius:12px;background:#0e1a33;padding:10px}
.case-name{font-weight:800;color:#dbeafe}
.case-year{color:#9fb1c9;font-size:12px;margin:2px 0 6px}
.case-outcome{color:#d6e1f3;font-size:13px}
.scenarios{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.scenario{border:1px solid var(--line);border-radius:12px;background:#0e1a33;padding:10px}
.sc-title{font-weight:800;margin-bottom:4px;color:#dbeafe}

.toggles{display:grid;grid-template-columns:repeat(5,minmax(140px,1fr));gap:10px;align-items:center}
.toggle{display:flex;gap:8px;align-items:center;background:#0e1a33;border:1px solid var(--line);padding:8px 10px;border-radius:10px}
.toggle label{font-size:13px;color:#cbd5e1}
.toggle input[type="checkbox"]{width:16px;height:16px}
.toggle select{background:#0f172a;color:var(--text);border:1px solid var(--line);border-radius:8px;padding:4px 8px}

.risk{margin-top:12px}
.risk-head{display:flex;justify-content:space-between;align-items:center}
.risk-num{font-weight:900}
.bar{height:12px;background:#0f172a;border:1px solid var(--line);border-radius:999px;overflow:hidden}
.bar-fill{height:100%; background:linear-gradient(90deg,var(--good),var(--warn),var(--bad))}
.print-toggles{margin-top:8px;color:#6b7280;font-size:12px}
.report-meta{margin-top:8px;color:#6b7280;font-size:12px}

.foot{display:flex;gap:8px;align-items:center;justify-content:center;color:#9fb1c9;font-size:12px;padding:16px 0 24px}

/* Tabs */
.tabs{display:flex;gap:8px;margin-top:4px}
.tab{border:1px solid var(--line);background:#0e1a33;color:#dbeafe;border-radius:10px;padding:6px 10px;cursor:pointer}
.tab.active{outline:2px solid var(--accent)}

/* Clamp long lists in Overview — extra space on bottom for readability */
.clamp-6{
  max-height:9.5em;
  overflow:hidden;
  position:relative;
  padding-bottom:14px;
  margin-bottom:4px;
}
.clamp-6::after{
  content:"";
  position:absolute; left:0; right:0; bottom:0;
  height:28px;
  pointer-events:none;
  background:linear-gradient(
    180deg,
    rgba(14,26,51,0) 0%,
    rgba(14,26,51,.55) 60%,
    rgba(14,26,51,.85) 85%,
    rgba(14,26,51,1) 100%
  );
}

.more summary{cursor:pointer; color:#9fb1c9; margin-top:6px}
.more[open] summary{color:#cbd5e1}

/* Quant Pack */
.quant-pack{margin-top:16px}
.quant-metrics{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-bottom:12px}
.metric-card{background:#0e1a33;border:1px solid var(--line);border-radius:8px;padding:8px}
.metric-name{font-size:12px;color:#9fb1c9}
.metric-value{font-size:16px;font-weight:700}
.metric-note{font-size:11px;color:#9fb1c9}
.quant-analogs .analogs-title{font-weight:700;margin-bottom:6px}
.analogs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;margin-bottom:12px}
.analog-card{background:#0e1a33;border:1px solid var(--line);border-radius:8px;padding:8px;font-size:12px}
.analog-case{font-weight:700;color:#dbeafe}
.analog-period{color:#9fb1c9}
.analog-sim{font-size:11px;color:#9fb1c9}
.analog-outcome{font-size:12px;margin-top:4px}
.quant-stats{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:8px;font-size:13px}
.quant-citations{font-size:11px;color:#9fb1c9;display:flex;flex-direction:column;gap:4px}
.quant-citations a{color:#9fb1c9;text-decoration:underline}

/* NEW: Headline metrics on Overview */
.headline-metrics{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
.metric-card2{border:1px solid var(--line);background:#0e1a33;border-radius:12px;padding:10px}
.metric-top{display:flex;flex-direction:column;gap:2px}
.metric-kind{color:#9fb1c9;font-size:11px}
.metric-title{font-weight:800;color:#dbeafe}
.metric-score{display:flex;align-items:baseline;gap:6px;margin-top:6px}
.metric-score-num{font-size:28px;font-weight:900}
.metric-score-den{color:#9fb1c9}
.metric-explain{margin-top:6px}
.metric-explain summary{cursor:pointer; color:#9fb1c9}
.metric-explain[open] summary{color:#cbd5e1}
.metric-explain-body{margin-top:6px; font-size:13px; color:#d6e1f3}
.metric-explain-head{font-weight:800; color:#dbeafe; margin-top:6px; margin-bottom:2px}
.evidence-list{margin:4px 0 8px 16px; padding:0}
.btn-link{background:none;border:none;color:var(--accent);cursor:pointer;padding:0}
.metrics-footnote{margin-top:6px; color:#9fb1c9; font-size:12px}

/* NEW: Evidence grid */
.evidence-grid2{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
.evidence-card2{border:1px solid var(--line);background:#0e1a33;border-radius:12px;padding:10px}
.ev-top{display:flex;align-items:center;justify-content:space-between}
.ev-label{font-size:13px;color:#dbeafe;font-weight:700}
.ev-link{font-size:12px;color:#9fb1c9;text-decoration:underline}
.ev-value{display:flex;align-items:baseline;gap:6px;margin-top:6px}
.ev-num{font-size:22px;font-weight:800}
.ev-unit{color:#9fb1c9}
.ev-meta{font-size:12px;color:#d6e1f3;margin-top:2px}
.ev-meta.muted{color:#9fb1c9}
.ev-chip{margin-top:6px;font-size:11px;color:#9fb1c9}

/* Nowcast section */
.nowcast-main{font-weight:700;margin-bottom:4px}
.nowcast-conf{color:#9fb1c9;font-size:12px;margin-bottom:8px}

/* ScrollFade base */
.scrollfade{}

/* Print */
@media print{
  :root{color-scheme:light;}
  body{background:white !important;}
  .no-print{display:none !important;}
  .grid{grid-template-columns:1fr !important; padding:0; margin:0;}
  .panel.right{border:none !important; background:white !important; color:#111827 !important;}
  .panel.right .section{border-color:#e5e7eb}
  .playbook-title{color:#111827}
  .era{color:#6b7280}
  .summary,.bullets,.case-outcome{color:#111827}
  .case{background:#ffffff; border-color:#e5e7eb}
  .scenario{background:#ffffff; border-color:#e5e7eb}
  .bar{background:#f3f4f6; border-color:#e5e7eb}
  .bar-fill{background:linear-gradient(90deg,#10b981,#f59e0b,#ef4444)}
  .tabs{display:none !important;}
  .clamp-6{max-height:none; overflow:visible}
  .clamp-6::after{display:none}
  @page{ size:auto; margin:18mm; }
}

@media (max-width: 1100px){
  .grid{grid-template-columns:1fr;gap:12px}
  .grid2{grid-template-columns:1fr}
  .toggles{grid-template-columns:1fr 1fr}
  .scenarios{grid-template-columns:1fr}
}
`;
