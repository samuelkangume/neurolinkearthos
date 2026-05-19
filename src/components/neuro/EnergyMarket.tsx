import { useEffect, useState } from "react";
import { Coins, Home, Building2, Zap, ArrowRightLeft, ShieldCheck, Wallet } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { toast } from "sonner";

type Offer = { id: string; seller: string; type: "home" | "gov"; kwh: number; price: number; loc: string };

const FEED: Offer[] = [
  { id: "OF-1042", seller: "Home #N-3841", type: "home", kwh: 12.4, price: 0.08, loc: "Kampala · UG" },
  { id: "OF-1041", seller: "Solar Co-op #44", type: "home", kwh: 142, price: 0.07, loc: "Madrid · ES" },
  { id: "OF-1040", seller: "City of Oslo", type: "gov", kwh: 8400, price: 0.06, loc: "Oslo · NO" },
  { id: "OF-1039", seller: "Home #B-2014", type: "home", kwh: 6.8, price: 0.09, loc: "Austin · US" },
  { id: "OF-1038", seller: "Smart City Dubai", type: "gov", kwh: 24200, price: 0.05, loc: "Dubai · AE" },
];

export function EnergyMarket() {
  const [side, setSide] = useState<"sell" | "buy">("sell");
  const [audience, setAudience] = useState<"home" | "gov">("home");
  const [kwh, setKwh] = useState(10);
  const [price, setPrice] = useState(0.08);
  const [wallet, setWallet] = useState(284.42);
  const [feed, setFeed] = useState(FEED);

  useEffect(() => {
    const t = setInterval(() => {
      setFeed((f) => {
        const next = [...f];
        const i = Math.floor(Math.random() * next.length);
        next[i] = { ...next[i], kwh: Math.max(1, next[i].kwh + (Math.random() - 0.5) * 4) };
        return next;
      });
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const total = (kwh * price).toFixed(2);

  const submit = () => {
    if (side === "sell") {
      setWallet((w) => +(w + kwh * price * 0.98).toFixed(2));
      toast.success(`Listed ${kwh} kWh @ $${price.toFixed(2)} on NEURO-Chain · settled to ${audience === "home" ? "neighbours" : "smart-city pool"}`);
    } else {
      setWallet((w) => +(w - kwh * price).toFixed(2));
      toast.success(`Bought ${kwh} kWh @ $${price.toFixed(2)} · delivery routed via local microgrid`);
    }
  };

  return (
    <section id="market" className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <SectionHeader
        eyebrow="06 · Market"
        title="Sell Unwanted Energy · Blockchain Marketplace"
        desc="Households, solar co-ops, farms and entire cities can list surplus power on NEURO-Chain. Smart contracts auto-route kWh to homes that need heat or to governments powering smart-city loads."
        right={
          <div className="px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-[11px] font-mono text-glow-green flex items-center gap-1.5">
            <Wallet className="h-3 w-3" /> ${wallet.toFixed(2)} NEURO
          </div>
        }
      />

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Trade panel */}
        <div className="glass p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Coins className="h-4 w-4 text-glow-green" />
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {side === "sell" ? "List surplus" : "Buy energy"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {(["sell", "buy"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                className={`h-9 rounded-lg text-xs font-medium border ${
                  side === s
                    ? "bg-primary/20 border-primary/50 text-glow-cyan"
                    : "bg-white/[0.04] border-border text-muted-foreground"
                }`}
              >
                {s === "sell" ? "Sell" : "Buy"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => setAudience("home")}
              className={`h-12 rounded-lg text-xs flex items-center justify-center gap-2 border ${
                audience === "home"
                  ? "bg-secondary/15 border-secondary/40 text-glow-green"
                  : "bg-white/[0.04] border-border text-muted-foreground"
              }`}
            >
              <Home className="h-3.5 w-3.5" /> Local homes
            </button>
            <button
              onClick={() => setAudience("gov")}
              className={`h-12 rounded-lg text-xs flex items-center justify-center gap-2 border ${
                audience === "gov"
                  ? "bg-secondary/15 border-secondary/40 text-glow-green"
                  : "bg-white/[0.04] border-border text-muted-foreground"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" /> Smart cities
            </button>
          </div>

          <label className="block text-[10px] font-mono uppercase text-muted-foreground mt-3">
            Energy (kWh) · {kwh}
          </label>
          <input
            type="range"
            min={1}
            max={1000}
            value={kwh}
            onChange={(e) => setKwh(Number(e.target.value))}
            className="w-full accent-[var(--green-glow)]"
          />

          <label className="block text-[10px] font-mono uppercase text-muted-foreground mt-3">
            Price per kWh ($) · {price.toFixed(2)}
          </label>
          <input
            type="range"
            min={0.02}
            max={0.25}
            step={0.01}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-[var(--cyan-glow)]"
          />

          <div className="mt-4 rounded-xl p-3 bg-white/[0.04] border border-border flex items-center justify-between">
            <div className="text-[11px] text-muted-foreground">Order total</div>
            <div className="font-display text-lg font-semibold text-glow-green">${total}</div>
          </div>

          <button
            onClick={submit}
            className="mt-3 w-full h-11 rounded-xl bg-gradient-to-r from-[var(--cyan-glow)] to-[var(--green-glow)] text-[var(--primary-foreground)] text-sm font-semibold flex items-center justify-center gap-2"
          >
            <ArrowRightLeft className="h-4 w-4" />
            {side === "sell" ? "List on NEURO-Chain" : "Buy & route via microgrid"}
          </button>

          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-glow-green" /> Smart-contract settled · 2% network fee
          </div>
        </div>

        {/* Live order book */}
        <div className="glass p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-glow-cyan" />
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Live order book
              </div>
            </div>
            <div className="text-[10px] font-mono text-glow-green flex items-center gap-1.5">
              <span className="status-dot" /> 12,840 active offers
            </div>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {feed.map((o) => (
              <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-border text-xs">
                <div
                  className={`h-8 w-8 rounded-lg grid place-items-center ${
                    o.type === "home"
                      ? "bg-secondary/15 text-glow-green"
                      : "bg-primary/15 text-glow-cyan"
                  }`}
                >
                  {o.type === "home" ? <Home className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{o.seller}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">
                    {o.id} · {o.loc} · {o.type === "home" ? "P2P" : "civic pool"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-glow-cyan">{o.kwh.toFixed(1)} kWh</div>
                  <div className="text-[10px] font-mono text-glow-green">${o.price.toFixed(2)}/kWh</div>
                </div>
                <button
                  onClick={() => {
                    setWallet((w) => +(w - o.kwh * o.price).toFixed(2));
                    toast.success(`Bought ${o.kwh.toFixed(1)} kWh from ${o.seller}`);
                  }}
                  className="text-[10px] font-mono px-2 py-1 rounded-md bg-primary/15 border border-primary/40 text-glow-cyan hover:bg-primary/25"
                >
                  BUY
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
