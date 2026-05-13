import { Bot, Home, Radio, Zap, Satellite } from "lucide-react";

const systems = [
  { icon: Bot, label: "Robots", value: 248, total: 260, tone: "cyan" },
  { icon: Home, label: "Smart Home", value: 84, total: 84, tone: "green" },
  { icon: Radio, label: "Env. Sensors", value: 1284, total: 1300, tone: "cyan" },
  { icon: Zap, label: "Silent Generators", value: 36, total: 40, tone: "green" },
  { icon: Satellite, label: "Telecom", value: 12, total: 12, tone: "cyan" },
];

export function ConnectedSystems() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">
        Connected systems
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {systems.map((s) => {
          const pct = Math.round((s.value / s.total) * 100);
          return (
            <div key={s.label} className="glass glass-hover p-5">
              <div className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-lg grid place-items-center ${
                    s.tone === "cyan"
                      ? "bg-primary/15 text-glow-cyan"
                      : "bg-secondary/15 text-glow-green"
                  }`}
                >
                  <s.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="font-display text-lg font-semibold">
                    {s.value}
                    <span className="text-muted-foreground text-xs">
                      {" "}
                      / {s.total}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background:
                      s.tone === "cyan"
                        ? "var(--gradient-glow)"
                        : "var(--green-glow)",
                    boxShadow:
                      s.tone === "cyan"
                        ? "0 0 10px var(--cyan-glow)"
                        : "0 0 10px var(--green-glow)",
                  }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>{pct}% online</span>
                <span className="text-glow-green flex items-center gap-1">
                  <span className="status-dot" /> live
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
