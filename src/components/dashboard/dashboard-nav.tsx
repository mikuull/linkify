'use client';

import { Brush, LinkIcon, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Account',
    href: '/dashboard',
    icon: User,
  },
  {
    label: 'Customize',
    href: '/dashboard/customize',
    icon: Brush,
  },
  {
    label: 'Links',
    href: '/dashboard/links',
    icon: LinkIcon,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
      {navItems.map((item) => {
        const isActive =
          item.href === '/dashboard'
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex h-10 shrink-0 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
              isActive && 'bg-primary/15 text-foreground'
            )}
          >
            <item.icon data-icon="inline-start" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
