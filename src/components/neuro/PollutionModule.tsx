import { Wind, Factory, Droplets, Trees } from "lucide-react";

const cells = Array.from({ length: 96 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.7)) * 100;
  return Math.round(v);
});

const cities = [
  { name: "Delhi", aqi: 184, tone: "danger" },
  { name: "Lahore", aqi: 162, tone: "danger" },
  { name: "Beijing", aqi: 98, tone: "warn" },
  { name: "Cairo", aqi: 88, tone: "warn" },
  { name: "Mexico City", aqi: 71, tone: "warn" },
  { name: "Lagos", aqi: 64, tone: "warn" },
  { name: "Reykjavík", aqi: 12, tone: "good" },
  { name: "Wellington", aqi: 18, tone: "good" },
];

function color(v: number) {
  if (v > 75) return "oklch(0.7 0.22 25 / 0.85)";
  if (v > 50) return "oklch(0.82 0.18 80 / 0.8)";
  if (v > 25) return "oklch(0.86 0.22 155 / 0.6)";
  return "oklch(0.85 0.16 200 / 0.35)";
}

export function PollutionModule() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono text-glow-cyan mb-3">
            <Wind className="h-3 w-3" /> POLLUTION INTELLIGENCE
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Global pollution heatmap
          </h2>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          {[
            { l: "Good", c: "oklch(0.85 0.16 200)" },
            { l: "Mod", c: "oklch(0.86 0.22 155)" },
            { l: "High", c: "oklch(0.82 0.18 80)" },
            { l: "Hazard", c: "oklch(0.7 0.22 25)" },
          ].map((x) => (
            <span key={x.l} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: x.c, boxShadow: `0 0 8px ${x.c}` }} />
              {x.l}
            </span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <div className="glass p-5">
          <div className="grid grid-cols-12 gap-1.5">
            {cells.map((v, i) => (
              <div
                key={i}
                className="aspect-square rounded-md transition-all duration-500 hover:scale-110"
                style={{ background: color(v), boxShadow: `0 0 10px ${color(v)}` }}
                title={`AQI ${v}`}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span>96 sectors · last refresh 4s ago</span>
            <span className="text-glow-green">AI smoothing: ON</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="glass p-3 space-y-2">
            {cities.map((c) => {
              const tone =
                c.tone === "danger"
                  ? "text-destructive"
                  : c.tone === "warn"
                  ? "text-[var(--warn)]"
                  : "text-glow-green";
              return (
                <div key={c.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-border">
                  <div className="h-9 w-9 rounded-lg bg-white/5 grid place-items-center">
                    <Factory className={`h-4 w-4 ${tone}`} />
                  </div>
                  <div className="flex-1 text-sm font-medium">{c.name}</div>
                  <div className={`font-mono text-sm ${tone}`}>AQI {c.aqi}</div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass p-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                <Droplets className="h-3 w-3 text-glow-cyan" /> Water purity
              </div>
              <div className="mt-2 font-display text-xl font-bold text-glow-cyan">94.6%</div>
            </div>
            <div className="glass p-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                <Trees className="h-3 w-3 text-glow-green" /> Forest cover
              </div>
              <div className="mt-2 font-display text-xl font-bold text-glow-green">+0.4% wk</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
