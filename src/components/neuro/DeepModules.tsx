import {
  Sun,
  BatteryCharging,
  Fuel,
  Leaf,
  Bot,
  Wifi,
  Wrench,
  Wind,
  Activity,
  CloudRain,
} from "lucide-react";

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

const cyan = "oklch(0.85 0.16 200)";
const green = "oklch(0.86 0.22 155)";

export function DeepModules() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10 grid lg:grid-cols-3 gap-5">
      {/* ENERGY */}
      <div className="glass p-6">
        <div className="flex items-center gap-2 mb-1">
          <Sun className="h-4 w-4 text-glow-cyan" />
          <span className="font-mono text-xs uppercase tracking-widest text-glow-cyan">
            Energy module
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold">Smart power grid</h3>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { i: Sun, l: "Solar", v: "8.4 GW", t: "cyan" },
            { i: BatteryCharging, l: "Storage", v: "92%", t: "green" },
            { i: Fuel, l: "Silent gen.", v: "36 / 40", t: "cyan" },
            { i: Leaf, l: "CO₂ saved", v: "284 Mt", t: "green" },
          ].map((m) => (
            <div key={l(m)} className="rounded-xl p-3 bg-white/5 border border-border">
              <m.i
                className={`h-4 w-4 ${
                  m.t === "cyan" ? "text-glow-cyan" : "text-glow-green"
                }`}
              />
              <div className="text-lg font-display font-semibold mt-2">
                {m.v}
              </div>
              <div className="text-[11px] text-muted-foreground">{m.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-3">
          <Bar label="Grid renewable share" value={62} color={green} />
          <Bar label="Optimization score" value={88} color={cyan} />
        </div>
        <div className="mt-5 p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs">
          <span className="text-glow-cyan font-mono">AI:</span>{" "}
          Shift 240 MW to APAC battery clusters tonight to save 4.2 Mt CO₂.
        </div>
      </div>

      {/* ROBOTICS */}
      <div className="glass p-6">
        <div className="flex items-center gap-2 mb-1">
          <Bot className="h-4 w-4 text-glow-green" />
          <span className="font-mono text-xs uppercase tracking-widest text-glow-green">
            Robotics module
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold">Active fleet</h3>
        <div className="mt-5 space-y-3">
          {[
            { name: "NX-204 · Recycler", batt: 86, status: "Sorting · Berlin" },
            { name: "NX-118 · Patrol", batt: 64, status: "Patrolling · Tokyo" },
            { name: "NX-301 · Agri", batt: 42, status: "Irrigating · Iowa" },
            { name: "NX-077 · Maint.", batt: 18, status: "Charging · Dubai", warn: true },
          ].map((r) => (
            <div
              key={r.name}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border"
            >
              <div className="h-9 w-9 rounded-lg bg-secondary/15 text-glow-green grid place-items-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{r.name}</div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {r.status}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-xs font-mono ${
                    r.warn ? "text-[var(--warn)]" : "text-glow-green"
                  }`}
                >
                  {r.batt}%
                </div>
                <div className="w-14 h-1 rounded-full bg-white/10 mt-1 overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: `${r.batt}%`,
                      background: r.warn ? "var(--warn)" : green,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { i: Wifi, l: "Comms" },
            { i: Activity, l: "Telemetry" },
            { i: Wrench, l: "12 maint." },
          ].map((s) => (
            <div key={s.l} className="rounded-lg bg-white/5 p-2 border border-border">
              <s.i className="h-3.5 w-3.5 mx-auto text-glow-cyan" />
              <div className="text-[10px] mt-1 text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ENVIRONMENT */}
      <div className="glass p-6">
        <div className="flex items-center gap-2 mb-1">
          <Wind className="h-4 w-4 text-glow-cyan" />
          <span className="font-mono text-xs uppercase tracking-widest text-glow-cyan">
            Environment module
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold">Climate health</h3>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { l: "AQI", v: "38", s: "Good", t: "green" },
            { l: "PM2.5", v: "9", s: "µg/m³", t: "cyan" },
            { l: "O₃", v: "42", s: "ppb", t: "cyan" },
          ].map((s) => (
            <div key={l(s)} className="rounded-xl p-3 bg-white/5 border border-border">
              <div className="text-[10px] text-muted-foreground uppercase">
                {s.l}
              </div>
              <div
                className={`text-2xl font-display font-bold ${
                  s.t === "cyan" ? "text-glow-cyan" : "text-glow-green"
                }`}
              >
                {s.v}
              </div>
              <div className="text-[10px] text-muted-foreground">{s.s}</div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <div className="text-xs text-muted-foreground mb-2">Pollution heatmap · 24h</div>
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 48 }).map((_, i) => {
              const v = Math.random();
              const c =
                v > 0.75
                  ? "var(--warn)"
                  : v > 0.45
                  ? "var(--cyan-glow)"
                  : "var(--green-glow)";
              return (
                <div
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{ background: c, opacity: 0.25 + v * 0.6 }}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-5 p-3 rounded-xl bg-secondary/10 border border-secondary/20 text-xs flex items-start gap-2">
          <CloudRain className="h-4 w-4 text-glow-green shrink-0 mt-0.5" />
          <span>
            <span className="text-glow-green font-mono">Forecast:</span>{" "}
            Rainfall expected to clear Bay Area haze within 6 hours.
          </span>
        </div>
      </div>
    </section>
  );
}

function l(m: { l: string }) {
  return m.l;
}
