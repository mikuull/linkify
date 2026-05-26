import { LinksManager } from '@/components/dashboard/links-manager';
import { getCurrentUserProfile } from '@/lib/dashboard';

export default async function DashboardLinksPage() {
  const { profile } = await getCurrentUserProfile();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-sm font-medium text-primary">Links</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-normal">
          Public profile content
        </h1>
      </header>

      <LinksManager links={profile.links} socials={profile.socials} />
    </div>
  );
}
