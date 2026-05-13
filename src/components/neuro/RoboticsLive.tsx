import { useEffect, useState } from "react";
import { Bot, Power, Wifi, MapPin } from "lucide-react";

type Robot = {
  id: string;
  task: string;
  city: string;
  battery: number;
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const initial: Robot[] = [
  { id: "NX-204", task: "Recycler", city: "Berlin", battery: 86, active: true, x: 20, y: 30, vx: 0.6, vy: 0.4 },
  { id: "NX-118", task: "Patrol", city: "Tokyo", battery: 64, active: true, x: 75, y: 55, vx: -0.5, vy: 0.5 },
  { id: "NX-301", task: "Agri-bot", city: "Iowa", battery: 42, active: true, x: 45, y: 70, vx: 0.4, vy: -0.3 },
  { id: "NX-077", task: "Maint.", city: "Dubai", battery: 18, active: false, x: 60, y: 25, vx: 0, vy: 0 },
];

export function RoboticsLive() {
  const [robots, setRobots] = useState<Robot[]>(initial);
  const [aiMsg, setAiMsg] = useState("All units linked. Routing NX-077 to nearest dock.");

  useEffect(() => {
    const id = setInterval(() => {
      setRobots((prev) =>
        prev.map((r) => {
          if (!r.active) return r;
          let { x, y, vx, vy } = r;
          x += vx;
          y += vy;
          if (x < 5 || x > 95) vx = -vx;
          if (y < 8 || y > 92) vy = -vy;
          x = Math.max(5, Math.min(95, x));
          y = Math.max(8, Math.min(92, y));
          const battery = Math.max(0, r.battery - 0.05);
          return { ...r, x, y, vx, vy, battery };
        }),
      );
    }, 120);
    return () => clearInterval(id);
  }, []);

  const toggle = (id: string) => {
    setRobots((p) =>
      p.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    );
    const r = robots.find((x) => x.id === id);
    if (r) setAiMsg(`${r.id} ${r.active ? "deactivated — entering standby." : "activated — task resuming."}`);
  };

  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono text-glow-cyan mb-3">
            <Bot className="h-3 w-3" /> ROBOTICS · LIVE MOVEMENT
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Autonomous fleet, in motion
          </h2>
        </div>
        <span className="text-xs font-mono text-glow-green flex items-center gap-2">
          <span className="status-dot" /> 248 units online
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5">
        {/* Live map */}
        <div className="glass p-4 relative aspect-[16/10] overflow-hidden grid-bg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
          {robots.map((r) => (
            <div
              key={r.id}
              className="absolute transition-all duration-100 ease-linear"
              style={{ left: `${r.x}%`, top: `${r.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className="relative">
                <div
                  className={`h-9 w-9 rounded-xl grid place-items-center border ${
                    r.active
                      ? "bg-primary/20 border-primary/40 text-glow-cyan"
                      : "bg-white/5 border-border text-muted-foreground"
                  }`}
                >
                  <Bot className="h-4 w-4" />
                </div>
                {r.active && (
                  <span className="absolute inset-0 rounded-xl border border-primary/40 animate-ping" />
                )}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] font-mono whitespace-nowrap text-foreground/80">
                  {r.id}
                </div>
              </div>
            </div>
          ))}
          <div className="absolute top-3 left-3 text-[10px] font-mono text-muted-foreground">
            <MapPin className="h-3 w-3 inline mr-1" /> GLOBAL MESH · realtime
          </div>
        </div>

        {/* Roster + AI comms */}
        <div className="space-y-4">
          <div className="glass p-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-glow-cyan mb-3">
              <Wifi className="h-3 w-3" /> AI Communication
            </div>
            <p className="text-sm leading-relaxed">{aiMsg}</p>
          </div>

          <div className="glass p-3 space-y-2">
            {robots.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-border"
              >
                <div
                  className={`h-9 w-9 rounded-lg grid place-items-center ${
                    r.active ? "bg-secondary/15 text-glow-green" : "bg-white/5 text-muted-foreground"
                  }`}
                >
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">
                    {r.id} · <span className="text-muted-foreground font-normal">{r.task}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {r.city} · {r.active ? "active" : "standby"}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xs font-mono ${
                      r.battery < 25 ? "text-[var(--warn)]" : "text-glow-green"
                    }`}
                  >
                    {r.battery.toFixed(0)}%
                  </div>
                  <div className="w-14 h-1 rounded-full bg-white/10 mt-1 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${r.battery}%`,
                        background: r.battery < 25 ? "var(--warn)" : "var(--green-glow)",
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => toggle(r.id)}
                  className={`h-9 w-9 rounded-lg grid place-items-center border transition-colors ${
                    r.active
                      ? "bg-primary/20 border-primary/40 text-glow-cyan"
                      : "bg-white/5 border-border text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Toggle robot"
                >
                  <Power className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
