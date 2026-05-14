import { useEffect, useState } from "react";
import {
  Sun, Wind, Waves, Fuel, Atom, Battery, Car, Cpu, Factory, Home, Plug, Gauge,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

type Source = {
  key: string;
  label: string;
  icon: any;
  output: number; // GW
  share: number; // %
  trend: number; // %
  tone: "cyan" | "green" | "warn";
};

const SOURCES: Source[] = [
  { key: "solar", label: "Solar farms", icon: Sun, output: 4.82, share: 28, trend: 4.1, tone: "green" },
  { key: "wind", label: "Wind turbines", icon: Wind, output: 3.61, share: 22, trend: 2.8, tone: "cyan" },
  { key: "hydro", label: "Hydro plants", icon: Waves, output: 2.94, share: 18, trend: 0.4, tone: "cyan" },
  { key: "nuclear", label: "Nuclear cores", icon: Atom, output: 2.18, share: 14, trend: 0.1, tone: "green" },
  { key: "gen", label: "Silent generators", icon: Fuel, output: 1.04, share: 10, trend: -1.2, tone: "warn" },
  { key: "storage", label: "Grid batteries", icon: Battery, output: 0.92, share: 8, trend: 6.5, tone: "green" },
];

type Consumer = { label: string; icon: any; usage: string; meta: string; bar: number };
const CONSUMERS: Consumer[] = [
  { label: "Smart homes", icon: Home, usage: "412 GWh", meta: "84M residences · -12% w/w", bar: 62 },
  { label: "EV & vehicles", icon: Car, usage: "284 GWh", meta: "1.2M vehicles charging", bar: 48 },
  { label: "Industrial machines", icon: Factory, usage: "1.8 TWh", meta: "12,402 plants · ESG synced", bar: 78 },
  { label: "Data & AI compute", icon: Cpu, usage: "642 GWh", meta: "NEURO mesh · liquid-cooled", bar: 71 },
  { label: "Personal devices", icon: Plug, usage: "98 GWh", meta: "3.4B endpoints linked", bar: 34 },
  { label: "Public infrastructure", icon: Gauge, usage: "521 GWh", meta: "Lighting, transit, grid", bar: 56 },
];

export function EnergyHub() {
  const [load, setLoad] = useState(62);
  const [renewable, setRenewable] = useState(78);

  useEffect(() => {
    const t = setInterval(() => {
      setLoad((v) => Math.max(48, Math.min(82, v + (Math.random() - 0.5) * 4)));
      setRenewable((v) => Math.max(72, Math.min(86, v + (Math.random() - 0.5) * 1.2)));
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <SectionHeader
        eyebrow="04 · Energy"
        title="Planetary Energy Management"
        desc="Every watt — from solar farms to your phone — orchestrated by NEURO AI. Wind, hydro, nuclear, generators, batteries, devices, machines and vehicles in one live ledger."
        right={
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-glow-green">
              {renewable.toFixed(1)}% RENEWABLE
            </div>
            <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-glow-cyan">
              GRID LOAD {load.toFixed(0)}%
            </div>
          </div>
        }
      />

      {/* Sources */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SOURCES.map((s) => (
          <div key={s.key} className="glass glass-hover p-5">
            <div className="flex items-center justify-between">
              <div
                className={`h-10 w-10 rounded-xl grid place-items-center ${
                  s.tone === "green"
                    ? "bg-secondary/15 text-glow-green"
                    : s.tone === "warn"
                    ? "bg-[oklch(0.82_0.18_80/0.15)] text-[var(--warn)]"
                    : "bg-primary/15 text-glow-cyan"
                }`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <span
                className={`text-[10px] font-mono ${
                  s.trend >= 0 ? "text-glow-green" : "text-[var(--warn)]"
                }`}
              >
                {s.trend >= 0 ? "▲" : "▼"} {Math.abs(s.trend).toFixed(1)}%
              </span>
            </div>
            <div className="mt-4 font-display text-2xl font-bold">
              {s.output.toFixed(2)} <span className="text-sm text-muted-foreground font-sans">TWh/h</span>
            </div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${s.share * 3}%`,
                  background:
                    s.tone === "green"
                      ? "var(--green-glow)"
                      : s.tone === "warn"
                      ? "var(--warn)"
                      : "var(--cyan-glow)",
                  boxShadow: `0 0 10px ${
                    s.tone === "green" ? "var(--green-glow)" : "var(--cyan-glow)"
                  }`,
                }}
              />
            </div>
            <div className="mt-1.5 text-[10px] font-mono text-muted-foreground">
              {s.share}% global mix
            </div>
          </div>
        ))}
      </div>

      {/* Consumers */}
      <div className="mt-6 glass p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-glow-green">
              Energy consumers · live
            </div>
            <div className="font-display text-lg font-semibold mt-1">
              Devices · Machines · Vehicles · Infrastructure
            </div>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground hidden md:block">
            AI auto-balancing · 12.4 TWh routed today
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONSUMERS.map((c) => (
            <div key={c.label} className="rounded-xl p-4 bg-white/[0.03] border border-border">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/15 text-glow-cyan grid place-items-center">
                  <c.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="font-display text-base font-semibold">{c.usage}</div>
                </div>
              </div>
              <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${c.bar}%`,
                    background: "var(--gradient-glow)",
                  }}
                />
              </div>
              <div className="mt-1.5 text-[10px] font-mono text-muted-foreground">
                {c.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
