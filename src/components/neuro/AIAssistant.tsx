import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, Lightbulb, AlertTriangle, Activity } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

function reply(input: string): string {
  const q = input.toLowerCase();
  if (/hello|hi|hey/.test(q))
    return "Hi — I'm NEURO AI. I can brief you on energy, robotics, climate, alerts, or any region.";
  if (/energy|grid|power|solar/.test(q))
    return "Global grid is at 62% renewable, 88% optimization score. Recommend shifting 240 MW from gas peakers to APAC battery clusters tonight (saves ~4.2 Mt CO₂).";
  if (/robot|fleet|nx-/.test(q))
    return "248 robots online · 12 in maintenance. NX-077 battery low (18%) — auto-routing to nearest dock in Dubai.";
  if (/air|pollution|aqi|smog/.test(q))
    return "Global AQI median: 38 (Good). Spike detected in Milan (PM2.5 142 µg/m³). Throttling 14 factories until tomorrow 06:00 UTC.";
  if (/water|flood/.test(q))
    return "Flood risk elevated in Bangladesh delta — monsoon surge +38%. 2.1M residents alerted via NEURO mesh.";
  if (/co2|carbon|climate/.test(q))
    return "284 Mt CO₂ offset YTD · projecting +8.4% renewable share by Q3.";
  if (/waste|recycle|bin/.test(q))
    return "Global recycling rate 92% (+4.8% wk). 18,420 smart bins online; BIN-E18 (Lagos) at 96% — robot dispatched.";
  if (/alert|emergency|risk/.test(q))
    return "4 active signals: flood (high), pollution (med), power overload (med), radiation (low). Want me to open any?";
  if (/solar|space|orbit|sat|kp/.test(q))
    return "Kp 3.2 (quiet) · Solar flux 178 sfu · last flare C2.1. 142 sats nominal — DEEP-LINK 02 at L2 holding lock.";
  if (/radiat|nuclear|reactor/.test(q))
    return "Global avg dose 0.21 µSv/h. 2 anomalies: Chernobyl exclusion (1.42), Mars Sim-7 hab (12.6). Containment 100%.";
  if (/vr|headset|immers/.test(q))
    return "3 VR ops live · avg latency 22 ms. Want me to open the disaster sim or grid walkthrough?";
  if (/drone|hybrid|aerial|ground/.test(q))
    return "1,204 drones online. HX-DR-21 battery 34% — auto-routing to nearest charge pad.";
  if (/farm|agri|crop/.test(q))
    return "Agri-bots irrigating 18.4M ha. Iowa fields predicted +12% yield with 24% less water this season.";
  if (/help|what can|capab/.test(q))
    return "Ask me about: energy, robots, air, water, waste, climate, alerts, agriculture, telecom, or any city.";
  return "Routing your query through NEURO core… Earth-OS is healthy. Try asking about energy, robotics, alerts, or a region.";
}

export function AIAssistant({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [msgs, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((p) => [...p, { role: "user", text: t }]);
    setInput("");
    setTimeout(() => setMsgs((p) => [...p, { role: "ai", text: reply(t) }]), 450);
  };

  return (
    <>
      <button
        onClick={() => onOpenChange(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary grid place-items-center text-primary-foreground shadow-[0_0_30px_var(--cyan-glow)] hover:scale-105 transition-transform"
        aria-label="Open NEURO AI"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-50 w-[min(400px,calc(100vw-2rem))] glass p-5 origin-bottom-right transition-all duration-300 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center animate-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-display font-semibold">NEURO AI</div>
            <div className="text-[11px] font-mono text-glow-green flex items-center gap-1.5">
              <span className="status-dot" /> Online · Earth-OS
            </div>
          </div>
        </div>

        <div className="mt-3 -mx-1 px-1 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {["Energy status", "Show alerts", "Air quality", "Robot fleet", "Solar weather", "Radiation", "Connect VR", "Drone telemetry"].map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-border hover:bg-primary/15 hover:text-glow-cyan hover:border-primary/40 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        <div ref={scrollRef} className="mt-2 h-72 overflow-y-auto space-y-2 pr-1">
          {msgs.length === 0 && (
            <>
              <div className="rounded-xl p-3 bg-white/5 border border-border text-xs">
                <div className="flex items-center gap-2 text-glow-cyan font-mono uppercase tracking-widest text-[10px] mb-1">
                  <Activity className="h-3 w-3" /> Status
                </div>
                All planetary systems nominal · 4 live alerts.
              </div>
              <div className="rounded-xl p-3 bg-secondary/10 border border-secondary/20 text-xs">
                <div className="flex items-center gap-2 text-glow-green font-mono uppercase tracking-widest text-[10px] mb-1">
                  <Lightbulb className="h-3 w-3" /> Recommendation
                </div>
                Shift 240 MW to APAC batteries tonight → save 4.2 Mt CO₂.
              </div>
              <div className="rounded-xl p-3 bg-[oklch(0.82_0.18_80/0.1)] border border-[oklch(0.82_0.18_80/0.3)] text-xs">
                <div className="flex items-center gap-2 text-[var(--warn)] font-mono uppercase tracking-widest text-[10px] mb-1">
                  <AlertTriangle className="h-3 w-3" /> Alert
                </div>
                NX-077 battery low — auto-routing to charging dock.
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["Energy status", "Show alerts", "Air quality", "Robot fleet"].map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-border hover:bg-white/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 text-xs ${
                m.role === "user"
                  ? "bg-primary/15 border border-primary/30 ml-6"
                  : "bg-white/5 border border-border mr-6"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-3 flex items-center gap-2 px-3 h-10 rounded-xl bg-white/5 border border-border focus-within:border-primary/40"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask NEURO anything…"
            className="flex-1 bg-transparent outline-none text-xs placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="h-7 w-7 rounded-lg bg-primary/20 grid place-items-center text-glow-cyan"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </>
  );
}
