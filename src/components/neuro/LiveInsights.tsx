import { TrendingUp, Recycle, Wind, Leaf, Sparkles } from "lucide-react";

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 100;
  const h = 36;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12">
      <defs>
        <linearGradient id={`g-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#g-${color})`} />
      <path d={d} stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Bars({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1 h-12">
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            height: `${(v / max) * 100}%`,
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
          className="flex-1 rounded-t-sm opacity-80"
        />
      ))}
    </div>
  );
}

const cyan = "oklch(0.85 0.16 200)";
const green = "oklch(0.86 0.22 155)";

export function LiveInsights() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Live insights
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time analytics streamed from 1.2M+ sensors and AI models.
          </p>
        </div>
        <span className="text-xs font-mono text-glow-green flex items-center gap-2">
          <span className="status-dot" /> STREAMING
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="glass p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-glow-cyan" /> Energy usage
            </div>
            <span className="text-xs text-glow-cyan font-mono">-12%</span>
          </div>
          <div className="mt-3 text-3xl font-display font-bold">12.4 TWh</div>
          <Sparkline
            color={cyan}
            points={[20, 32, 28, 40, 38, 50, 46, 60, 58, 72, 68, 80]}
          />
          <div className="text-xs text-muted-foreground mt-1">Last 24h</div>
        </div>

        <div className="glass p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Recycle className="h-4 w-4 text-glow-green" /> Recycling rate
            </div>
            <span className="text-xs text-glow-green font-mono">+4.8%</span>
          </div>
          <div className="mt-3 text-3xl font-display font-bold">92%</div>
          <Bars values={[40, 55, 48, 62, 70, 65, 78, 82, 75, 88, 90, 92]} color={green} />
          <div className="text-xs text-muted-foreground mt-1">Weekly trend</div>
        </div>

        <div className="glass p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wind className="h-4 w-4 text-glow-cyan" /> Environmental index
            </div>
            <span className="text-xs text-glow-cyan font-mono">stable</span>
          </div>
          <div className="mt-3 text-3xl font-display font-bold">94.2</div>
          <Sparkline
            color={green}
            points={[60, 62, 58, 64, 70, 68, 72, 75, 73, 78, 80, 82]}
          />
          <div className="text-xs text-muted-foreground mt-1">30-day rolling</div>
        </div>

        <div className="glass p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Leaf className="h-4 w-4 text-glow-green" /> Carbon reduction
            </div>
            <span className="text-xs font-mono text-glow-green">YTD</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { v: "284 Mt", l: "CO₂ offset" },
              { v: "18.4k", l: "Solar farms" },
              { v: "62%", l: "Grid renewable" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl p-4 bg-white/5 border border-border">
                <div className="font-display text-2xl font-bold text-glow-green">
                  {s.v}
                </div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          <Bars
            values={[30, 45, 38, 52, 60, 55, 68, 72, 65, 78, 82, 90, 88, 95]}
            color={cyan}
          />
        </div>

        <div className="glass p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-glow-cyan" />
              <span className="font-mono text-xs uppercase tracking-widest text-glow-cyan">
                AI Prediction
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              Projected <span className="text-glow-green font-semibold">+8.4%</span>{" "}
              renewable share by Q3. Recommend shifting 240 MW from gas peakers to
              new battery clusters in zones <span className="font-mono">EU-12</span>{" "}
              and <span className="font-mono">APAC-04</span>.
            </p>
            <button className="mt-4 text-xs font-mono text-glow-cyan">
              REVIEW PLAN →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
