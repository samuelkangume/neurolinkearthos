import { useEffect, useState } from "react";
import { Glasses, Plane, Radio, Activity, Battery, Link2 } from "lucide-react";

type Drone = {
  id: string;
  type: "Aerial" | "Ground" | "Hybrid";
  battery: number;
  link: number;
  task: string;
};

const initialDrones: Drone[] = [
  { id: "HX-DR-12", type: "Hybrid", battery: 78, link: 96, task: "Forest survey · Amazon" },
  { id: "AX-DR-44", type: "Aerial", battery: 62, link: 88, task: "Wildfire scout · CA" },
  { id: "GX-DR-09", type: "Ground", battery: 91, link: 99, task: "City patrol · Seoul" },
  { id: "HX-DR-21", type: "Hybrid", battery: 34, link: 72, task: "Pipeline inspect · NO" },
];

const headsets = [
  { id: "VR-OPS-01", user: "Cmd. Reyes", session: "Disaster sim · Manila", ping: 14 },
  { id: "VR-OPS-04", user: "Eng. Müller", session: "Grid walkthrough · DE", ping: 21 },
  { id: "VR-OPS-11", user: "Dr. Okafor", session: "Reactor tour · Bushehr", ping: 33 },
];

export function VRDronesModule() {
  const [drones, setDrones] = useState(initialDrones);

  useEffect(() => {
    const id = setInterval(() => {
      setDrones((p) =>
        p.map((d) => ({
          ...d,
          battery: Math.max(5, d.battery - Math.random() * 0.4),
          link: Math.max(40, Math.min(100, d.link + (Math.random() - 0.5) * 3)),
        })),
      );
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono text-glow-cyan mb-3">
            <Glasses className="h-3 w-3" /> IMMERSIVE OPS · VR + DRONES
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            VR headsets &amp; hybrid ground-aerial drones
          </h2>
        </div>
        <span className="text-xs font-mono text-glow-green flex items-center gap-2">
          <span className="status-dot" /> 1,204 devices linked
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-glow-cyan">
              <Glasses className="h-3 w-3" /> VR Headsets · Live sessions
            </div>
            <span className="text-[10px] font-mono text-glow-green">3 active</span>
          </div>
          <div className="space-y-2">
            {headsets.map((h) => (
              <div key={h.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 grid place-items-center neon-border">
                  <Glasses className="h-4 w-4 text-glow-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{h.user}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{h.session}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-glow-green flex items-center gap-1 justify-end">
                    <Activity className="h-3 w-3" /> {h.ping}ms
                  </div>
                  <div className="text-[10px] text-muted-foreground">{h.id}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full h-10 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-glow-cyan text-xs font-medium hover:animate-glow flex items-center justify-center gap-2">
            <Link2 className="h-3.5 w-3.5" /> Connect new headset
          </button>
        </div>

        <div className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-glow-cyan">
              <Plane className="h-3 w-3" /> Hybrid Drones · Telemetry
            </div>
            <span className="text-[10px] font-mono text-glow-green">streaming</span>
          </div>
          <div className="space-y-2">
            {drones.map((d) => (
              <div key={d.id} className="p-3 rounded-xl bg-white/5 border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary/15 grid place-items-center text-glow-green">
                    <Plane className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">
                      {d.id} <span className="text-muted-foreground font-normal">· {d.type}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">{d.task}</div>
                  </div>
                  <div className="text-right text-[11px] font-mono">
                    <div className={`flex items-center gap-1 justify-end ${d.battery < 35 ? "text-[var(--warn)]" : "text-glow-green"}`}>
                      <Battery className="h-3 w-3" /> {d.battery.toFixed(0)}%
                    </div>
                    <div className="text-glow-cyan flex items-center gap-1 justify-end">
                      <Radio className="h-3 w-3" /> {d.link.toFixed(0)}%
                    </div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full" style={{ width: `${d.battery}%`, background: d.battery < 35 ? "var(--warn)" : "var(--green-glow)" }} />
                  </div>
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full" style={{ width: `${d.link}%`, background: "var(--cyan-glow)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
