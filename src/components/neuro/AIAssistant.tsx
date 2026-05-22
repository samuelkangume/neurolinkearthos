import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, Lightbulb, AlertTriangle, Activity, Loader2, Zap, Gauge, Wind } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { neuroChat } from "@/lib/neuro-ai.functions";

type Msg = { role: "user" | "assistant"; content: string; error?: boolean };

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
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [msgs, open, busy]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || busy) return;

    setError(null);
    const next: Msg[] = [...msgs, { role: "user", content: t }];
    setMsgs(next);
    setInput("");
    setBusy(true);

    try {
      const res = await ask({ data: { messages: next } });

      if (res.error) {
        setMsgs((p) => [...p, { role: "assistant", content: res.text, error: true }]);
        setError(res.text);
      } else {
        setMsgs((p) => [...p, { role: "assistant", content: res.text, error: false }]);
      }
    } catch (err: any) {
      const errorMsg = err?.message || "NEURO core unreachable. Please retry.";
      setMsgs((p) => [...p, { role: "assistant", content: errorMsg, error: true }]);
      setError(errorMsg);
      console.error("[NEURO] Chat error:", err);
    } finally {
      setBusy(false);
    }
  };

  const quickActions = [
    { label: "Energy status", icon: Zap },
    { label: "Show alerts", icon: AlertTriangle },
    { label: "Air quality", icon: Wind },
    { label: "Robot fleet", icon: Activity },
    { label: "Solar weather", icon: Sparkles },
    { label: "System health", icon: Gauge },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => onOpenChange(!open)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary grid place-items-center text-primary-foreground shadow-[0_0_30px_var(--cyan-glow)] hover:scale-110 transition-transform ${
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Open NEURO AI"
      >
        <Sparkles className="h-5 w-5" />
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-0 right-0 z-50 w-full md:w-[400px] md:bottom-6 md:right-6 h-screen md:h-[600px] glass md:rounded-2xl md:border md:border-border/50 overflow-hidden transition-all duration-300 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-secondary grid place-items-center animate-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display text-sm font-semibold">NEURO AI</div>
              <div className="text-[10px] font-mono text-glow-green flex items-center gap-1">
                <span className="status-dot" /> Live Gateway
              </div>
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-3 border-b border-border/30 flex gap-1.5 overflow-x-auto scrollbar-none">
          {quickActions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => send(label)}
              disabled={busy}
              className="shrink-0 text-[10px] px-2.5 py-1.5 rounded-full bg-white/5 border border-border hover:bg-primary/15 hover:text-glow-cyan hover:border-primary/40 transition-all disabled:opacity-50 flex items-center gap-1"
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          ))}
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-primary/20">
          {msgs.length === 0 && (
            <>
              <div className="rounded-lg p-3 bg-white/5 border border-border text-xs space-y-1">
                <div className="flex items-center gap-2 text-glow-cyan font-mono uppercase tracking-widest text-[10px]">
                  <Activity className="h-3 w-3" /> Status
                </div>
                <p>All planetary systems nominal · ask me anything.</p>
              </div>
              <div className="rounded-lg p-3 bg-secondary/10 border border-secondary/20 text-xs space-y-1">
                <div className="flex items-center gap-2 text-glow-green font-mono uppercase tracking-widest text-[10px]">
                  <Lightbulb className="h-3 w-3" /> Pro Tips
                </div>
                <p>• "What's the current energy output?"</p>
                <p>• "Show me solar radiation in Tokyo"</p>
                <p>• "Deploy robot fleet to sector 7"</p>
              </div>
              <div className="rounded-lg p-3 bg-[oklch(0.82_0.18_80/0.1)] border border-[oklch(0.82_0.18_80/0.3)] text-xs space-y-1">
                <div className="flex items-center gap-2 text-[var(--warn)] font-mono uppercase tracking-widest text-[10px]">
                  <AlertTriangle className="h-3 w-3" /> Alert
                </div>
                <p>Battery levels low on NX-077 · auto-routing to nearest charging dock.</p>
              </div>
            </>
          )}

          {msgs.map((m, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 text-xs whitespace-pre-wrap break-words transition-all ${
                m.role === "user"
                  ? "bg-primary/15 border border-primary/30 ml-6 text-primary-foreground"
                  : m.error
                    ? "bg-red-500/10 border border-red-500/20 mr-6 text-red-100"
                    : "bg-white/5 border border-border mr-6"
              }`}
            >
              {m.content}
            </div>
          ))}

          {busy && (
            <div className="rounded-lg p-3 text-xs bg-white/5 border border-border mr-6 flex items-center gap-2 text-muted-foreground animate-pulse">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>NEURO thinking…</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 border-t border-border/30 space-y-2"
        >
          {error && (
            <div className="text-[10px] p-2 rounded bg-red-500/10 border border-red-500/20 text-red-100">
              {error}
            </div>
          )}
          <div className="flex items-center gap-2 px-3 h-10 rounded-lg bg-white/5 border border-border focus-within:border-primary/40 transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask NEURO…"
              disabled={busy}
              className="flex-1 bg-transparent outline-none text-xs placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="h-7 w-7 rounded-md bg-primary/20 grid place-items-center text-glow-cyan disabled:opacity-30 hover:bg-primary/30 transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="text-[9px] text-muted-foreground text-center">
            Powered by Lovable AI Gateway · Gemini 2.0 Flash
          </div>
        </form>
      </div>
    </>
  );
}
