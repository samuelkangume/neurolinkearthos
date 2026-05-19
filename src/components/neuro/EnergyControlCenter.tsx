import { useState } from "react";
import { Power, Sliders, Gauge, Leaf, ChevronRight, Download } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { toast } from "sonner";

type Zone = { id: string; name: string; load: number; auto: boolean; on: boolean };

const INITIAL: Zone[] = [
  { id: "z1", name: "North America Grid", load: 72, auto: true, on: true },
  { id: "z2", name: "EU Renewable Mesh", load: 64, auto: true, on: true },
  { id: "z3", name: "APAC Solar Farms", load: 81, auto: true, on: true },
  { id: "z4", name: "Africa Microgrids", load: 48, auto: false, on: true },
  { id: "z5", name: "LatAm Hydro Loop", load: 56, auto: true, on: true },
  { id: "z6", name: "Orbital Solar L2", load: 34, auto: false, on: false },
];

const LEDGER = [
  { source: "Solar farms", offset: 124.8, credits: 4820, value: "$ 1.42M" },
  { source: "Wind turbines", offset: 84.2, credits: 3120, value: "$ 0.92M" },
  { source: "Hydro plants", offset: 41.6, credits: 1840, value: "$ 0.54M" },
  { source: "Reforestation AI", offset: 21.4, credits: 980, value: "$ 0.29M" },
  { source: "Carbon capture", offset: 12.1, credits: 612, value: "$ 0.18M" },
];

export function EnergyControlCenter() {
  const [zones, setZones] = useState(INITIAL);
  const [open, setOpen] = useState<string | null>(null);

  const toggleZone = (id: string) => {
    setZones((zs) => zs.map((z) => (z.id === id ? { ...z, on: !z.on } : z)));
    const z = zones.find((x) => x.id === id);
    toast.success(`${z?.name} ${z?.on ? "powered down" : "online"}`);
  };

  const toggleAuto = (id: string) => {
    setZones((zs) => zs.map((z) => (z.id === id ? { ...z, auto: !z.auto } : z)));
  };

  const setLoad = (id: string, v: number) => {
    setZones((zs) => zs.map((z) => (z.id === id ? { ...z, load: v } : z)));
  };

  const totalOffset = LEDGER.reduce((s, r) => s + r.offset, 0);

  const exportLedger = () => {
    const csv = [
      "source,offset_mt,credits,value",
      ...LEDGER.map((r) => `${r.source},${r.offset},${r.credits},${r.value}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `carbon-ledger-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Carbon ledger exported");
  };

  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <SectionHeader
        eyebrow="05 · Control"
        title="Energy Control Center · Carbon Ledger"
        desc="Operator-grade controls for every grid zone with AI auto-balancing override, plus a drill-down on every tonne of CO₂ offset and traded."
      />

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Control center */}
        <div className="glass p-6 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="h-4 w-4 text-glow-cyan" />
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Live grid controls
            </div>
          </div>

          <div className="space-y-3">
            {zones.map((z) => (
              <div key={z.id} className="rounded-xl p-4 bg-white/[0.03] border border-border">
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => toggleZone(z.id)}
                    className={`h-9 w-9 rounded-lg grid place-items-center border transition ${
                      z.on
                        ? "bg-secondary/15 border-secondary/40 text-glow-green"
                        : "bg-destructive/15 border-destructive/40 text-destructive"
                    }`}
                    aria-label="Toggle zone"
                  >
                    <Power className="h-4 w-4" />
                  </button>
                  <div className="flex-1 min-w-[140px]">
                    <div className="text-sm font-medium">{z.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      {z.on ? "ONLINE" : "OFFLINE"} · {z.auto ? "AI auto" : "manual"}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-glow-cyan w-12 text-right">{z.load}%</div>
                  <button
                    onClick={() => toggleAuto(z.id)}
                    className={`text-[10px] font-mono px-2 py-1 rounded-md border ${
                      z.auto
                        ? "bg-primary/15 border-primary/40 text-glow-cyan"
                        : "bg-white/[0.04] border-border text-muted-foreground"
                    }`}
                  >
                    {z.auto ? "AUTO" : "MANUAL"}
                  </button>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={z.load}
                  disabled={!z.on || z.auto}
                  onChange={(e) => setLoad(z.id, Number(e.target.value))}
                  className="mt-3 w-full accent-[var(--cyan-glow)] disabled:opacity-40"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carbon ledger drill-down */}
        <div className="glass p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-glow-green" />
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Carbon ledger · on-chain
              </div>
            </div>
            <button
              onClick={exportLedger}
              className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/[0.04] border border-border flex items-center gap-1 hover:bg-white/[0.08]"
            >
              <Download className="h-3 w-3" /> CSV
            </button>
          </div>

          <div className="rounded-xl p-4 bg-secondary/5 border border-secondary/20 mb-3">
            <div className="text-[10px] font-mono uppercase text-glow-green">Total verified offset</div>
            <div className="font-display text-3xl font-bold text-glow-green mt-1">
              {totalOffset.toFixed(1)} Mt
            </div>
            <div className="text-[10px] font-mono text-muted-foreground">
              CO₂e · settled across 11,372 credits
            </div>
          </div>

          <div className="space-y-1.5">
            {LEDGER.map((r) => {
              const isOpen = open === r.source;
              return (
                <div key={r.source} className="rounded-lg bg-white/[0.03] border border-border overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : r.source)}
                    className="w-full flex items-center gap-2 p-3 text-left hover:bg-white/[0.05]"
                  >
                    <ChevronRight className={`h-3.5 w-3.5 transition ${isOpen ? "rotate-90" : ""}`} />
                    <div className="flex-1 text-xs">{r.source}</div>
                    <div className="text-xs font-mono text-glow-green">{r.offset} Mt</div>
                    <div className="text-[10px] font-mono text-muted-foreground w-16 text-right">{r.value}</div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3 text-[11px] text-muted-foreground space-y-1 font-mono">
                      <div>· Credits issued: {r.credits.toLocaleString()}</div>
                      <div>· Avg price: ${(parseFloat(r.value.replace(/[^0-9.]/g, "")) * 1e6 / r.credits).toFixed(2)}/credit</div>
                      <div>· Verifier: Verra · Gold Standard</div>
                      <div>· Settlement: NEURO-Chain block #18,422,{Math.floor(Math.random() * 900) + 100}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            <Gauge className="h-3 w-3" /> Live · auto-reconciled every 60s
          </div>
        </div>
      </div>
    </section>
  );
}
