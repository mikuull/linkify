import { LucideIcon } from 'lucide-react';

type OverviewCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export function OverviewCard({ icon: Icon, label, value }: OverviewCardProps) {
  return (
    <div className="rounded-2xl bg-primary/15 p-4 ring-1 ring-primary/10">
      <div className="mb-5 flex size-9 items-center justify-center rounded-xl bg-primary/35 text-primary-foreground">
        <Icon data-icon="inline-start" />
      </div>
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-1 truncate text-sm text-muted-foreground">{value}</p>
    </div>
  );
}
