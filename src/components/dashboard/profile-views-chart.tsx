const chartPoints = [
  '0,118',
  '68,118',
  '106,92',
  '148,118',
  '182,24',
  '224,118',
  '260,28',
  '304,118',
  '346,92',
  '386,140',
  '408,54',
  '466,150',
];

export function ProfileViewsChart() {
  return (
    <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Link activity</h2>
          <p className="text-sm text-muted-foreground">
            Link views over the last 12 hours
          </p>
        </div>
        <span className="rounded-xl bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
          Live
        </span>
      </div>

      <div className="relative h-64 overflow-hidden rounded-xl bg-background/50 p-4">
        <div className="absolute inset-x-4 top-8 border-t border-dashed border-border" />
        <div className="absolute inset-x-4 top-20 border-t border-dashed border-border" />
        <div className="absolute inset-x-4 top-32 border-t border-dashed border-border" />
        <div className="absolute inset-x-4 top-44 border-t border-dashed border-border" />

        <svg
          viewBox="0 0 466 170"
          className="relative h-full w-full overflow-visible"
          role="img"
          aria-label="Link views area chart"
        >
          <defs>
            <linearGradient id="activity-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d={`M ${chartPoints.join(' L ')} L 466 170 L 0 170 Z`}
            fill="url(#activity-fill)"
          />
          <polyline
            points={chartPoints.join(' ')}
            fill="none"
            stroke="var(--primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </svg>

        <div className="absolute inset-x-4 bottom-3 grid grid-cols-6 text-[11px] text-muted-foreground">
          <span>09:00</span>
          <span>11:00</span>
          <span>13:00</span>
          <span>15:00</span>
          <span>17:00</span>
          <span className="text-right">19:00</span>
        </div>
      </div>
    </div>
  );
}
