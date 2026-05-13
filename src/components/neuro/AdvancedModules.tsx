import { useState } from "react";
import {
  ShieldAlert,
  Satellite,
  Sprout,
  ScrollText,
  CloudLightning,
  Bot,
  ChevronDown,
} from "lucide-react";

const items = [
  {
    icon: ShieldAlert,
    title: "Nuclear Safety Monitoring",
    desc: "Realtime reactor telemetry, isotope tracking and containment integrity across 412 facilities.",
    metrics: ["412 reactors", "0 incidents", "99.999% uptime"],
  },
  {
    icon: Satellite,
    title: "Telecom & Satellite Systems",
    desc: "Global low-orbit constellation health, bandwidth allocation and emergency relay routing.",
    metrics: ["8,420 sats", "12.4 Tbps", "98 ground stations"],
  },
  {
    icon: Sprout,
    title: "Smart Agriculture",
    desc: "Soil intelligence, autonomous irrigation, yield forecasting powered by NEURO Crop AI.",
    metrics: ["1.8M ha", "+22% yield", "−34% water"],
  },
  {
    icon: ScrollText,
    title: "Environmental Compliance",
    desc: "Continuous regulatory tracking, emissions reporting and automated audit trails.",
    metrics: ["EU/US/APAC", "12,400 reports", "ISO 14001"],
  },
  {
    icon: CloudLightning,
    title: "Disaster Prediction",
    desc: "Multi-model forecasting for storms, wildfires, seismic and flood events with 72h lead time.",
    metrics: ["72h lead", "94% accuracy", "204 regions"],
  },
  {
    icon: Bot,
    title: "Robotics Control Center",
    desc: "Fleet orchestration, mission planning and live tele-operation across all robot classes.",
    metrics: ["248 units", "12 classes", "live ops"],
  },
];

export function AdvancedModules() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="mb-6">
        <h2 className="font-display text-2xl md:text-3xl font-semibold">
          Advanced infrastructure
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Expandable modules for governments and global organizations.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <button
              key={it.title}
              onClick={() => setOpen(isOpen ? null : i)}
              className="glass glass-hover p-5 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-primary/15 text-glow-cyan grid place-items-center shrink-0">
                  <it.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold">
                      {it.title}
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{it.desc}</p>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-wrap gap-2">
                        {it.metrics.map((m) => (
                          <span
                            key={m}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-secondary/10 text-glow-green border border-secondary/20"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
