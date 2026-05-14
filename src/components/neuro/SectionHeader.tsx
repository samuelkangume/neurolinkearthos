export function SectionHeader({
  eyebrow,
  title,
  desc,
  right,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-glow-cyan">
          {eyebrow}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold mt-2">
          {title}
        </h2>
        {desc && (
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{desc}</p>
        )}
      </div>
      {right}
    </div>
  );
}
