import { Bell, Search, Sparkles, User, Globe2, LogIn, LogOut } from "lucide-react";

const tabs: { label: string; href: string }[] = [
  { label: "Dashboard", href: "#top" },
  { label: "Energy", href: "#energy" },
  { label: "Network", href: "#energy-network" },
  { label: "Robotics", href: "#robotics" },
  { label: "Environment", href: "#environment" },
  { label: "Alerts", href: "#alerts" },
  { label: "Waste", href: "#waste" },
  { label: "Analytics", href: "#analytics" },
];

export function TopNav({
  onAssistant,
  onLogin,
  onLogout,
  user,
}: {
  onAssistant: () => void;
  onLogin: () => void;
  onLogout: () => void;
  user: { email: string; role: string } | null;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/60">
      <div className="mx-auto max-w-[1500px] px-4 lg:px-8 h-16 flex items-center gap-6">
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative h-9 w-9 rounded-xl grid place-items-center bg-gradient-to-br from-primary/30 to-secondary/30 neon-border">
            <Globe2 className="h-5 w-5 text-glow-cyan" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-sm tracking-widest">
              NEUROLINK
            </div>
            <div className="text-[10px] font-mono text-glow-green tracking-[0.3em]">
              EARTH
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {tabs.map((t, i) => (
            <a
              key={t.label}
              href={t.href}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                i === 0
                  ? "bg-primary/10 text-glow-cyan"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {t.label}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-xl bg-white/5 border border-border/60 w-56">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search systems, sensors…"
            className="bg-transparent outline-none text-xs flex-1 placeholder:text-muted-foreground"
          />
          <kbd className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1">
            ⌘K
          </kbd>
        </div>

        <button className="relative h-9 w-9 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_var(--green-glow)]" />
        </button>

        <button
          onClick={onAssistant}
          className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-glow-cyan text-xs font-medium hover:animate-glow"
        >
          <Sparkles className="h-4 w-4" />
          NEURO AI
        </button>

        {user ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:block text-right leading-tight">
              <div className="text-xs font-medium truncate max-w-[120px]">{user.email}</div>
              <div className="text-[10px] font-mono text-glow-green">{user.role}</div>
            </div>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-secondary/30 to-primary/30 grid place-items-center">
              <User className="h-4 w-4" />
            </div>
            <button
              onClick={onLogout}
              className="h-9 w-9 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onLogin}
            className="flex items-center gap-2 h-9 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-border text-xs font-medium"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Sign in</span>
          </button>
        )}
      </div>
    </header>
  );
}
