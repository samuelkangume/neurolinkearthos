import { useState } from "react";
import { User, Building2, Landmark, Globe } from "lucide-react";

const roles = [
  { key: "public", label: "Public User", icon: User, desc: "Friendly view of your home, neighborhood and personal impact." },
  { key: "company", label: "Company", icon: Building2, desc: "Operations, ESG reporting, fleet and facility intelligence." },
  { key: "gov", label: "Government", icon: Landmark, desc: "Infrastructure, public safety, compliance and city analytics." },
  { key: "global", label: "Global Org.", icon: Globe, desc: "Cross-border coordination, treaties and planetary indices." },
];

export function RoleSwitcher() {
  const [active, setActive] = useState("public");
  const cur = roles.find((r) => r.key === active)!;
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10">
      <div className="glass p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Role-based interface
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              The platform adapts to who you are.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => setActive(r.key)}
                className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all ${
                  active === r.key
                    ? "bg-primary/15 border-primary/40 text-glow-cyan"
                    : "bg-white/5 border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <r.icon className="h-3.5 w-3.5" /> {r.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-[1fr_2fr] gap-6 items-center">
          <div>
            <div className="text-xs font-mono text-glow-green uppercase tracking-widest">
              Active role
            </div>
            <div className="mt-2 font-display text-3xl font-bold">{cur.label}</div>
            <p className="text-sm text-muted-foreground mt-2">{cur.desc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(active === "public"
              ? ["Home Energy", "Air Quality", "Waste Pickup", "Local Alerts"]
              : active === "company"
              ? ["Fleet", "Facilities", "ESG Report", "Compliance"]
              : active === "gov"
              ? ["Infrastructure", "Public Safety", "Disaster Plan", "City Analytics"]
              : ["Treaties", "Carbon Markets", "Global Index", "Coordination"]
            ).map((t) => (
              <div
                key={t}
                className="rounded-xl bg-white/5 border border-border p-3 text-xs text-center"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
