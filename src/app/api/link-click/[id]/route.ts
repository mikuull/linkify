import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

type LinkClickRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: LinkClickRouteProps) {
  const { id } = await params;
  const link = await prisma.profileLink.findUnique({
    where: {
      id,
      isVisible: true,
    },
    select: {
      id: true,
      url: true,
      profileId: true,
    },
  });

  if (!link) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  await prisma.$transaction([
    prisma.profileLink.update({
      where: {
        id: link.id,
      },
      data: {
        clickCount: {
          increment: 1,
        },
      },
    }),
    prisma.linkClick.create({
      data: {
        profileId: link.profileId,
        linkId: link.id,
        referrer: request.headers.get('referer'),
        userAgent: request.headers.get('user-agent'),
      },
    }),
  ]);

  return NextResponse.redirect(link.url);
}
