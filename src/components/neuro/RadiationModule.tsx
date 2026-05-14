import { useEffect, useState } from "react";
import { Atom, ShieldAlert, Activity } from "lucide-react";

const sites = [
  { name: "Fukushima Sector 4", level: 0.18, unit: "µSv/h", status: "normal" },
  { name: "Chernobyl Exclusion", level: 1.42, unit: "µSv/h", status: "elevated" },
  { name: "ITER · Cadarache", level: 0.09, unit: "µSv/h", status: "normal" },
  { name: "Bushehr Reactor", level: 0.21, unit: "µSv/h", status: "normal" },
  { name: "Mars Hab · Sim-7", level: 12.6, unit: "µSv/h", status: "watch" },
];

export function RadiationModule() {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 30), 200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono text-glow-cyan mb-3">
            <Atom className="h-3 w-3" /> RADIAL ACTIVITY · PLANETARY GRID
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Radiation &amp; nuclear safety mesh
          </h2>
        </div>
        <span className="text-xs font-mono text-glow-green flex items-center gap-2">
          <span className="status-dot" /> 8,420 sensors live
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-5">
        <div className="glass p-6 relative overflow-hidden">
          <div className="text-xs font-mono uppercase tracking-widest text-glow-cyan flex items-center gap-2">
            <Activity className="h-3 w-3" /> Live radial pulse
          </div>
          <div className="mt-6 grid place-items-center">
            <div className="relative h-44 w-44">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border"
                  style={{
                    borderColor: "oklch(0.85 0.16 200 / 0.3)",
                    transform: `scale(${0.4 + ((pulse + i * 7) % 30) / 30 * 0.6})`,
                    opacity: 1 - ((pulse + i * 7) % 30) / 30,
                    transition: "transform 0.2s linear, opacity 0.2s linear",
                  }}
                />
              ))}
              <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 grid place-items-center neon-border">
                <Atom className="h-6 w-6 text-glow-cyan" />
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Avg dose</div>
              <div className="font-display text-lg font-bold text-glow-green">0.21 µSv/h</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Anomalies</div>
              <div className="font-display text-lg font-bold text-[var(--warn)]">2</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Containment</div>
              <div className="font-display text-lg font-bold text-glow-cyan">100%</div>
            </div>
          </div>
        </div>

        <div className="glass p-3 space-y-2">
          {sites.map((s) => {
            const tone =
              s.status === "elevated" || s.status === "watch" ? "warn" : "green";
            return (
              <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border">
                <div className={`h-10 w-10 rounded-lg grid place-items-center ${tone === "warn" ? "bg-[oklch(0.82_0.18_80/0.15)] text-[var(--warn)]" : "bg-secondary/15 text-glow-green"}`}>
                  {tone === "warn" ? <ShieldAlert className="h-4 w-4" /> : <Atom className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground capitalize">{s.status}</div>
                </div>
                <div className="text-right">
                  <div className={`font-mono text-sm ${tone === "warn" ? "text-[var(--warn)]" : "text-glow-green"}`}>
                    {s.level} <span className="text-[10px] text-muted-foreground">{s.unit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
