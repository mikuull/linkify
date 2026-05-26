import { Hash, LinkIcon, User, Users } from 'lucide-react';

import { ManageAccountPanel } from '@/components/dashboard/manage-account-panel';
import { OverviewCard } from '@/components/dashboard/overview-card';
import { ProfileForm } from '@/components/dashboard/profile-form';
import { ProfileViewsChart } from '@/components/dashboard/profile-views-chart';
import { getCurrentUserProfile } from '@/lib/dashboard';

export default async function DashboardPage() {
  const { profile } = await getCurrentUserProfile();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-sm font-medium text-primary">Account Overview</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-normal">
          Dashboard
        </h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <OverviewCard icon={User} label="Username" value={profile.username} />
        <OverviewCard
          icon={LinkIcon}
          label="Saved links"
          value={`${profile._count.links}`}
        />
        <OverviewCard
          icon={Hash}
          label="Social links"
          value={`${profile._count.socials}`}
        />
        <OverviewCard
          icon={Users}
          label="Profile views"
          value={`${profile._count.views}`}
        />
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold">Account Statistics</h2>
        <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
          <ProfileViewsChart
            totalViews={profile._count.views}
            totalClicks={profile._count.clicks}
          />
          <ManageAccountPanel username={profile.username} />
        </div>
      </section>

      <ProfileForm profile={profile} />
    </div>
  );
}
