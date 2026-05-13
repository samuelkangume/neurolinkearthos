import { Recycle, Trash2, Bot, Wind } from "lucide-react";

const bins = [
  { id: "BIN-A12", loc: "Berlin · Mitte", fill: 84, status: "Pickup soon" },
  { id: "BIN-C04", loc: "Tokyo · Shibuya", fill: 32, status: "Healthy" },
  { id: "BIN-E18", loc: "Lagos · Ikeja", fill: 96, status: "Dispatching robot", warn: true },
  { id: "BIN-N07", loc: "NYC · Brooklyn", fill: 58, status: "Healthy" },
];

export function WasteModule() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono text-glow-green mb-3">
            <Recycle className="h-3 w-3" /> WASTE MANAGEMENT MODULE
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Smart circular cities
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        {/* Recycling analytics */}
        <div className="glass p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Recycle className="h-4 w-4 text-glow-green" /> Recycling rate
          </div>
          <div className="mt-3 text-4xl font-display font-bold text-glow-green">92%</div>
          <div className="text-xs text-muted-foreground">+4.8% this week</div>
          <div className="mt-5 space-y-2.5">
            {[
              { l: "Plastic", v: 88 },
              { l: "Paper", v: 96 },
              { l: "Organic", v: 91 },
              { l: "Metal", v: 99 },
            ].map((s) => (
              <div key={s.l}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-muted-foreground">{s.l}</span>
                  <span className="font-mono">{s.v}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.v}%`,
                      background: "var(--green-glow)",
                      boxShadow: "0 0 8px var(--green-glow)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart bins */}
        <div className="glass p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trash2 className="h-4 w-4 text-glow-cyan" /> Smart bins · live
            </div>
            <span className="text-[11px] font-mono text-glow-green flex items-center gap-1.5">
              <span className="status-dot" /> 18,420 online
            </span>
          </div>
          <div className="space-y-3">
            {bins.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/15 text-glow-cyan grid place-items-center">
                  <Trash2 className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{b.id}</div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {b.loc} · {b.status}
                  </div>
                </div>
                <div className="w-24">
                  <div className="text-right text-[11px] font-mono mb-1">
                    {b.fill}%
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${b.fill}%`,
                        background: b.warn ? "var(--warn)" : "var(--cyan-glow)",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Robot sorting + pollution */}
        <div className="glass p-6 flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bot className="h-4 w-4 text-glow-cyan" /> Robot sorting
            </div>
            <div className="mt-3 text-3xl font-display font-bold">24/s</div>
            <div className="text-xs text-muted-foreground">items sorted across 412 lines</div>
            <div className="mt-3 flex items-end gap-1 h-12">
              {[40, 55, 48, 62, 70, 65, 78, 82, 75, 88, 92, 95].map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${v}%`,
                    background: "var(--cyan-glow)",
                    boxShadow: "0 0 6px var(--cyan-glow)",
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wind className="h-4 w-4 text-glow-green" /> Pollution tracking
            </div>
            <div className="mt-2 text-2xl font-display font-bold text-glow-green">
              -38% YoY
            </div>
            <div className="text-xs text-muted-foreground">
              Microplastic load in city waterways
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
