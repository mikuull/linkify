import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const normalizeUsername = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');

export const getCurrentUserProfile = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const username = normalizeUsername(session.user.name);

  const profile = await prisma.profile.upsert({
    where: {
      userId: session.user.id,
    },
    update: {},
    create: {
      userId: session.user.id,
      username,
      displayName: session.user.name,
    },
    include: {
      links: {
        orderBy: {
          position: 'asc',
        },
      },
      socials: {
        orderBy: {
          position: 'asc',
        },
      },
      _count: {
        select: {
          links: true,
          socials: true,
          views: true,
          clicks: true,
        },
      },
    },
  });

  return {
    session,
    profile,
  };
});
