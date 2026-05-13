import { useState } from "react";
import { X, Globe2, Lock, Mail } from "lucide-react";

export function LoginModal({
  open,
  onOpenChange,
  onLogin,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onLogin: (user: { email: string; role: string }) => void;
}) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState("Citizen");
  const [err, setErr] = useState("");

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || pwd.length < 4) {
      setErr("Enter a valid email and a password (4+ chars).");
      return;
    }
    onLogin({ email, role });
    onOpenChange(false);
    setErr("");
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in">
      <div className="glass p-7 w-full max-w-md relative neon-border">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 grid place-items-center">
            <Globe2 className="h-5 w-5 text-glow-cyan" />
          </div>
          <div>
            <div className="font-display text-lg font-semibold">Sign in to NEUROLINK</div>
            <div className="text-[11px] font-mono text-glow-green">EARTH-OS · v4.2</div>
          </div>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Email</span>
            <div className="mt-1 flex items-center gap-2 px-3 h-11 rounded-xl bg-white/5 border border-border focus-within:border-primary/40">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@earth.os"
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Password</span>
            <div className="mt-1 flex items-center gap-2 px-3 h-11 rounded-xl bg-white/5 border border-border focus-within:border-primary/40">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="••••••••"
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full h-11 px-3 rounded-xl bg-white/5 border border-border text-sm outline-none"
            >
              {["Citizen", "Farmer", "Company", "Government", "Global Org"].map((r) => (
                <option key={r} className="bg-background">{r}</option>
              ))}
            </select>
          </label>

          {err && <div className="text-xs text-destructive">{err}</div>}

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm shadow-[0_0_30px_var(--cyan-glow)] hover:opacity-90"
          >
            Enter NEUROLINK
          </button>
          <p className="text-[10px] text-center text-muted-foreground">
            Secured by NEURO mesh · zero-trust biometric link
          </p>
        </form>
      </div>
    </div>
  );
}
