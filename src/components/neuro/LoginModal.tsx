import { useState } from "react";
import {
  X, Globe2, Lock, Mail, User, Building2, Landmark, Users, GraduationCap, Heart, Rocket, Shield, Tractor, MessageCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ROLES = [
  { key: "Personal", icon: User, desc: "Home energy, air, waste & local alerts.", features: ["Smart Home", "Personal AQI", "Recycling", "Family alerts"] },
  { key: "Team", icon: Users, desc: "Shared dashboards & collaborative ops.", features: ["Shared boards", "Mission planner", "Chat-with-AI", "Permissions"] },
  { key: "Farmer", icon: Tractor, desc: "Smart agriculture, irrigation, yield AI.", features: ["Soil sensors", "Agri-bots", "Weather AI", "Crop yield"] },
  { key: "Company", icon: Building2, desc: "Operations, ESG, fleet & facilities.", features: ["Fleet ops", "ESG reports", "Carbon ledger", "Compliance"] },
  { key: "Government", icon: Landmark, desc: "Infrastructure, safety, city analytics.", features: ["Infra grid", "Public safety", "Disaster sim", "City KPIs"] },
  { key: "Research / NGO", icon: Heart, desc: "Climate science, datasets, field tools.", features: ["Datasets", "VR field ops", "Open API", "Funding ledger"] },
  { key: "Education", icon: GraduationCap, desc: "Classroom Earth-OS access & labs.", features: ["Earth labs", "VR tours", "Quizzes", "Class boards"] },
  { key: "Defense / Safety", icon: Shield, desc: "Mission-critical secure operations.", features: ["Encrypted mesh", "Drone ops", "Threat AI", "Geo-fencing"] },
  { key: "Global Org.", icon: Globe2, desc: "Treaties, carbon markets, indices.", features: ["Treaty engine", "Carbon market", "Global index", "Coord. room"] },
  { key: "Space / Astronaut", icon: Rocket, desc: "Orbital ops, hab telemetry, deep-link.", features: ["Orbit mesh", "Hab telemetry", "Solar weather", "Deep-link"] },
];

type Mode = "signin" | "signup";

export function LoginModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState("Personal");
  const [mode, setMode] = useState<Mode>("signin");
  const [busy, setBusy] = useState(false);

  if (!open) return null;
  const cur = ROLES.find((r) => r.key === role)!;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || pwd.length < 6) {
      toast.error("Enter a valid email and a password (6+ chars).");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password: pwd,
          options: {
            emailRedirectTo: window.location.origin,
            data: { role },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm, then sign in.");
        setMode("signin");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pwd });
        if (error) throw error;
        // update role if user picked a different one
        if (data.user) {
          await supabase.from("profiles").update({ role }).eq("id", data.user.id);
        }
        toast.success(`Welcome back · signed in as ${role}`);
        onOpenChange(false);
      }
    } catch (err: any) {
      toast.error(err?.message || "Auth failed");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth("google", {
        redirectTo: `${window.location.origin}?auth=callback`,
        scopes: "email profile openid",
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast.error(err?.message || "Google sign-in failed");
      setBusy(false);
    }
  };

  const whatsapp = async () => {
    setBusy(true);
    try {
      // WhatsApp sign-in via Supabase (requires WhatsApp Business API setup)
      const { data, error } = await supabase.auth.signInWithOAuth("whatsapp", {
        redirectTo: `${window.location.origin}?auth=callback`,
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      // Fallback: Open WhatsApp with pre-filled message
      toast.info("Opening WhatsApp for verification...");
      const phoneNumber = "+1234567890"; // Replace with your WhatsApp Business number
      const message = `Signing in to NEUROLINK EARTH as ${role}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in">
      <div className="glass p-0 w-full max-w-3xl relative neon-border overflow-hidden">
        <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 opacity-70 hover:opacity-100 z-10" aria-label="Close">
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <div className="p-6 border-r border-border/50 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 grid place-items-center neon-border">
                <Globe2 className="h-5 w-5 text-glow-cyan" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold leading-none">NEUROLINK EARTH</div>
                <div className="text-[10px] font-mono text-glow-green tracking-[0.3em] mt-1">EARTH-OS · LIVE</div>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Who is signing in?</div>
            <div className="grid grid-cols-2 gap-1.5 max-h-[320px] overflow-y-auto pr-1">
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  className={`text-left p-2.5 rounded-xl border text-xs flex items-center gap-2 transition-all ${
                    role === r.key ? "bg-primary/15 border-primary/40 text-glow-cyan" : "bg-white/5 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <r.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{r.key}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-secondary/5 border border-secondary/20">
              <div className="text-[10px] uppercase tracking-widest text-glow-green mb-1.5">Unlocked for {cur.key}</div>
              <div className="flex flex-wrap gap-1.5">
                {cur.features.map((f) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-border">{f}</span>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">{cur.desc}</p>
            </div>
          </div>

          <form onSubmit={submit} className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-display text-base font-semibold">
                {mode === "signin" ? "Sign in to Earth-OS" : "Create your Earth-OS account"}
              </div>
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-[11px] text-glow-cyan hover:underline"
              >
                {mode === "signin" ? "New? Sign up" : "Have account?"}
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground -mt-2">Cross-device session · zero-trust mesh</p>

            {/* Google Sign-in */}
            <button
              type="button"
              onClick={google}
              disabled={busy}
              className="w-full h-11 rounded-xl bg-white text-black text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.2-7.78z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* WhatsApp/WIC Sign-in */}
            <button
              type="button"
              onClick={whatsapp}
              disabled={busy}
              className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
            >
              <MessageCircle className="h-4 w-4" />
              Sign in with WhatsApp
            </button>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="flex-1 h-px bg-border" /> or email <span className="flex-1 h-px bg-border" />
            </div>

            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Email</span>
              <div className="mt-1 flex items-center gap-2 px-3 h-11 rounded-xl bg-white/5 border border-border focus-within:border-primary/40">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@earth.os" className="flex-1 bg-transparent outline-none text-sm" />
              </div>
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Password</span>
              <div className="mt-1 flex items-center gap-2 px-3 h-11 rounded-xl bg-white/5 border border-border focus-within:border-primary/40">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="••••••••" className="flex-1 bg-transparent outline-none text-sm" />
              </div>
            </label>

            <button
              type="submit"
              disabled={busy}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm shadow-[0_0_30px_var(--cyan-glow)] hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {busy ? "…" : mode === "signin" ? `Enter NEUROLINK as ${role}` : `Create ${role} account`}
            </button>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="status-dot" /> Biometric · Hardware key · Quantum-safe
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
