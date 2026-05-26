import {
  Brush,
  ChartNoAxesColumn,
  LinkIcon,
  MoreHorizontal,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type DashboardShellProps = {
  children: ReactNode;
  user: {
    name: string;
    email: string;
  };
};

const navItems = [
  {
    label: 'Account',
    href: '/dashboard',
    icon: User,
    active: true,
  },
  {
    label: 'Customize',
    href: '/dashboard/customize',
    icon: Brush,
    active: false,
  },
  {
    label: 'Links',
    href: '/dashboard/links',
    icon: LinkIcon,
    active: false,
  },
];

export function DashboardShell({ children, user }: DashboardShellProps) {
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-border bg-card/30 px-4 py-4 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
          <div className="flex h-full flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/15">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  Welcome back, {user.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex h-10 shrink-0 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                    item.active && 'bg-primary/15 text-foreground'
                  )}
                >
                  <item.icon data-icon="inline-start" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto hidden rounded-2xl border border-border bg-background/60 p-4 lg:block">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <ChartNoAxesColumn data-icon="inline-start" />
                Linkify
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                Keep your saved links tidy, searchable, and ready when you need
                them.
              </p>
            </div>

            <div className="hidden items-center gap-3 border-t border-border pt-4 lg:flex">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-sm font-semibold">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  Account
                </p>
              </div>
              <MoreHorizontal className="text-muted-foreground" />
            </div>
          </div>
        </aside>

        <section className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </section>
      </div>
    </main>
  );
}
