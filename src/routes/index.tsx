import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopNav } from "@/components/neuro/TopNav";
import { Hero } from "@/components/neuro/Hero";
import { ModuleGrid } from "@/components/neuro/ModuleGrid";
import { LiveInsights } from "@/components/neuro/LiveInsights";
import { EarthMap } from "@/components/neuro/EarthMap";
import { ConnectedSystems } from "@/components/neuro/ConnectedSystems";
import { DeepModules } from "@/components/neuro/DeepModules";
import { AdvancedModules } from "@/components/neuro/AdvancedModules";
import { RoleSwitcher } from "@/components/neuro/RoleSwitcher";
import { AIAssistant } from "@/components/neuro/AIAssistant";
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

function Index() {
  const [aiOpen, setAiOpen] = useState(false);
  return (
    <div className="min-h-screen text-foreground">
      <TopNav onAssistant={() => setAiOpen((v) => !v)} />
      <main>
        <Hero />
        <ModuleGrid />
        <LiveInsights />
        <EarthMap />
        <DeepModules />
        <ConnectedSystems />
        <AdvancedModules />
        <RoleSwitcher />
      </main>
      <Footer />
      <AIAssistant open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  );
}
