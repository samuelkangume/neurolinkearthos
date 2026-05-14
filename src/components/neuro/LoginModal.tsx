import { useState } from "react";
import {
  X, Globe2, Lock, Mail, User, Building2, Landmark, Users, GraduationCap, Heart, Rocket, Shield, Tractor,
} from "lucide-react";

const ROLES = [
  { key: "Personal", icon: User, desc: "Home energy, air, waste & local alerts.", features: ["Smart Home", "Personal AQI", "Recycling tracker", "Family alerts"] },
  { key: "Team", icon: Users, desc: "Shared dashboards & collaborative ops.", features: ["Shared boards", "Mission planner", "Chat-with-AI", "Role permissions"] },
  { key: "Farmer", icon: Tractor, desc: "Smart agriculture, irrigation, yield AI.", features: ["Soil sensors", "Agri-bots", "Weather AI", "Crop yield"] },
  { key: "Company", icon: Building2, desc: "Operations, ESG, fleet & facilities.", features: ["Fleet ops", "ESG reports", "Carbon ledger", "Compliance"] },
  { key: "Government", icon: Landmark, desc: "Infrastructure, safety, city analytics.", features: ["Infra grid", "Public safety", "Disaster sim", "City KPIs"] },
  { key: "Research / NGO", icon: Heart, desc: "Climate science, datasets, field tools.", features: ["Datasets", "VR field ops", "Open API", "Funding ledger"] },
  { key: "Education", icon: GraduationCap, desc: "Classroom Earth-OS access & labs.", features: ["Earth labs", "VR tours", "Quizzes", "Class boards"] },
  { key: "Defense / Safety", icon: Shield, desc: "Mission-critical secure operations.", features: ["Encrypted mesh", "Drone ops", "Threat AI", "Geo-fencing"] },
  { key: "Global Org.", icon: Globe2, desc: "Treaties, carbon markets, indices.", features: ["Treaty engine", "Carbon market", "Global index", "Coord. room"] },
  { key: "Space / Astronaut", icon: Rocket, desc: "Orbital ops, hab telemetry, deep-link.", features: ["Orbit mesh", "Hab telemetry", "Solar weather", "Deep-link"] },
];

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
  const [role, setRole] = useState("Personal");
  const [err, setErr] = useState("");

  if (!open) return null;
  const cur = ROLES.find((r) => r.key === role)!;

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
      <div className="glass p-0 w-full max-w-3xl relative neon-border overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 opacity-70 hover:opacity-100 z-10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-[1.1fr_1fr]">
          {/* Left: roles */}
          <div className="p-6 border-r border-border/50 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 grid place-items-center neon-border">
                <Globe2 className="h-5 w-5 text-glow-cyan" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold leading-none">NEUROLINK EARTH</div>
                <div className="text-[10px] font-mono text-glow-green tracking-[0.3em] mt-1">EARTH-OS · v4.2</div>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Who is signing in?
            </div>
            <div className="grid grid-cols-2 gap-1.5 max-h-[320px] overflow-y-auto pr-1">
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  className={`text-left p-2.5 rounded-xl border text-xs flex items-center gap-2 transition-all ${
                    role === r.key
                      ? "bg-primary/15 border-primary/40 text-glow-cyan"
                      : "bg-white/5 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <r.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{r.key}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-secondary/5 border border-secondary/20">
              <div className="text-[10px] uppercase tracking-widest text-glow-green mb-1.5">
                Unlocked for {cur.key}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cur.features.map((f) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-border">
                    {f}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">{cur.desc}</p>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={submit} className="p-6 space-y-3">
            <div className="font-display text-base font-semibold">Sign in to your Earth-OS</div>
            <p className="text-[11px] text-muted-foreground -mt-2">
              Zero-trust biometric link · NEURO mesh secured
            </p>

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

            {err && <div className="text-xs text-destructive">{err}</div>}

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm shadow-[0_0_30px_var(--cyan-glow)] hover:opacity-90"
            >
              Enter NEUROLINK as {role}
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
