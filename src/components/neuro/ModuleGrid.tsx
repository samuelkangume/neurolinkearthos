import {
  Battery,
  Home,
  Recycle,
  Bot,
  TreePine,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

const modules = [
  {
    title: "Energy",
    icon: Battery,
    status: "Optimal",
    stat: "12.4 TWh",
    sub: "Solar + storage live",
    tone: "green",
  },
  {
    title: "Smart Home",
    icon: Home,
    status: "Connected",
    stat: "84 devices",
    sub: "All zones active",
    tone: "cyan",
  },
  {
    title: "Waste Management",
    icon: Recycle,
    status: "Sorting",
    stat: "92% recycled",
    sub: "AI sort lines on",
    tone: "green",
  },
  {
    title: "Robotics",
    icon: Bot,
    status: "Operational",
    stat: "248 units",
    sub: "12 maintenance",
    tone: "cyan",
  },
  {
    title: "Environment",
    icon: TreePine,
    status: "Monitoring",
    stat: "AQI 38",
    sub: "All sensors green",
    tone: "green",
  },
  {
    title: "Alerts",
    icon: AlertTriangle,
    status: "3 active",
    stat: "Low priority",
    sub: "View timeline",
    tone: "warn",
  },
];

export function ModuleGrid() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Quick access modules
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Jump into any control surface across the planetary stack.
          </p>
        </div>
        <button className="hidden md:inline-flex text-xs font-mono text-glow-cyan">
          CUSTOMIZE LAYOUT →
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((m) => (
          <div
            key={m.title}
            className="glass glass-hover p-6 relative overflow-hidden group"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
            <div className="flex items-center justify-between relative">
              <div
                className={`h-11 w-11 rounded-xl grid place-items-center ${
                  m.tone === "warn"
                    ? "bg-[oklch(0.82_0.18_80/0.15)] text-[var(--warn)]"
                    : m.tone === "cyan"
                    ? "bg-primary/15 text-glow-cyan"
                    : "bg-secondary/15 text-glow-green"
                }`}
              >
                <m.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <span className="status-dot" />
                {m.status}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{m.title}</h3>
            <div className="mt-1 text-2xl font-display font-bold text-foreground">
              {m.stat}
            </div>
            <div className="text-xs text-muted-foreground">{m.sub}</div>
            <button className="mt-5 w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-border text-xs font-medium">
              Open module
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
