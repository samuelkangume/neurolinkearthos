import { Check, Sparkles, Building2, Rocket, Crown, Coins, CreditCard, Wallet, Globe2, Zap, Brain, Bot } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const TIERS = [
  {
    name: "Citizen",
    price: "Free",
    sub: "Forever · Freemium core",
    tone: "border-border/60",
    cta: "Start free",
    features: [
      "Personal dashboard + 3 sensors",
      "Basic NEURO AI · 50 prompts/mo",
      "Sell surplus solar locally",
      "Community alerts (air/water/quake)",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    sub: "/month · for power users & farmers",
    tone: "border-primary/50 bg-primary/5",
    badge: "Most popular",
    cta: "Upgrade to Pro",
    features: [
      "Unlimited sensors + robotics fleet",
      "NEURO AI Pro · GPT-5 / Gemini 3 Pro",
      "Carbon ledger + verified offsets",
      "Priority payouts (1-day Stripe)",
      "VR + ground drone control",
    ],
  },
  {
    name: "Organisation",
    price: "$299",
    sub: "/month · per site · teams & NGOs",
    tone: "border-secondary/50 bg-secondary/5",
    cta: "Start org trial",
    features: [
      "Multi-site, team roles & SSO",
      "Energy Control Center + auto-grid",
      "API + webhook access",
      "Custom alerts & SLA support",
      "Branded citizen portal",
    ],
  },
  {
    name: "Smart City / Defense",
    price: "Custom",
    sub: "Governments · utilities · space",
    tone: "border-glow-cyan/40 bg-white/[0.03]",
    cta: "Talk to sales",
    features: [
      "Full Earth-OS deployment",
      "Disaster command + radiation grid",
      "Private NEURO-Chain settlement",
      "On-prem / sovereign cloud",
      "24/7 mission control",
    ],
  },
];

const RAILS = [
  { label: "Stripe", icon: CreditCard },
  { label: "Lemon Squeezy", icon: Coins },
  { label: "PayPal", icon: Wallet },
  { label: "Apple Pay", icon: Sparkles },
  { label: "Google Pay", icon: Globe2 },
  { label: "Crypto · USDC", icon: Zap },
  { label: "M-Pesa", icon: Building2 },
  { label: "SEPA / SWIFT", icon: Building2 },
];

const REVENUE = [
  { icon: Crown, title: "Subscription tiers", sub: "Pro $19 · Org $299 · City contracts $50k–$2M/yr" },
  { icon: Coins, title: "Transaction fees", sub: "0.8% on every energy & carbon trade on NEURO-Chain" },
  { icon: Wallet, title: "Payout rail spread", sub: "0.3% margin on Stripe / PayPal / Lemon withdrawals" },
  { icon: Bot, title: "Robot & drone marketplace", sub: "15% commission on every cleanup, agri & inspection task" },
  { icon: Brain, title: "NEURO AI compute", sub: "Per-token pricing above free tier · resold via Lovable AI" },
  { icon: Building2, title: "Government licensing", sub: "Per-citizen smart-city licenses · multi-year contracts" },
  { icon: Rocket, title: "Data marketplace", sub: "20% take rate on sensor data sold to researchers" },
  { icon: Sparkles, title: "Premium add-ons", sub: "VR headsets, hybrid drones, branded portals, white-label" },
  { icon: Globe2, title: "Carbon credit issuance", sub: "$1–$3 origination fee per verified tonne minted" },
  { icon: Zap, title: "Staking validator yield", sub: "Founder validator earns 1.5% of network APY pool" },
  { icon: Coins, title: "Affiliate / partner cuts", sub: "Revenue share from Tesla Energy, Ørsted, ITER & 20+ partners" },
  { icon: CreditCard, title: "Enterprise API metering", sub: "$0.002 per call above 1M/mo · usage-based billing" },
];

export function PricingPlans() {
  return (
    <section id="pricing" className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <SectionHeader
        eyebrow="13 · Plans & Monetisation"
        title="Freemium for the world. Premium for the serious."
        desc="Start free as a citizen, scale up as a farm, organisation or smart city. Every plan unlocks deeper Earth-OS capabilities and connects to the global payout network."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIERS.map((t) => (
          <div key={t.name} className={`glass glass-hover p-5 border ${t.tone} relative`}>
            {t.badge && (
              <div className="absolute -top-2 left-5 text-[10px] font-mono px-2 py-0.5 rounded bg-primary text-background tracking-widest">
                {t.badge}
              </div>
            )}
            <div className="font-display text-lg">{t.name}</div>
            <div className="mt-2 flex items-baseline gap-1">
              <div className="font-display text-3xl text-glow-cyan">{t.price}</div>
            </div>
            <div className="text-xs text-muted-foreground">{t.sub}</div>
            <ul className="mt-4 space-y-2">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check className="h-3.5 w-3.5 text-glow-green shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <button className="mt-5 w-full h-10 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-glow-cyan text-xs font-medium hover:animate-glow">
              {t.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 glass p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-glow-cyan">Accepted globally</div>
            <div className="font-display text-base mt-1">Pay with anything. Get paid in anything.</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {RAILS.map((r) => (
              <div key={r.label} className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/5 border border-border/60 text-xs">
                <r.icon className="h-3.5 w-3.5 text-glow-cyan" /> {r.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-glow-green mb-2">Founder Revenue Engine</div>
        <h3 className="font-display text-xl md:text-2xl font-semibold">12 compounding income streams</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Every user — free or paid — generates value across the platform. The NEUROLINK economy is designed so the operator earns from subscriptions, transactions, data, hardware and infrastructure simultaneously.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
          {REVENUE.map((r) => (
            <div key={r.title} className="glass glass-hover p-4 flex gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/15 grid place-items-center text-glow-cyan shrink-0">
                <r.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-sm">{r.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
