import { Leaf, Zap, Building2, TreePine, ShieldCheck } from "lucide-react";

const impacts = [
  {
    icon: Leaf,
    title: "Carbon reduction",
    value: "284 Mt",
    sub: "CO₂ offset this year",
    tone: "green",
  },
  {
    icon: Zap,
    title: "Energy saved",
    value: "1.42 PWh",
    sub: "= 92M homes powered",
    tone: "cyan",
  },
  {
    icon: Building2,
    title: "Cleaner cities",
    value: "612",
    sub: "metropolitan areas in green band",
    tone: "green",
  },
  {
    icon: TreePine,
    title: "Environmental protection",
    value: "18.4M ha",
    sub: "ecosystems under AI watch",
    tone: "cyan",
  },
  {
    icon: ShieldCheck,
    title: "Disaster prevention",
    value: "1,284",
    sub: "early-warning interventions YTD",
    tone: "green",
  },
];

export function ImpactModule() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono text-glow-green mb-3">
          REAL-WORLD IMPACT
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold">
          A measurable difference for the planet
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Every system in NEUROLINK exists to make life on Earth better — here&apos;s the proof.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {impacts.map((i) => (
          <div key={i.title} className="glass p-6 glass-hover">
            <i.icon
              className={`h-5 w-5 ${
                i.tone === "cyan" ? "text-glow-cyan" : "text-glow-green"
              }`}
            />
            <div
              className={`mt-4 font-display text-3xl font-bold ${
                i.tone === "cyan" ? "text-glow-cyan" : "text-glow-green"
              }`}
            >
              {i.value}
            </div>
            <div className="text-sm font-medium mt-1">{i.title}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{i.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
