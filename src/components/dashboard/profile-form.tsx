import { Save } from 'lucide-react';

import { updateProfileAction } from '@/app/dashboard/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type ProfileFormProps = {
  profile: {
    username: string;
    displayName: string;
    bio: string | null;
    location: string | null;
    websiteUrl: string | null;
    avatarUrl: string | null;
    isPublished: boolean;
  };
};

export function ProfileForm({ profile }: ProfileFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile details</CardTitle>
        <CardDescription>
          This controls your public page and the linkify URL people will visit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={updateProfileAction} className="flex flex-col gap-5">
          <FieldGroup>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  defaultValue={profile.username}
                  placeholder="mikuull"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="displayName">Display name</FieldLabel>
                <Input
                  id="displayName"
                  name="displayName"
                  defaultValue={profile.displayName}
                  placeholder="Mateusz"
                  required
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={profile.bio ?? ''}
                placeholder="Short intro for your profile..."
                maxLength={160}
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Input
                  id="location"
                  name="location"
                  defaultValue={profile.location ?? ''}
                  placeholder="Warsaw, Poland"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="websiteUrl">Website</FieldLabel>
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="url"
                  defaultValue={profile.websiteUrl ?? ''}
                  placeholder="https://example.com"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="avatarUrl">Avatar URL</FieldLabel>
              <Input
                id="avatarUrl"
                name="avatarUrl"
                type="url"
                defaultValue={profile.avatarUrl ?? ''}
                placeholder="https://example.com/avatar.png"
              />
            </Field>

            <label className="flex items-center gap-3 rounded-2xl bg-background/60 p-4 text-sm font-medium">
              <input
                name="isPublished"
                type="checkbox"
                defaultChecked={profile.isPublished}
                className="size-4 accent-primary"
              />
              Public profile is published
            </label>
          </FieldGroup>

          <Button type="submit" className="self-start">
            <Save data-icon="inline-start" />
            Save profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
