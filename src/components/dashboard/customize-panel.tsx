import { Palette, Save } from 'lucide-react';

import { updateCustomizeAction } from '@/app/dashboard/actions';
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
import { Select } from '@/components/ui/select';
import { ProfileTheme } from '../../../generated/prisma/enums';

type CustomizePanelProps = {
  profile: {
    username: string;
    displayName: string;
    bio: string | null;
    theme: ProfileTheme;
    backgroundColor: string | null;
    textColor: string | null;
    accentColor: string | null;
  };
};

const themes = Object.values(ProfileTheme);

export function CustomizePanel({ profile }: CustomizePanelProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Customize profile</CardTitle>
          <CardDescription>
            Tune the public page without leaving the dashboard style.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateCustomizeAction} className="flex flex-col gap-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="theme">Theme</FieldLabel>
                <Select id="theme" name="theme" defaultValue={profile.theme}>
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme.charAt(0) + theme.slice(1).toLowerCase()}
                    </option>
                  ))}
                </Select>
              </Field>

              <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                <Field>
                  <FieldLabel htmlFor="backgroundColor">Background</FieldLabel>
                  <Input
                    id="backgroundColor"
                    name="backgroundColor"
                    defaultValue={profile.backgroundColor ?? ''}
                    placeholder="#111111"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="textColor">Text</FieldLabel>
                  <Input
                    id="textColor"
                    name="textColor"
                    defaultValue={profile.textColor ?? ''}
                    placeholder="#ffffff"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="accentColor">Accent</FieldLabel>
                  <Input
                    id="accentColor"
                    name="accentColor"
                    defaultValue={profile.accentColor ?? ''}
                    placeholder="#2f8f76"
                  />
                </Field>
              </div>
            </FieldGroup>

            <Button type="submit" className="self-start">
              <Save data-icon="inline-start" />
              Save style
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            A quick approximation of how your public profile will feel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-3xl bg-background/70 p-4 ring-1 ring-border">
            <div className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-3xl bg-card p-6 text-center ring-1 ring-border">
              <div className="flex size-16 items-center justify-center rounded-3xl bg-primary text-xl font-semibold text-primary-foreground">
                {profile.displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-semibold">{profile.displayName}</p>
                <p className="text-sm text-muted-foreground">
                  /{profile.username}
                </p>
              </div>
              {profile.bio && (
                <p className="text-sm leading-6 text-muted-foreground">
                  {profile.bio}
                </p>
              )}
              <div className="flex w-full flex-col gap-2">
                <div className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground">
                  Featured link
                </div>
                <div className="rounded-xl bg-secondary px-4 py-3 text-sm font-medium">
                  Social profile
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Palette data-icon="inline-start" />
                {profile.theme.toLowerCase()} theme
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
