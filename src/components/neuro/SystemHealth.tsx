import { useEffect, useState } from "react";
import {
  Activity, ShieldCheck, KeyRound, FlaskConical, CheckCircle2, AlertTriangle, Clock, Loader2,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

type Service = { name: string; latency: number; status: "ok" | "warn" | "down" };
const SERVICES: Service[] = [
  { name: "NEURO Core AI", latency: 18, status: "ok" },
  { name: "Cloud Mesh (Tier-1)", latency: 24, status: "ok" },
  { name: "Sensor Ingest Pipeline", latency: 31, status: "ok" },
  { name: "Robotics Bus", latency: 42, status: "warn" },
  { name: "Auth & Permissions", latency: 12, status: "ok" },
  { name: "Telemetry Stream", latency: 22, status: "ok" },
];

type Incident = {
  id: string; time: string; level: "info" | "warn" | "crit"; title: string; src: string;
};
const INCIDENTS: Incident[] = [
  { id: "INC-2841", time: "12:41:08", level: "warn", title: "Robotics Bus latency above 40ms threshold", src: "ops.robotics" },
  { id: "INC-2840", time: "12:32:55", level: "info", title: "Auto-failover · APAC battery cluster #14 → cluster #07", src: "energy.grid" },
  { id: "INC-2839", time: "12:18:12", level: "crit", title: "Pollution spike · Milan PM2.5 142 µg/m³ — throttling 14 plants", src: "env.air" },
  { id: "INC-2838", time: "11:54:44", level: "info", title: "Permission audit completed · 0 anomalies", src: "sec.audit" },
  { id: "INC-2837", time: "11:33:01", level: "info", title: "Smoke test 4.2.18 · all 218 checks passed", src: "ops.qa" },
  { id: "INC-2836", time: "11:02:27", level: "warn", title: "NX-077 robot battery low (18%) — dispatched to dock", src: "robotics.fleet" },
];

const PERMISSIONS = [
  { role: "Personal", scopes: ["read:home", "read:aqi", "alert:family"], count: 412034221 },
  { role: "Government", scopes: ["read:infra", "write:policy", "exec:disaster"], count: 1842 },
  { role: "Company", scopes: ["read:fleet", "write:esg", "read:carbon"], count: 28401 },
  { role: "Defense", scopes: ["mesh:encrypted", "exec:drones", "read:threat"], count: 142 },
  { role: "Global Org.", scopes: ["read:treaty", "write:carbon-mkt", "exec:coord"], count: 38 },
];

export function SystemHealth() {
  const [smoke, setSmoke] = useState<{ phase: "idle" | "running" | "done"; pass: number; total: number }>({
    phase: "idle", pass: 0, total: 218,
  });

  useEffect(() => {
    if (smoke.phase !== "running") return;
    const t = setInterval(() => {
      setSmoke((s) => {
        const next = Math.min(s.total, s.pass + Math.ceil(Math.random() * 14));
        if (next >= s.total) {
          clearInterval(t);
          return { ...s, pass: s.total, phase: "done" };
        }
        return { ...s, pass: next };
      });
    }, 120);
    return () => clearInterval(t);
  }, [smoke.phase]);

  const startSmoke = () =>
    setSmoke({ phase: "running", pass: 0, total: 218 });

  const ok = SERVICES.filter((s) => s.status === "ok").length;
  const uptimePct = ((ok / SERVICES.length) * 100).toFixed(1);

  return (
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 py-12">
      <SectionHeader
        eyebrow="08 · Operations"
        title="System Health, Audit & Smoke Tests"
        desc="Full visibility into the Earth-OS operations layer — service health, incident log, permission audit and one-tap smoke test for every connected subsystem."
        right={
          <div className="px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-[11px] font-mono text-glow-green">
            UPTIME {uptimePct}%
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Service health */}
        <div className="glass p-5 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-glow-cyan" />
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Service health
            </div>
          </div>
          <div className="space-y-2.5">
            {SERVICES.map((s) => (
              <div key={s.name} className="flex items-center gap-3 text-xs">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{
                    background:
                      s.status === "ok"
                        ? "var(--green-glow)"
                        : s.status === "warn"
                        ? "var(--warn)"
                        : "var(--danger)",
                    boxShadow: `0 0 8px ${
                      s.status === "ok" ? "var(--green-glow)" : "var(--warn)"
                    }`,
                  }}
                />
                <span className="flex-1 truncate">{s.name}</span>
                <span className="font-mono text-muted-foreground">{s.latency}ms</span>
              </div>
            ))}
          </div>
          <button
            onClick={startSmoke}
            disabled={smoke.phase === "running"}
            className="mt-5 w-full h-10 rounded-xl bg-primary/15 border border-primary/40 text-glow-cyan text-xs font-medium flex items-center justify-center gap-2 hover:bg-primary/25 disabled:opacity-60"
          >
            {smoke.phase === "running" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Running smoke test… {smoke.pass}/{smoke.total}
              </>
            ) : smoke.phase === "done" ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                {smoke.pass}/{smoke.total} checks passed · re-run
              </>
            ) : (
              <>
                <FlaskConical className="h-3.5 w-3.5" />
                Run full smoke test
              </>
            )}
          </button>
          {smoke.phase !== "idle" && (
            <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${(smoke.pass / smoke.total) * 100}%`,
                  background: "var(--gradient-glow)",
                }}
              />
            </div>
          )}
        </div>

        {/* Incident log */}
        <div className="glass p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-glow-cyan" />
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Incident log · live
              </div>
            </div>
            <div className="text-[10px] font-mono text-glow-green flex items-center gap-1.5">
              <span className="status-dot" /> streaming
            </div>
          </div>
          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {INCIDENTS.map((i) => (
              <div
                key={i.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-border text-xs"
              >
                <div
                  className={`h-7 w-7 rounded-lg grid place-items-center shrink-0 ${
                    i.level === "crit"
                      ? "bg-destructive/15 text-destructive"
                      : i.level === "warn"
                      ? "bg-[oklch(0.82_0.18_80/0.15)] text-[var(--warn)]"
                      : "bg-primary/15 text-glow-cyan"
                  }`}
                >
                  {i.level === "info" ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{i.title}</div>
                  <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                    {i.id} · {i.src} · {i.time} UTC
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Permission audit */}
      <div className="mt-5 glass p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-glow-green" />
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Permission audit
              </div>
              <div className="font-display text-base font-semibold mt-1">
                Zero-trust scopes by role · last audit clean
              </div>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-[11px] font-mono text-glow-green flex items-center gap-1.5">
            <KeyRound className="h-3 w-3" /> 0 anomalies
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PERMISSIONS.map((p) => (
            <div key={p.role} className="rounded-xl p-3 bg-white/[0.03] border border-border">
              <div className="text-[10px] font-mono uppercase tracking-widest text-glow-cyan">
                {p.role}
              </div>
              <div className="font-display text-lg font-semibold mt-1">
                {p.count.toLocaleString()}
              </div>
              <div className="text-[10px] text-muted-foreground">accounts</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.scopes.map((s) => (
                  <span
                    key={s}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-border"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
