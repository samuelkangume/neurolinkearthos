import { useState } from "react";
import { Sparkles, X, Send, Lightbulb, AlertTriangle, Activity } from "lucide-react";

export function AIAssistant({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [input, setInput] = useState("");

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => onOpenChange(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary grid place-items-center text-primary-foreground shadow-[0_0_30px_var(--cyan-glow)] hover:scale-105 transition-transform"
        aria-label="Open NEURO AI"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-2rem))] glass p-5 origin-bottom-right transition-all duration-300 ${
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

        <div className="mt-4 space-y-2">
          <div className="rounded-xl p-3 bg-white/5 border border-border text-xs">
            <div className="flex items-center gap-2 text-glow-cyan font-mono uppercase tracking-widest text-[10px] mb-1">
              <Activity className="h-3 w-3" /> Status summary
            </div>
            All planetary systems nominal. 3 low-priority alerts in EU-12.
          </div>
          <div className="rounded-xl p-3 bg-secondary/10 border border-secondary/20 text-xs">
            <div className="flex items-center gap-2 text-glow-green font-mono uppercase tracking-widest text-[10px] mb-1">
              <Lightbulb className="h-3 w-3" /> Recommendation
            </div>
            Shift 240 MW from gas peakers to APAC battery clusters tonight to
            save 4.2 Mt CO₂.
          </div>
          <div className="rounded-xl p-3 bg-[oklch(0.82_0.18_80/0.1)] border border-[oklch(0.82_0.18_80/0.3)] text-xs">
            <div className="flex items-center gap-2 text-[var(--warn)] font-mono uppercase tracking-widest text-[10px] mb-1">
              <AlertTriangle className="h-3 w-3" /> Alert
            </div>
            Robot NX-077 battery low — auto-routing to nearest charging dock.
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInput("");
          }}
          className="mt-4 flex items-center gap-2 px-3 h-10 rounded-xl bg-white/5 border border-border focus-within:border-primary/40"
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
