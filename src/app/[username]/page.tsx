import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { LinkIcon, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';

type PublicProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

const reservedRoutes = new Set([
  'api',
  'dashboard',
  'sign-in',
  'sign-up',
  '_next',
  'favicon.ico',
]);

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { username } = await params;

  if (reservedRoutes.has(username)) {
    notFound();
  }

  const profile = await prisma.profile.findUnique({
    where: {
      username,
      isPublished: true,
    },
    include: {
      links: {
        where: {
          isVisible: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
      socials: {
        where: {
          isVisible: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!profile) {
    notFound();
  }

  const requestHeaders = await headers();

  await prisma.profileView.create({
    data: {
      profileId: profile.id,
      referrer: requestHeaders.get('referer'),
      userAgent: requestHeaders.get('user-agent'),
    },
  });

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
        <section className="flex w-full flex-col items-center gap-4 rounded-3xl bg-card p-6 text-center ring-1 ring-border">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-primary text-2xl font-semibold text-primary-foreground">
            {profile.displayName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-normal">
              {profile.displayName}
            </h1>
            <p className="text-sm text-muted-foreground">/{profile.username}</p>
          </div>

          {profile.bio && (
            <p className="text-sm leading-6 text-muted-foreground">
              {profile.bio}
            </p>
          )}

          {profile.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin data-icon="inline-start" />
              {profile.location}
            </div>
          )}
        </section>

        <section className="flex w-full flex-col gap-3">
          {profile.links.map((link) => (
            <Button key={link.id} asChild className="h-12 w-full">
              <a href={`/api/link-click/${link.id}`}>
                <LinkIcon data-icon="inline-start" />
                {link.title}
              </a>
            </Button>
          ))}
        </section>

        {profile.socials.length > 0 && (
          <section className="flex w-full flex-wrap justify-center gap-2">
            {profile.socials.map((social) => (
              <Button key={social.id} asChild variant="secondary" size="sm">
                <a href={social.url} target="_blank" rel="noreferrer">
                  {social.label || social.platform.toLowerCase()}
                </a>
              </Button>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
