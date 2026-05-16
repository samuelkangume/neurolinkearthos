import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, Lightbulb, AlertTriangle, Activity, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { neuroChat } from "@/lib/neuro-ai.functions";

type Msg = { role: "user" | "assistant"; content: string };

export function AIAssistant({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const ask = useServerFn(neuroChat);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [msgs, open, busy]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: t }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await ask({ data: { messages: next } });
      setMsgs((p) => [...p, { role: "assistant", content: res.text }]);
    } catch {
      setMsgs((p) => [...p, { role: "assistant", content: "NEURO core unreachable. Please retry." }]);
    } finally {
      setBusy(false);
    }
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
              <span className="status-dot" /> Live · Lovable AI Gateway
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
                All planetary systems nominal · ask me anything.
              </div>
              <div className="rounded-xl p-3 bg-secondary/10 border border-secondary/20 text-xs">
                <div className="flex items-center gap-2 text-glow-green font-mono uppercase tracking-widest text-[10px] mb-1">
                  <Lightbulb className="h-3 w-3" /> Tip
                </div>
                Try: "Brief me on Hoover Dam" or "What's the AQI in Delhi?"
              </div>
              <div className="rounded-xl p-3 bg-[oklch(0.82_0.18_80/0.1)] border border-[oklch(0.82_0.18_80/0.3)] text-xs">
                <div className="flex items-center gap-2 text-[var(--warn)] font-mono uppercase tracking-widest text-[10px] mb-1">
                  <AlertTriangle className="h-3 w-3" /> Alert
                </div>
                NX-077 battery low — auto-routing to charging dock.
              </div>
            </>
          )}
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 text-xs whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary/15 border border-primary/30 ml-6"
                  : "bg-white/5 border border-border mr-6"
              }`}
            >
              {m.content}
            </div>
          ))}
          {busy && (
            <div className="rounded-xl p-3 text-xs bg-white/5 border border-border mr-6 flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> NEURO thinking…
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="mt-3 flex items-center gap-2 px-3 h-10 rounded-xl bg-white/5 border border-border focus-within:border-primary/40"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask NEURO anything…"
            className="flex-1 bg-transparent outline-none text-xs placeholder:text-muted-foreground"
          />
          <button type="submit" disabled={busy} className="h-7 w-7 rounded-lg bg-primary/20 grid place-items-center text-glow-cyan disabled:opacity-50">
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </>
  );
}
