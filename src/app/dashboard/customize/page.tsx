import { CustomizePanel } from '@/components/dashboard/customize-panel';
import { getCurrentUserProfile } from '@/lib/dashboard';

export default async function DashboardCustomizePage() {
  const { profile } = await getCurrentUserProfile();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-sm font-medium text-primary">Customize</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-normal">
          Profile appearance
        </h1>
      </header>

      <CustomizePanel profile={profile} />
    </div>
  );
}
