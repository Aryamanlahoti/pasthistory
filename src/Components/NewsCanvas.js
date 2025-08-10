import { useRef, useEffect } from "react";

export default function NewsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    function resizeCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      drawUI(ctx, width, height);
    }

    function drawRoundedRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    function drawUI(ctx, width, height) {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#0f2027");
      gradient.addColorStop(0.5, "#203a43");
      gradient.addColorStop(1, "#2c5364");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Title
      ctx.font = "bold 36px 'Segoe UI', sans-serif";
      ctx.fillStyle = "#00E5FF";
      ctx.textBaseline = "top";
      ctx.fillText("Today's Headlines", 20, 20);

      // Search box
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#183a5c";
      drawRoundedRect(ctx, 20, 70, width - 40, 40, 10);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.font = "18px 'Segoe UI', sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fillText("Search news...", 30, 80);

      // Example card
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 6;
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      drawRoundedRect(ctx, 20, 140, width - 40, 100, 10);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.font = "bold 24px 'Segoe UI', sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("US Inflation Hits New Highs in 2025", 30, 150);

      ctx.font = "16px 'Segoe UI', sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText(
        "Inflation continues to surge due to supply chain issues and increased demand...",
        30,
        180
      );
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block", width: "100vw", height: "100vh" }} />;
}
