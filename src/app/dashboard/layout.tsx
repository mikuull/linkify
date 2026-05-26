import { ReactNode } from 'react';

import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { getCurrentUserProfile } from '@/lib/dashboard';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { session } = await getCurrentUserProfile();

  return (
    <DashboardShell
      user={{
        name: session.user.name,
        email: session.user.email,
      }}
    >
      {children}
    </DashboardShell>
  );
}
