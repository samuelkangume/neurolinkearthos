import { useEffect, useState } from "react";
import { AlertTriangle, Droplets, Wind, Zap, Radiation, X } from "lucide-react";

type Alert = {
  id: string;
  icon: typeof Droplets;
  title: string;
  region: string;
  severity: "low" | "med" | "high";
  detail: string;
};

const ALERTS: Alert[] = [
  {
    id: "flood",
    icon: Droplets,
    title: "Flood risk rising",
    region: "South Asia · Bangladesh delta",
    severity: "high",
    detail: "Monsoon surge +38% · 2.1M residents alerted via NEURO mesh.",
  },
  {
    id: "pollution",
    icon: Wind,
    title: "Pollution spike",
    region: "EU-12 · Milan industrial belt",
    severity: "med",
    detail: "PM2.5 hit 142 µg/m³ · auto-throttling 14 factories.",
  },
  {
    id: "power",
    icon: Zap,
    title: "Power overload",
    region: "APAC-04 · Tokyo grid sector 7",
    severity: "med",
    detail: "Load 96% · routing 240 MW from battery clusters.",
  },
  {
    id: "radiation",
    icon: Radiation,
    title: "Radiation anomaly",
    region: "NA-02 · Nevada test perimeter",
    severity: "low",
    detail: "Background +0.4 µSv/h · within safe band, monitoring.",
  },
];

const severityClass = {
  low: "bg-secondary/10 border-secondary/30 text-glow-green",
  med: "bg-[oklch(0.82_0.18_80/0.12)] border-[oklch(0.82_0.18_80/0.4)] text-[var(--warn)]",
  high: "bg-destructive/15 border-destructive/40 text-destructive",
};

export function EmergencyAlerts() {
  const [active, setActive] = useState<Alert[]>(ALERTS);
  const [toast, setToast] = useState<Alert | null>(null);

  // Simulated incoming pollution alert
  useEffect(() => {
    const t = setTimeout(() => setToast(ALERTS[1]), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono text-destructive mb-3">
            <AlertTriangle className="h-3 w-3" /> EMERGENCY AI ALERTS · LIVE
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Planetary risk monitor
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            NEURO AI watches every region 24/7 and notifies the right people first.
          </p>
        </div>
        <span className="text-xs font-mono text-glow-green flex items-center gap-2">
          <span className="status-dot" /> {active.length} live signals
        </span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {active.map((a) => (
          <div
            key={a.id}
            className={`relative p-5 rounded-2xl border ${severityClass[a.severity]} backdrop-blur-xl overflow-hidden`}
          >
            <div className="flex items-center justify-between">
              <a.icon className="h-5 w-5" />
              <span className="text-[10px] font-mono uppercase tracking-widest">
                {a.severity}
              </span>
            </div>
            <div className="mt-4 font-display font-semibold">{a.title}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              {a.region}
            </div>
            <p className="text-xs mt-3 text-foreground/80">{a.detail}</p>
            <button
              onClick={() => setActive((p) => p.filter((x) => x.id !== a.id))}
              className="mt-4 text-[11px] font-mono opacity-80 hover:opacity-100"
            >
              ACKNOWLEDGE →
            </button>
          </div>
        ))}
        {active.length === 0 && (
          <div className="md:col-span-2 lg:col-span-4 glass p-8 text-center text-sm text-muted-foreground">
            All planetary systems nominal. NEURO AI is watching.
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-6 z-50 glass p-4 w-[min(360px,calc(100vw-2rem))] border-[oklch(0.82_0.18_80/0.4)]">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-[oklch(0.82_0.18_80/0.15)] grid place-items-center text-[var(--warn)]">
              <toast.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--warn)]">
                Incoming alert
              </div>
              <div className="font-display font-semibold text-sm mt-0.5">
                {toast.title}
              </div>
              <div className="text-[11px] text-muted-foreground">{toast.region}</div>
            </div>
            <button onClick={() => setToast(null)} className="opacity-60 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
