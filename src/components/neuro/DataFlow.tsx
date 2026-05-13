import { Cpu, Cloud, Sparkles, BarChart3, Users, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: Cpu,
    title: "Sensors / Robots",
    sub: "1.2M edge devices · 248 robots",
    tone: "cyan",
  },
  {
    icon: Cloud,
    title: "Cloud System",
    sub: "Real-time ingest · 4.8 PB/day",
    tone: "green",
  },
  {
    icon: Sparkles,
    title: "NEUROLINK AI",
    sub: "12,840 models · predictive core",
    tone: "cyan",
  },
  {
    icon: BarChart3,
    title: "Dashboard Analytics",
    sub: "Insights, alerts, forecasts",
    tone: "green",
  },
  {
    icon: Users,
    title: "User Decisions",
    sub: "People · governments · orgs",
    tone: "cyan",
  },
];

export function DataFlow() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono text-glow-cyan mb-4">
          DATA FLOW · NEURO PIPELINE
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold">
          From the planet&apos;s edge to your decision in real time
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Every signal flows through a single intelligent pipeline.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent -translate-x-1/2" />
        {steps.map((s, i) => (
          <div key={s.title} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-3">
            <div className={i % 2 === 0 ? "text-right pr-2" : "order-3 pl-2"}>
              <div className="font-display font-semibold">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.sub}</div>
            </div>
            <div
              className={`relative z-10 h-14 w-14 rounded-2xl grid place-items-center neon-border ${
                s.tone === "cyan"
                  ? "bg-primary/15 text-glow-cyan"
                  : "bg-secondary/15 text-glow-green"
              }`}
            >
              <s.icon className="h-6 w-6" />
              <span className="absolute inset-0 rounded-2xl animate-glow pointer-events-none" />
            </div>
            <div className={i % 2 === 0 ? "order-3" : ""} />
            {i < steps.length - 1 && (
              <div className="col-span-3 flex justify-center py-1">
                <ArrowDown className="h-4 w-4 text-primary/60 animate-pulse" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
