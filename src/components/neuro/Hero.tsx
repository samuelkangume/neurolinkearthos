import earthImg from "@/assets/earth-hero.jpg";
import { Activity, Cpu, Leaf, Wind, Network } from "lucide-react";

const stats = [
  { label: "Earth Status", value: "Stable", sub: "Global index 92.4", icon: Leaf, tone: "green" },
  { label: "AI System Status", value: "Online", sub: "12,840 models live", icon: Cpu, tone: "cyan" },
  { label: "Home Energy Efficiency", value: "94%", sub: "+3.2% this week", icon: Activity, tone: "green" },
  { label: "Air Quality", value: "AQI 38", sub: "Excellent", icon: Wind, tone: "cyan" },
  { label: "Connected Systems", value: "1.2M", sub: "204 countries", icon: Network, tone: "green" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-[1500px] px-4 lg:px-8 pt-10 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono text-glow-cyan mb-6">
            <span className="status-dot" /> NEURO CORE v4.2 · ONLINE
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            The operating system <br />
            for a <span className="text-glow-cyan">smarter Earth</span>.
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl text-base md:text-lg">
            Unified intelligence across energy, environment, robotics, telecom and
            public safety — orchestrated in real time by NEURO AI.
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="glass p-4 glass-hover">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </span>
                  <s.icon
                    className={`h-4 w-4 ${
                      s.tone === "cyan" ? "text-glow-cyan" : "text-glow-green"
                    }`}
                  />
                </div>
                <div className="mt-2 font-display text-2xl font-semibold">
                  {s.value}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square max-w-[560px] mx-auto w-full">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-glow" />
          <div className="absolute inset-6 rounded-full border border-primary/20 animate-spin-slow" />
          <div
            className="absolute inset-12 rounded-full border border-secondary/20 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "60s" }}
          />
          <img
            src={earthImg}
            alt="Holographic Earth visualization"
            width={1280}
            height={1280}
            className="relative z-10 w-full h-full object-contain animate-float"
          />
          <div className="absolute top-8 right-4 glass px-3 py-2 text-[11px] font-mono z-20">
            <div className="text-muted-foreground">SAT-LINK</div>
            <div className="text-glow-cyan">●  4,218 active</div>
          </div>
          <div className="absolute bottom-10 left-2 glass px-3 py-2 text-[11px] font-mono z-20">
            <div className="text-muted-foreground">CO₂ SAVED</div>
            <div className="text-glow-green">▼ 18.4 Mt today</div>
          </div>
        </div>
      </div>
    </section>
  );
}
