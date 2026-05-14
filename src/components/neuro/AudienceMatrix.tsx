import {
  User, Tractor, Building2, Landmark, Globe2, Rocket, Heart, GraduationCap, Shield, Users,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const AUDIENCES = [
  {
    icon: User, role: "For You · Personal",
    use: "Live air quality at home, EV & solar dashboard, recycling rewards, family safety alerts.",
    tone: "cyan" as const,
  },
  {
    icon: Tractor, role: "For Farmers",
    use: "Soil sensors, drone scouting, AI irrigation, crop yield forecasts, weather & pest alerts.",
    tone: "green" as const,
  },
  {
    icon: Building2, role: "For Companies",
    use: "Fleet & facility ops, ESG reports, carbon ledger, factory energy and compliance.",
    tone: "cyan" as const,
  },
  {
    icon: Landmark, role: "For Governments",
    use: "City KPIs, infrastructure grid, disaster simulation, public safety mesh and policy AI.",
    tone: "green" as const,
  },
  {
    icon: Heart, role: "For NGOs & Research",
    use: "Open datasets, VR field ops, funding ledger, climate science models and APIs.",
    tone: "cyan" as const,
  },
  {
    icon: GraduationCap, role: "For Education",
    use: "Earth-OS classroom mode, VR planetary tours, climate labs, quizzes and class boards.",
    tone: "green" as const,
  },
  {
    icon: Shield, role: "For Defense & Safety",
    use: "Encrypted mesh, drone & robot ops, threat AI, geo-fencing and crisis coordination.",
    tone: "cyan" as const,
  },
  {
    icon: Users, role: "For Teams",
    use: "Shared dashboards, mission planner, role permissions and chat-with-AI for any project.",
    tone: "green" as const,
  },
  {
    icon: Globe2, role: "For Global Organizations",
    use: "Treaty engine, carbon markets, planetary indices and a cross-border coordination room.",
    tone: "cyan" as const,
  },
  {
    icon: Rocket, role: "For Space & Astronauts",
    use: "Orbital mesh, habitat telemetry, solar weather and Earth↔orbit deep-link.",
    tone: "green" as const,
  },
];

export function AudienceMatrix() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <SectionHeader
        eyebrow="00 · Built for everyone"
        title="One Earth-OS · Tailored to who you are"
        desc="NEUROLINK EARTH adapts its modules, data depth and controls to each user. Sign in once — the platform reshapes itself for your role."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {AUDIENCES.map((a) => (
          <div
            key={a.role}
            className="glass glass-hover p-5 group relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div
              className={`h-10 w-10 rounded-xl grid place-items-center ${
                a.tone === "cyan"
                  ? "bg-primary/15 text-glow-cyan"
                  : "bg-secondary/15 text-glow-green"
              }`}
            >
              <a.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 font-display text-sm font-semibold leading-snug">
              {a.role}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
              {a.use}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
