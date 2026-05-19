import { useEffect, useRef, useState } from "react";
import { Bell, BellOff, AlertTriangle, Volume2 } from "lucide-react";
import { toast } from "sonner";

type Threat = { id: number; kind: string; place: string; level: "warn" | "crit" };

const KINDS = [
  { kind: "Pollution spike", place: "Delhi · PM2.5 184 µg/m³" },
  { kind: "Radiation anomaly", place: "Sector R-12" },
  { kind: "Poor air quality", place: "Jakarta · AQI 212" },
  { kind: "Flood risk", place: "Mekong Delta" },
  { kind: "Suspicious activity", place: "Grid node #4218" },
  { kind: "Wildfire ignition", place: "Algarve · PT" },
];

export function AlarmSystem() {
  const [enabled, setEnabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Threat | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  const beep = () => {
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = ctxRef.current;
      const now = ctx.currentTime;
      [0, 0.25, 0.5].forEach((t) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(880, now + t);
        osc.frequency.linearRampToValueAtTime(440, now + t + 0.18);
        gain.gain.setValueAtTime(0.15, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.2);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.2);
      });
    } catch {}
  };

  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(() => {
      if (Math.random() > 0.65) {
        const k = KINDS[Math.floor(Math.random() * KINDS.length)];
        const threat: Threat = { id: Date.now(), kind: k.kind, place: k.place, level: Math.random() > 0.5 ? "crit" : "warn" };
        setActive(threat);
        beep();
        toast.error(`${threat.kind} · ${threat.place}`, { duration: 4000 });
        setTimeout(() => setActive((cur) => (cur?.id === threat.id ? null : cur)), 6000);
      }
    }, 18000);
    return () => clearInterval(t);
  }, [enabled]);

  return (
    <>
      {/* Floating control */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-2">
        {active && (
          <div className="alarm-pulse glass border border-destructive/50 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 max-w-[260px]">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
            <div className="min-w-0">
              <div className="font-medium text-destructive truncate">{active.kind}</div>
              <div className="text-[10px] font-mono text-muted-foreground truncate">{active.place}</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`h-11 w-11 rounded-full grid place-items-center border glass shadow-lg ${
            enabled ? "border-secondary/40 text-glow-green" : "border-border text-muted-foreground"
          }`}
          aria-label="Alarm settings"
        >
          {enabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        </button>
        {open && (
          <div className="glass p-4 w-[260px] rounded-2xl border border-border">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Emergency alarm
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">
              Audible ring + visual flash on pollution, radiation, poor air, flood, wildfire or suspicious activity. Always optional.
            </p>
            <button
              onClick={() => setEnabled((v) => !v)}
              className={`w-full h-9 rounded-lg text-xs font-medium border ${
                enabled
                  ? "bg-secondary/15 border-secondary/40 text-glow-green"
                  : "bg-white/[0.04] border-border text-muted-foreground"
              }`}
            >
              {enabled ? "Alarm ON" : "Alarm OFF"}
            </button>
            <button
              onClick={beep}
              className="mt-2 w-full h-9 rounded-lg text-xs flex items-center justify-center gap-2 bg-white/[0.04] border border-border hover:bg-white/[0.08]"
            >
              <Volume2 className="h-3.5 w-3.5" /> Test ring
            </button>
          </div>
        )}
      </div>
      <style>{`
        .alarm-pulse { animation: alarmPulse 1s ease-in-out infinite; }
        @keyframes alarmPulse {
          0%, 100% { box-shadow: 0 0 0 0 oklch(0.7 0.22 25 / 0.5); }
          50% { box-shadow: 0 0 24px 6px oklch(0.7 0.22 25 / 0.5); }
        }
      `}</style>
    </>
  );
}
