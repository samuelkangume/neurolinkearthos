import { Globe2, Wind, Zap, ShieldAlert } from "lucide-react";

const vitals = [
  { label: "Earth Stability", value: "82%", icon: Globe2, tone: "cyan", bar: 82 },
  { label: "Air Quality", value: "Good", icon: Wind, tone: "green", bar: 88 },
  { label: "Energy Efficiency", value: "High", icon: Zap, tone: "green", bar: 94 },
  { label: "Environmental Risk", value: "Low", icon: ShieldAlert, tone: "cyan", bar: 18 },
];

export function PlanetVitals() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 -mt-4 pb-2">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {vitals.map((v) => (
          <div key={v.label} className="glass p-5 glass-hover relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                {v.label}
              </span>
              <v.icon
                className={`h-4 w-4 ${
                  v.tone === "cyan" ? "text-glow-cyan" : "text-glow-green"
                }`}
              />
            </div>
            <div
              className={`mt-3 font-display text-3xl font-bold ${
                v.tone === "cyan" ? "text-glow-cyan" : "text-glow-green"
              }`}
            >
              {v.value}
            </div>
            <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${v.bar}%`,
                  background:
                    v.tone === "cyan" ? "var(--cyan-glow)" : "var(--green-glow)",
                  boxShadow: `0 0 10px ${
                    v.tone === "cyan" ? "var(--cyan-glow)" : "var(--green-glow)"
                  }`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
