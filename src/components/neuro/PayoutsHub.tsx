import { useState } from "react";
import { Wallet, ArrowDownToLine, Coins, Building2, Landmark, CreditCard, CheckCircle2, Clock, X, Shield, TrendingUp } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { toast } from "sonner";

type Tx = {
  id: string;
  type: "earn" | "payout" | "stake" | "reward";
  source: string;
  amount: number;
  status: "settled" | "pending" | "processing";
  ts: string;
};

const TX: Tx[] = [
  { id: "TX-9281", type: "earn", source: "Surplus Solar → Grid", amount: 42.18, status: "settled", ts: "2m ago" },
  { id: "TX-9280", type: "reward", source: "NEURO-Chain Stake APY", amount: 6.42, status: "settled", ts: "1h ago" },
  { id: "TX-9279", type: "earn", source: "Air Sensor Lease · Lagos", amount: 18.90, status: "settled", ts: "3h ago" },
  { id: "TX-9278", type: "payout", source: "Withdraw → Stripe (Visa ••4421)", amount: -120.00, status: "processing", ts: "5h ago" },
  { id: "TX-9277", type: "earn", source: "Drone Cleanup · Mombasa Port", amount: 64.00, status: "settled", ts: "8h ago" },
  { id: "TX-9276", type: "stake", source: "Stake +500 NEURO", amount: -500.00, status: "settled", ts: "1d ago" },
  { id: "TX-9275", type: "earn", source: "Carbon Credit Sale · ESG Buyer", amount: 212.50, status: "settled", ts: "1d ago" },
  { id: "TX-9274", type: "payout", source: "Withdraw → M-Pesa", amount: -75.00, status: "settled", ts: "2d ago" },
];

const METHODS = [
  { id: "stripe", label: "Stripe", desc: "Bank · cards · global", icon: CreditCard, fee: "1.5%" },
  { id: "paypal", label: "PayPal", desc: "Wallet · 200+ countries", icon: Wallet, fee: "2.0%" },
  { id: "lemon", label: "Lemon Squeezy", desc: "Creator payouts · MoR", icon: Coins, fee: "2.5%" },
  { id: "mpesa", label: "M-Pesa / Mobile Money", desc: "Local · East Africa", icon: Landmark, fee: "0.8%" },
  { id: "bank", label: "Bank / SWIFT", desc: "Cities · governments", icon: Building2, fee: "0.5%" },
];

export function PayoutsHub() {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState("stripe");
  const [amount, setAmount] = useState("120.00");
  const [confirming, setConfirming] = useState(false);

  const balance = 1842.66;
  const staked = 500;
  const apy = 6.2;
  const monthly = (staked * apy) / 100 / 12;

  const submit = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setOpen(false);
      toast.success(`Withdrawal of $${amount} queued via ${METHODS.find((m) => m.id === method)?.label}`, {
        description: "Settles in 1–3 business days · TX ref NEURO-" + Math.floor(Math.random() * 9999),
      });
    }, 1400);
  };

  return (
    <section id="payouts" className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <SectionHeader
        eyebrow="12 · Payouts"
        title="Wallet, staking & withdrawals"
        desc="Cash out your earnings to any payment rail. Local users, farmers, organisations and smart cities all settle through the same NEURO-Chain ledger."
        right={
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 border border-primary/40 text-glow-cyan text-sm font-medium hover:animate-glow"
          >
            <ArrowDownToLine className="h-4 w-4" /> Withdraw funds
          </button>
        }
      />

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="glass p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Available balance</div>
          <div className="font-display text-3xl mt-2 text-glow-cyan">${balance.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">USD · auto-converted from NEURO</div>
          <div className="mt-3 flex gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/15 text-glow-green">+$84.50 today</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-muted-foreground">7 sources</span>
          </div>
        </div>

        <div className="glass p-5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Staking rewards</div>
            <TrendingUp className="h-4 w-4 text-glow-green" />
          </div>
          <div className="font-display text-3xl mt-2 text-glow-green">{apy}% APY</div>
          <div className="text-xs text-muted-foreground mt-1">{staked} NEURO staked · ${monthly.toFixed(2)}/mo projected</div>
          <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-secondary to-primary" />
          </div>
          <div className="text-[10px] font-mono text-muted-foreground mt-2">Next reward drop · 06:14:22</div>
        </div>

        <div className="glass p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Payout method</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/15 grid place-items-center text-glow-cyan">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-base">Stripe · Visa ••4421</div>
              <div className="text-xs text-muted-foreground">Default · 1–3 business days</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mt-4 w-full h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-border text-xs font-medium"
          >
            Change method
          </button>
        </div>
      </div>

      <div className="glass p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="font-display text-base">Transaction history</div>
          <div className="flex gap-1 text-[10px] font-mono">
            {["All", "Earnings", "Payouts", "Staking"].map((t, i) => (
              <button
                key={t}
                className={`px-2.5 py-1 rounded ${i === 0 ? "bg-primary/15 text-glow-cyan" : "bg-white/5 text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-border/40">
          {TX.map((t) => (
            <div key={t.id} className="flex items-center gap-3 py-3">
              <div
                className={`h-8 w-8 rounded-lg grid place-items-center text-xs ${
                  t.amount >= 0 ? "bg-secondary/15 text-glow-green" : "bg-primary/15 text-glow-cyan"
                }`}
              >
                {t.amount >= 0 ? "+" : "−"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{t.source}</div>
                <div className="text-[10px] font-mono text-muted-foreground">{t.id} · {t.ts}</div>
              </div>
              <div className={`text-sm font-mono ${t.amount >= 0 ? "text-glow-green" : "text-foreground"}`}>
                {t.amount >= 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono w-24 justify-end">
                {t.status === "settled" ? (
                  <><CheckCircle2 className="h-3 w-3 text-glow-green" /> Settled</>
                ) : (
                  <><Clock className="h-3 w-3 text-glow-cyan" /> {t.status}</>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-md p-4" onClick={() => !confirming && setOpen(false)}>
          <div className="glass neon-border w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-lg bg-white/5 hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-glow-cyan">Withdraw</div>
            <h3 className="font-display text-2xl mt-1">Confirm withdrawal</h3>
            <p className="text-xs text-muted-foreground mt-1">Funds settle on the NEURO-Chain ledger and route to your chosen payout rail.</p>

            <label className="block mt-5 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Amount (USD)</label>
            <div className="mt-2 flex items-center gap-2 h-12 px-3 rounded-xl bg-white/5 border border-border">
              <span className="text-muted-foreground">$</span>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent outline-none font-display text-xl"
              />
              <button onClick={() => setAmount(balance.toFixed(2))} className="text-[10px] font-mono px-2 py-1 rounded bg-primary/15 text-glow-cyan">MAX</button>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground mt-1">Available · ${balance.toLocaleString()}</div>

            <div className="mt-5 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Payout method</div>
            <div className="mt-2 grid grid-cols-1 gap-2 max-h-56 overflow-auto pr-1">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${
                    method === m.id ? "border-primary/50 bg-primary/10" : "border-border/60 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <m.icon className="h-4 w-4 text-glow-cyan" />
                  <div className="flex-1">
                    <div className="text-sm">{m.label}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">{m.desc}</div>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">fee {m.fee}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-white/5 border border-border/60">
              <Shield className="h-4 w-4 text-glow-green shrink-0 mt-0.5" />
              <div className="text-[11px] text-muted-foreground">
                Multi-sig protected · zero-knowledge proof of balance. Smart-city accounts require 2/3 signer approval above $10,000.
              </div>
            </div>

            <button
              onClick={submit}
              disabled={confirming}
              className="mt-5 w-full h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-background font-display font-semibold disabled:opacity-60"
            >
              {confirming ? "Confirming on NEURO-Chain…" : `Confirm withdrawal of $${amount}`}
            </button>
            <div className="text-[10px] font-mono text-muted-foreground text-center mt-2">
              By confirming you accept the NEUROLINK Payouts Terms · Fee preview shown above.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
