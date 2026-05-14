import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopNav } from "@/components/neuro/TopNav";
import { Hero } from "@/components/neuro/Hero";
import { PlanetVitals } from "@/components/neuro/PlanetVitals";
import { DataFlow } from "@/components/neuro/DataFlow";
import { ModuleGrid } from "@/components/neuro/ModuleGrid";
import { LiveEnergyChart } from "@/components/neuro/LiveEnergyChart";
import { LiveInsights } from "@/components/neuro/LiveInsights";
import { EmergencyAlerts } from "@/components/neuro/EmergencyAlerts";
import { EarthMap } from "@/components/neuro/EarthMap";
import { ConnectedSystems } from "@/components/neuro/ConnectedSystems";
import { DeepModules } from "@/components/neuro/DeepModules";
import { RoboticsLive } from "@/components/neuro/RoboticsLive";
import { WasteModule } from "@/components/neuro/WasteModule";
import { AdvancedModules } from "@/components/neuro/AdvancedModules";
import { ImpactModule } from "@/components/neuro/ImpactModule";
import { SpacePhysics } from "@/components/neuro/SpacePhysics";
import { RadiationModule } from "@/components/neuro/RadiationModule";
import { PollutionModule } from "@/components/neuro/PollutionModule";
import { VRDronesModule } from "@/components/neuro/VRDronesModule";
import { RoleSwitcher } from "@/components/neuro/RoleSwitcher";
import { AIAssistant } from "@/components/neuro/AIAssistant";
import { LoginModal } from "@/components/neuro/LoginModal";
import { Footer } from "@/components/neuro/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEUROLINK EARTH — Operating System for a Smarter Planet" },
      {
        name: "description",
        content:
          "AI-powered platform unifying energy, environment, robotics, telecom and public safety into a single planetary intelligence system.",
      },
      { property: "og:title", content: "NEUROLINK EARTH" },
      {
        property: "og:description",
        content:
          "Premium next-generation smart Earth operating system with environmental monitoring, smart energy, robotics and AI analytics.",
      },
    ],
  }),
  component: Index,
});

type SessionUser = { email: string; role: string };

function Index() {
  const [aiOpen, setAiOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("neuro_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const handleLogin = (u: SessionUser) => {
    setUser(u);
    try {
      localStorage.setItem("neuro_user", JSON.stringify(u));
    } catch {}
  };
  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem("neuro_user");
    } catch {}
  };

  return (
    <div className="min-h-screen text-foreground">
      <TopNav
        onAssistant={() => setAiOpen((v) => !v)}
        onLogin={() => setLoginOpen(true)}
        onLogout={handleLogout}
        user={user}
      />
      <main>
        <Hero />
        <PlanetVitals />
        <LiveEnergyChart />
        <DataFlow />
        <ModuleGrid />
        <EmergencyAlerts />
        <LiveInsights />
        <EarthMap />
        <DeepModules />
        <RoboticsLive />
        <VRDronesModule />
        <PollutionModule />
        <RadiationModule />
        <SpacePhysics />
        <WasteModule />
        <ConnectedSystems />
        <AdvancedModules />
        <ImpactModule />
        <RoleSwitcher />
      </main>
      <Footer />
      <AIAssistant open={aiOpen} onOpenChange={setAiOpen} />
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} onLogin={handleLogin} />
    </div>
  );
}
