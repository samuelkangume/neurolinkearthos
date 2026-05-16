import { ExternalLink, Sun, Wind, Waves, Atom, Fuel, Zap, Building2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

type Site = { name: string; loc: string; type: string; cap: string; url: string; icon: any; tone: "cyan" | "green" | "warn" };

const SITES: Site[] = [
  { name: "Three Gorges Dam", loc: "Hubei, China", type: "Hydro", cap: "22.5 GW", url: "https://en.wikipedia.org/wiki/Three_Gorges_Dam", icon: Waves, tone: "cyan" },
  { name: "Itaipu Dam", loc: "Brazil / Paraguay", type: "Hydro", cap: "14 GW", url: "https://en.wikipedia.org/wiki/Itaipu_Dam", icon: Waves, tone: "cyan" },
  { name: "Hoover Dam", loc: "Nevada, USA", type: "Hydro", cap: "2.08 GW", url: "https://www.usbr.gov/lc/hooverdam/", icon: Waves, tone: "cyan" },
  { name: "Bhadla Solar Park", loc: "Rajasthan, India", type: "Solar", cap: "2.25 GW", url: "https://en.wikipedia.org/wiki/Bhadla_Solar_Park", icon: Sun, tone: "green" },
  { name: "Noor Abu Dhabi", loc: "UAE", type: "Solar", cap: "1.18 GW", url: "https://en.wikipedia.org/wiki/Noor_Abu_Dhabi", icon: Sun, tone: "green" },
  { name: "Hornsea Wind Farm", loc: "North Sea, UK", type: "Offshore Wind", cap: "1.32 GW", url: "https://orsted.com/en/what-we-do/renewable-energy-solutions/offshore-wind/hornsea-projects", icon: Wind, tone: "cyan" },
  { name: "Gansu Wind Farm", loc: "Gansu, China", type: "Onshore Wind", cap: "20 GW", url: "https://en.wikipedia.org/wiki/Gansu_Wind_Farm", icon: Wind, tone: "cyan" },
  { name: "Kashiwazaki-Kariwa", loc: "Niigata, Japan", type: "Nuclear", cap: "7.97 GW", url: "https://www.tepco.co.jp/en/hd/about/overview/power-stations/nuclear-e.html", icon: Atom, tone: "green" },
  { name: "Bruce Nuclear", loc: "Ontario, Canada", type: "Nuclear", cap: "6.43 GW", url: "https://www.brucepower.com/", icon: Atom, tone: "green" },
  { name: "Ghawar Oil Field", loc: "Saudi Arabia", type: "Oil", cap: "3.8 Mbpd", url: "https://en.wikipedia.org/wiki/Ghawar_Field", icon: Fuel, tone: "warn" },
  { name: "Permian Basin", loc: "Texas, USA", type: "Oil & Gas", cap: "6.2 Mbpd", url: "https://www.eia.gov/petroleum/drilling/", icon: Fuel, tone: "warn" },
  { name: "ITER Fusion", loc: "Cadarache, France", type: "Fusion (R&D)", cap: "500 MW target", url: "https://www.iter.org/", icon: Zap, tone: "green" },
];

type Company = { name: string; focus: string; url: string };
const COMPANIES: Company[] = [
  { name: "Tesla Energy", focus: "Solar · Megapack · VPP", url: "https://www.tesla.com/energy" },
  { name: "Ørsted", focus: "Offshore wind leader", url: "https://orsted.com/" },
  { name: "Vestas", focus: "Wind turbines", url: "https://www.vestas.com/" },
  { name: "Siemens Energy", focus: "Grid · turbines · H₂", url: "https://www.siemens-energy.com/" },
  { name: "NextEra Energy", focus: "US renewables giant", url: "https://www.nexteraenergy.com/" },
  { name: "Iberdrola", focus: "Wind · solar · grids", url: "https://www.iberdrola.com/" },
  { name: "EDF", focus: "Nuclear & renewables", url: "https://www.edf.fr/en" },
  { name: "First Solar", focus: "Thin-film PV", url: "https://www.firstsolar.com/" },
  { name: "Enphase Energy", focus: "Solar microinverters", url: "https://enphase.com/" },
  { name: "SunPower", focus: "Residential solar", url: "https://us.sunpower.com/" },
  { name: "Fluence", focus: "Battery storage", url: "https://www.fluenceenergy.com/" },
  { name: "BYD Energy", focus: "Storage · EV · solar", url: "https://www.bydenergy.com/" },
  { name: "Saudi Aramco", focus: "Oil & gas major", url: "https://www.aramco.com/" },
  { name: "Shell", focus: "Energy transition", url: "https://www.shell.com/" },
  { name: "BP", focus: "Oil → renewables", url: "https://www.bp.com/" },
  { name: "TotalEnergies", focus: "Multi-energy", url: "https://totalenergies.com/" },
  { name: "China Three Gorges Corp", focus: "Hydro & clean power", url: "https://www.ctg.com.cn/en/" },
  { name: "GE Vernova", focus: "Power · grid · wind", url: "https://www.gevernova.com/" },
  { name: "IRENA", focus: "Intl. Renewable Agency", url: "https://www.irena.org/" },
  { name: "IEA", focus: "Intl. Energy Agency", url: "https://www.iea.org/" },
];

const toneCls = (t: Site["tone"]) =>
  t === "green" ? "bg-secondary/15 text-glow-green" : t === "warn" ? "bg-[oklch(0.82_0.18_80/0.15)] text-[var(--warn)]" : "bg-primary/15 text-glow-cyan";

export function EnergyNetwork() {
  return (
    <section id="energy-network" className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <SectionHeader
        eyebrow="05 · Global Network"
        title="Live Energy Sites & Partners"
        desc="Direct links to real-world energy infrastructure and the companies powering them. NEUROLINK ingests public telemetry feeds from each."
        right={
          <a
            href="https://www.iea.org/data-and-statistics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-glow-cyan hover:underline flex items-center gap-1"
          >
            IEA data <ExternalLink className="h-3 w-3" />
          </a>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {SITES.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover p-4 block group"
          >
            <div className="flex items-start justify-between">
              <div className={`h-9 w-9 rounded-xl grid place-items-center ${toneCls(s.tone)}`}>
                <s.icon className="h-4 w-4" />
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-glow-cyan transition-colors" />
            </div>
            <div className="mt-3 font-display text-sm font-semibold leading-tight">{s.name}</div>
            <div className="text-[11px] text-muted-foreground">{s.loc}</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-border">{s.type}</span>
              <span className="text-[11px] font-mono text-glow-cyan">{s.cap}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 glass p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-glow-green">Linked partners</div>
            <div className="font-display text-lg font-semibold mt-1 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-glow-cyan" /> Energy companies & agencies
            </div>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground hidden md:block">
            {COMPANIES.length} live integrations
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {COMPANIES.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-3 bg-white/[0.03] border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors flex items-center justify-between gap-2 group"
            >
              <div className="min-w-0">
                <div className="text-xs font-medium truncate">{c.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">{c.focus}</div>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-glow-cyan shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
