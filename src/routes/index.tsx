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
import { AudienceMatrix } from "@/components/neuro/AudienceMatrix";
import { EnergyHub } from "@/components/neuro/EnergyHub";
import { EnergyNetwork } from "@/components/neuro/EnergyNetwork";
import { EnergyControlCenter } from "@/components/neuro/EnergyControlCenter";
import { EnergyMarket } from "@/components/neuro/EnergyMarket";
import { EarnHub } from "@/components/neuro/EarnHub";
import { PayoutsHub } from "@/components/neuro/PayoutsHub";
import { PricingPlans } from "@/components/neuro/PricingPlans";
import { AlarmSystem } from "@/components/neuro/AlarmSystem";
import { SystemHealth } from "@/components/neuro/SystemHealth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEUROLINK EARTH — Operating System for a Smarter Planet" },
      { name: "description", content: "AI-powered planetary OS unifying energy, environment, robotics, telecom and public safety. Live sign-in, real NEURO AI, global energy network." },
      { property: "og:title", content: "NEUROLINK EARTH" },
      { property: "og:description", content: "Live Earth-OS with real authentication, AI assistant and global energy infrastructure links." },
      { name: "google-site-verification", content: "2qZBmXfmz-7ppKq_VzLhvL8b0ZYC-tRGbc74rqQS1As" },
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
    let mounted = true;

    const loadProfile = async (uid: string, email: string | null | undefined) => {
      const { data } = await supabase.from("profiles").select("role").eq("id", uid).maybeSingle();
      if (!mounted) return;
      setUser({ email: email ?? "", role: data?.role ?? "Personal" });
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        loadProfile(session.user.id, session.user.email);
      } else {
        setUser(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadProfile(session.user.id, session.user.email);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
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
        <DataFlow />
        <AudienceMatrix />
        <ModuleGrid />
        <section id="energy"><EnergyHub /></section>
        <EnergyControlCenter />
        <EnergyMarket />
        <EnergyNetwork />
        <LiveEnergyChart />
        <section id="robotics"><RoboticsLive /></section>
        <VRDronesModule />
        <section id="environment"><PollutionModule /></section>
        <RadiationModule />
        <SpacePhysics />
        <section id="alerts"><EmergencyAlerts /></section>
        <EarthMap />
        <section id="waste"><WasteModule /></section>
        <DeepModules />
        <section id="analytics"><LiveInsights /></section>
        <ConnectedSystems />
        <SystemHealth />
        <AdvancedModules />
        <ImpactModule />
        <EarnHub />
        <PayoutsHub />
        <PricingPlans />
        <RoleSwitcher />
      </main>
      <Footer />
      <AIAssistant open={aiOpen} onOpenChange={setAiOpen} />
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <AlarmSystem />
    </div>
  );
}
