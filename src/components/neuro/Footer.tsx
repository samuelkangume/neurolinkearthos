export function Footer() {
  return (
    <footer className="mx-auto max-w-[1500px] px-4 lg:px-8 py-10 mt-6 border-t border-border/60">
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
        <div>
          NEUROLINK EARTH · v4.2.1 ·{" "}
          <span className="text-glow-green">SYS NOMINAL</span>
        </div>
        <div className="flex gap-6">
          <span>API</span>
          <span>Docs</span>
          <span>Status</span>
          <span>Privacy</span>
        </div>
        <div>© 2099 NEUROLINK · Earth Operating System</div>
      </div>
    </footer>
  );
}
