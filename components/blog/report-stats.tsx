export function ReportStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-border bg-card/50 px-4 py-3">
          <div className="text-xl font-bold tracking-tight text-foreground md:text-2xl">{stat.value}</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
