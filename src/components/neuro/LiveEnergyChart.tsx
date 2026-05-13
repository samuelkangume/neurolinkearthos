import { useEffect, useRef, useState } from "react";
import { Activity, TrendingDown } from "lucide-react";

export function LiveEnergyChart() {
  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: 40 }, (_, i) => 50 + Math.sin(i / 3) * 18 + Math.random() * 10),
  );
  const [latest, setLatest] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      ref.current += 1;
      setData((prev) => {
        const next = 55 + Math.sin(ref.current / 3) * 18 + Math.random() * 12;
        setLatest(next);
        return [...prev.slice(1), next];
      });
    }, 900);
    return () => clearInterval(id);
  }, []);

  const w = 600;
  const h = 160;
  const max = Math.max(...data) + 5;
  const min = Math.min(...data) - 5;
  const path = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-6">
      <div className="glass p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4 text-glow-cyan" /> Live planetary energy load
            </div>
            <div className="flex items-baseline gap-3 mt-2">
              <div className="text-3xl font-display font-bold text-glow-cyan">
                {latest.toFixed(1)} <span className="text-base text-muted-foreground">TWh</span>
              </div>
              <span className="text-xs font-mono text-glow-green flex items-center gap-1">
                <TrendingDown className="h-3 w-3" /> -12% vs baseline
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-glow-green flex items-center gap-2">
            <span className="status-dot" /> STREAMING · 1Hz
          </span>
        </div>

        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
          <defs>
            <linearGradient id="le-g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--cyan-glow)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--cyan-glow)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((y) => (
            <line
              key={y}
              x1="0"
              x2={w}
              y1={h * y}
              y2={h * y}
              stroke="oklch(0.85 0.16 200 / 0.08)"
              strokeDasharray="2 4"
            />
          ))}
          <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#le-g)" />
          <path d={path} stroke="var(--cyan-glow)" strokeWidth="2" fill="none" />
          {data.length > 0 && (() => {
            const i = data.length - 1;
            const x = (i / (data.length - 1)) * w;
            const y = h - ((data[i] - min) / (max - min)) * h;
            return (
              <g>
                <circle cx={x} cy={y} r="4" fill="var(--cyan-glow)" />
                <circle cx={x} cy={y} r="9" fill="var(--cyan-glow)" opacity="0.25">
                  <animate attributeName="r" from="4" to="14" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.4s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })()}
        </svg>
      </div>
    </section>
  );
}
