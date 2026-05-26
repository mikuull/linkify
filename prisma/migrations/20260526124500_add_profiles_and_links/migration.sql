-- CreateEnum
CREATE TYPE "ProfileTheme" AS ENUM ('DEFAULT', 'MINIMAL', 'GLASS', 'NEON');

-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('INSTAGRAM', 'TIKTOK', 'X', 'YOUTUBE', 'GITHUB', 'LINKEDIN', 'FACEBOOK', 'TWITCH', 'SPOTIFY', 'WEBSITE', 'EMAIL', 'OTHER');

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "location" TEXT,
    "websiteUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "theme" "ProfileTheme" NOT NULL DEFAULT 'DEFAULT',
    "backgroundColor" TEXT,
    "textColor" TEXT,
    "accentColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_link" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_link" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "label" TEXT,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_view" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "visitorId" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_view_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_click" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "visitorId" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "link_click_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");

-- CreateIndex
CREATE INDEX "profile_username_idx" ON "profile"("username");

-- CreateIndex
CREATE INDEX "profile_isPublished_idx" ON "profile"("isPublished");

-- CreateIndex
CREATE INDEX "profile_link_profileId_position_idx" ON "profile_link"("profileId", "position");

-- CreateIndex
CREATE INDEX "profile_link_profileId_isVisible_idx" ON "profile_link"("profileId", "isVisible");

-- CreateIndex
CREATE UNIQUE INDEX "social_link_profileId_platform_key" ON "social_link"("profileId", "platform");

-- CreateIndex
CREATE INDEX "social_link_profileId_position_idx" ON "social_link"("profileId", "position");

-- CreateIndex
CREATE INDEX "profile_view_profileId_createdAt_idx" ON "profile_view"("profileId", "createdAt");

-- CreateIndex
CREATE INDEX "link_click_profileId_createdAt_idx" ON "link_click"("profileId", "createdAt");

-- CreateIndex
CREATE INDEX "link_click_linkId_createdAt_idx" ON "link_click"("linkId", "createdAt");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_link" ADD CONSTRAINT "profile_link_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_link" ADD CONSTRAINT "social_link_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_view" ADD CONSTRAINT "profile_view_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_click" ADD CONSTRAINT "link_click_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_click" ADD CONSTRAINT "link_click_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "profile_link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
