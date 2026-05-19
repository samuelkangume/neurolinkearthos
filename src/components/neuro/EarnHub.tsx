import { Coins, Sun, Leaf, Cpu, Database, Bot, Camera, Globe2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const WAYS = [
  { icon: Sun, title: "Sell surplus solar", sub: "Households earn $40–$320/month routing rooftop kWh to neighbours.", tone: "green" },
  { icon: Leaf, title: "Carbon credit yield", sub: "Auto-tokenise verified offsets — sell on NEURO-Chain to ESG buyers.", tone: "green" },
  { icon: Database, title: "Lease sensor data", sub: "Air, soil, water and traffic feeds rented to researchers & cities.", tone: "cyan" },
  { icon: Cpu, title: "Idle compute rental", sub: "Spare device cycles power the NEURO AI mesh — earn per teraflop.", tone: "cyan" },
  { icon: Bot, title: "Operate agri/cleanup bots", sub: "Run drones & ground robots for farms, parks, ports — paid per task.", tone: "green" },
  { icon: Camera, title: "Citizen reporting", sub: "Verified pollution, hazard or wildlife reports earn micro-bounties.", tone: "cyan" },
  { icon: Globe2, title: "Smart-city contracts", sub: "Governments auto-bid for your battery, EV or generator at peak load.", tone: "green" },
  { icon: Coins, title: "Stake NEURO-Chain", sub: "Validate green-energy settlements · current APY 6.2%.", tone: "cyan" },
];

export function EarnHub() {
  return (
    <section id="earn" className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <SectionHeader
        eyebrow="11 · Earn"
        title="Ways you can earn on NEUROLINK EARTH"
        desc="The platform turns your data, energy, attention and hardware into income — built for individuals, farmers, organisations and cities alike."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {WAYS.map((w) => (
          <div key={w.title} className="glass glass-hover p-5">
            <div
              className={`h-10 w-10 rounded-xl grid place-items-center ${
                w.tone === "green" ? "bg-secondary/15 text-glow-green" : "bg-primary/15 text-glow-cyan"
              }`}
            >
              <w.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 font-display text-base font-semibold">{w.title}</div>
            <div className="text-xs text-muted-foreground mt-1.5">{w.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
