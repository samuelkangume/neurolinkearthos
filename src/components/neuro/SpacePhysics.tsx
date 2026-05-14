import { useEffect, useState } from "react";
import { Orbit, Sparkles, Radio, Sun } from "lucide-react";

const sats = [
  { id: "NEURO-SAT 01", orbit: "LEO", alt: "412 km", health: 99 },
  { id: "NEURO-SAT 07", orbit: "MEO", alt: "12,800 km", health: 96 },
  { id: "NEURO-SAT 14", orbit: "GEO", alt: "35,786 km", health: 92 },
  { id: "DEEP-LINK 02", orbit: "L2", alt: "1.5M km", health: 88 },
];

export function SpacePhysics() {
  const [kp, setKp] = useState(3.2);
  const [flare, setFlare] = useState("C2.1");
  const [solar, setSolar] = useState(178);

  useEffect(() => {
    const id = setInterval(() => {
      setKp((v) => Math.max(0, Math.min(9, v + (Math.random() - 0.5) * 0.4)));
      setSolar((v) => Math.max(140, Math.min(260, v + (Math.random() - 0.5) * 8)));
      const c = ["A1.0", "B4.2", "C2.1", "C7.8", "M1.4"];
      if (Math.random() > 0.85) setFlare(c[Math.floor(Math.random() * c.length)]);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono text-glow-cyan mb-3">
            <Orbit className="h-3 w-3" /> SPACE PHYSICS · ORBITAL MESH
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Solar weather &amp; orbital intelligence
          </h2>
        </div>
        <span className="text-xs font-mono text-glow-green flex items-center gap-2">
          <span className="status-dot" /> 142 sats linked
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5">
        <div className="glass p-6 relative overflow-hidden aspect-[16/10] grid-bg">
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative h-[78%] aspect-square">
              <div className="absolute inset-0 rounded-full border border-primary/30 animate-spin-slow" />
              <div className="absolute inset-[10%] rounded-full border border-secondary/30 animate-spin-slow" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
              <div className="absolute inset-[22%] rounded-full border border-primary/20 animate-spin-slow" style={{ animationDuration: "55s" }} />
              <div className="absolute inset-[34%] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 grid place-items-center neon-border">
                <span className="text-xs font-mono text-glow-cyan">EARTH</span>
              </div>
              {/* satellites */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 animate-spin-slow"
                  style={{ animationDuration: `${20 + i * 12}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
                >
                  <div
                    className="absolute h-2 w-2 rounded-full bg-[var(--cyan-glow)] shadow-[0_0_12px_var(--cyan-glow)]"
                    style={{ top: `${10 + i * 10}%`, left: "50%", transform: "translateX(-50%)" }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-3 left-3 text-[10px] font-mono text-muted-foreground">
            <Sparkles className="h-3 w-3 inline mr-1" /> AI ORBIT SIMULATION
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Kp Index", value: kp.toFixed(1), tone: kp > 5 ? "warn" : "cyan", icon: Radio },
              { label: "Solar flux", value: `${solar.toFixed(0)} sfu`, tone: "green", icon: Sun },
              { label: "Last flare", value: flare, tone: flare.startsWith("M") ? "warn" : "cyan", icon: Sparkles },
            ].map((m) => (
              <div key={m.label} className="glass p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.label}</span>
                  <m.icon className={`h-3.5 w-3.5 ${m.tone === "warn" ? "text-[var(--warn)]" : m.tone === "green" ? "text-glow-green" : "text-glow-cyan"}`} />
                </div>
                <div className={`mt-2 font-display text-xl font-bold ${m.tone === "warn" ? "text-[var(--warn)]" : m.tone === "green" ? "text-glow-green" : "text-glow-cyan"}`}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          <div className="glass p-3 space-y-2">
            {sats.map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-border">
                <div className="h-9 w-9 rounded-lg bg-primary/15 grid place-items-center text-glow-cyan">
                  <Orbit className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{s.id}</div>
                  <div className="text-[11px] text-muted-foreground">{s.orbit} · alt {s.alt}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-glow-green">{s.health}%</div>
                  <div className="w-16 h-1 rounded-full bg-white/10 mt-1 overflow-hidden">
                    <div className="h-full" style={{ width: `${s.health}%`, background: "var(--green-glow)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
