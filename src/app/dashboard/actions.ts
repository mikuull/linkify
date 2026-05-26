'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { getCurrentUserProfile } from '@/lib/dashboard';
import { ProfileTheme, SocialPlatform } from '../../../generated/prisma/enums';

const usernameSchema = z
  .string()
  .trim()
  .min(3)
  .max(30)
  .regex(/^[a-zA-Z0-9_]+$/)
  .transform((value) => value.toLowerCase());

const optionalUrlSchema = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : null));

const urlSchema = z.url().trim();

const revalidateDashboard = () => {
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/customize');
  revalidatePath('/dashboard/links');
};

export async function updateProfileAction(formData: FormData) {
  const { profile } = await getCurrentUserProfile();
  const values = z
    .object({
      username: usernameSchema,
      displayName: z.string().trim().min(1).max(60),
      bio: z
        .string()
        .trim()
        .max(160)
        .optional()
        .transform((value) => (value ? value : null)),
      location: z
        .string()
        .trim()
        .max(80)
        .optional()
        .transform((value) => (value ? value : null)),
      websiteUrl: optionalUrlSchema,
      avatarUrl: optionalUrlSchema,
      isPublished: z.boolean(),
    })
    .parse({
      username: formData.get('username'),
      displayName: formData.get('displayName'),
      bio: formData.get('bio'),
      location: formData.get('location'),
      websiteUrl: formData.get('websiteUrl'),
      avatarUrl: formData.get('avatarUrl'),
      isPublished: formData.get('isPublished') === 'on',
    });

  await prisma.profile.update({
    where: {
      id: profile.id,
    },
    data: values,
  });

  revalidateDashboard();
  revalidatePath(`/${profile.username}`);
  revalidatePath(`/${values.username}`);
}

export async function updateCustomizeAction(formData: FormData) {
  const { profile } = await getCurrentUserProfile();
  const values = z
    .object({
      theme: z.enum(ProfileTheme),
      backgroundColor: optionalUrlSchema,
      textColor: optionalUrlSchema,
      accentColor: optionalUrlSchema,
    })
    .parse({
      theme: formData.get('theme'),
      backgroundColor: formData.get('backgroundColor'),
      textColor: formData.get('textColor'),
      accentColor: formData.get('accentColor'),
    });

  await prisma.profile.update({
    where: {
      id: profile.id,
    },
    data: values,
  });

  revalidateDashboard();
  revalidatePath(`/${profile.username}`);
}

export async function createProfileLinkAction(formData: FormData) {
  const { profile } = await getCurrentUserProfile();
  const values = z
    .object({
      title: z.string().trim().min(1).max(80),
      url: urlSchema,
      description: z
        .string()
        .trim()
        .max(120)
        .optional()
        .transform((value) => (value ? value : null)),
    })
    .parse({
      title: formData.get('title'),
      url: formData.get('url'),
      description: formData.get('description'),
    });

  await prisma.profileLink.create({
    data: {
      ...values,
      profileId: profile.id,
      position: profile.links.length,
    },
  });

  revalidateDashboard();
  revalidatePath(`/${profile.username}`);
}

export async function updateProfileLinkAction(formData: FormData) {
  const { profile } = await getCurrentUserProfile();
  const values = z
    .object({
      id: z.string().min(1),
      title: z.string().trim().min(1).max(80),
      url: urlSchema,
      description: z
        .string()
        .trim()
        .max(120)
        .optional()
        .transform((value) => (value ? value : null)),
      isVisible: z.boolean(),
    })
    .parse({
      id: formData.get('id'),
      title: formData.get('title'),
      url: formData.get('url'),
      description: formData.get('description'),
      isVisible: formData.get('isVisible') === 'on',
    });

  await prisma.profileLink.update({
    where: {
      id: values.id,
      profileId: profile.id,
    },
    data: {
      title: values.title,
      url: values.url,
      description: values.description,
      isVisible: values.isVisible,
    },
  });

  revalidateDashboard();
  revalidatePath(`/${profile.username}`);
}

export async function deleteProfileLinkAction(formData: FormData) {
  const { profile } = await getCurrentUserProfile();
  const id = z.string().min(1).parse(formData.get('id'));

  await prisma.profileLink.delete({
    where: {
      id,
      profileId: profile.id,
    },
  });

  revalidateDashboard();
  revalidatePath(`/${profile.username}`);
}

export async function createSocialLinkAction(formData: FormData) {
  const { profile } = await getCurrentUserProfile();
  const values = z
    .object({
      platform: z.enum(SocialPlatform),
      url: urlSchema,
      label: z
        .string()
        .trim()
        .max(40)
        .optional()
        .transform((value) => (value ? value : null)),
    })
    .parse({
      platform: formData.get('platform'),
      url: formData.get('url'),
      label: formData.get('label'),
    });

  await prisma.socialLink.upsert({
    where: {
      profileId_platform: {
        profileId: profile.id,
        platform: values.platform,
      },
    },
    update: values,
    create: {
      ...values,
      profileId: profile.id,
      position: profile.socials.length,
    },
  });

  revalidateDashboard();
  revalidatePath(`/${profile.username}`);
}

export async function deleteSocialLinkAction(formData: FormData) {
  const { profile } = await getCurrentUserProfile();
  const id = z.string().min(1).parse(formData.get('id'));

  await prisma.socialLink.delete({
    where: {
      id,
      profileId: profile.id,
    },
  });

  revalidateDashboard();
  revalidatePath(`/${profile.username}`);
}

export async function goToPublicProfileAction() {
  const { profile } = await getCurrentUserProfile();

  redirect(`/${profile.username}`);
}
