import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Hash, LinkIcon, User, Users } from 'lucide-react';

import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { ManageAccountPanel } from '@/components/dashboard/manage-account-panel';
import { OverviewCard } from '@/components/dashboard/overview-card';
import { ProfileViewsChart } from '@/components/dashboard/profile-views-chart';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
  };
  const profile = await prisma.profile.upsert({
    where: {
      userId: session.user.id,
    },
    update: {},
    create: {
      userId: session.user.id,
      username: session.user.name,
      displayName: session.user.name,
    },
    include: {
      _count: {
        select: {
          links: true,
          socials: true,
          views: true,
        },
      },
    },
  });

  return (
    <DashboardShell user={user}>
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
            <ProfileViewsChart />
            <ManageAccountPanel />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
