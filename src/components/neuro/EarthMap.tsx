import mapImg from "@/assets/earth-map.jpg";
import { Satellite, Bot, Zap, Wind } from "lucide-react";

const pins = [
  { x: 22, y: 38, label: "Energy Hub · NA-04", icon: Zap, tone: "cyan" },
  { x: 48, y: 32, label: "Robotics · EU-12", icon: Bot, tone: "green" },
  { x: 70, y: 44, label: "Sat Link · ASIA-08", icon: Satellite, tone: "cyan" },
  { x: 55, y: 62, label: "Air Sensor · AF-02", icon: Wind, tone: "green" },
  { x: 82, y: 70, label: "Robotics · OCE-01", icon: Bot, tone: "cyan" },
];

export function EarthMap() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="glass p-6 md:p-8 relative overflow-hidden">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Live Earth map
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Environmental zones, robot fleets, energy stations and satellite uplinks.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            {[
              { l: "Energy", c: "cyan" },
              { l: "Robotics", c: "green" },
              { l: "Satellites", c: "cyan" },
              { l: "Pollution", c: "warn" },
            ].map((b) => (
              <span
                key={b.l}
                className="px-2.5 py-1 rounded-full bg-white/5 border border-border flex items-center gap-1.5"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      b.c === "cyan"
                        ? "var(--cyan-glow)"
                        : b.c === "green"
                        ? "var(--green-glow)"
                        : "var(--warn)",
                    boxShadow:
                      b.c === "cyan"
                        ? "0 0 8px var(--cyan-glow)"
                        : b.c === "green"
                        ? "0 0 8px var(--green-glow)"
                        : "0 0 8px var(--warn)",
                  }}
                />
                {b.l}
              </span>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-border bg-background/40 aspect-[16/9]">
          <img
            src={mapImg}
            alt="Global infrastructure map"
            width={1600}
            height={900}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-primary/10 to-transparent animate-scan pointer-events-none" />

          {pins.map((p) => (
            <div
              key={p.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div
                className={`h-8 w-8 rounded-full grid place-items-center ${
                  p.tone === "cyan"
                    ? "bg-primary/20 text-glow-cyan"
                    : "bg-secondary/20 text-glow-green"
                } border border-white/20 backdrop-blur-md`}
              >
                <p.icon className="h-3.5 w-3.5" />
              </div>
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-mono px-2 py-1 rounded-md bg-background/80 border border-border">
                {p.label}
              </div>
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background:
                    p.tone === "cyan"
                      ? "var(--cyan-glow)"
                      : "var(--green-glow)",
                  opacity: 0.25,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
