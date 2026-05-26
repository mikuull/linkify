import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

import {
  createProfileLinkAction,
  createSocialLinkAction,
  deleteProfileLinkAction,
  deleteSocialLinkAction,
  updateProfileLinkAction,
} from '@/app/dashboard/actions';
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
import { Textarea } from '@/components/ui/textarea';
import { SocialPlatform } from '../../../generated/prisma/enums';

type ProfileLinkItem = {
  id: string;
  title: string;
  url: string;
  description: string | null;
  isVisible: boolean;
  clickCount: number;
};

type SocialLinkItem = {
  id: string;
  platform: SocialPlatform;
  label: string | null;
  url: string;
};

type LinksManagerProps = {
  links: ProfileLinkItem[];
  socials: SocialLinkItem[];
};

const socialPlatforms = Object.values(SocialPlatform);

const formatPlatform = (platform: SocialPlatform) =>
  platform
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export function LinksManager({ links, socials }: LinksManagerProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Add profile link</CardTitle>
            <CardDescription>
              Create buttons that will appear on your public profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createProfileLinkAction} className="flex flex-col gap-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input id="title" name="title" placeholder="My portfolio" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="url">URL</FieldLabel>
                  <Input
                    id="url"
                    name="url"
                    type="url"
                    placeholder="https://example.com"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Optional short context for this link"
                  />
                </Field>
              </FieldGroup>
              <Button type="submit" className="self-start">
                <Plus data-icon="inline-start" />
                Add link
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your links</CardTitle>
            <CardDescription>
              Edit visibility, copy, and destinations for your public page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {links.length === 0 ? (
              <div className="rounded-2xl bg-background/60 p-6 text-sm text-muted-foreground">
                No links yet. Add your first profile link above.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="rounded-2xl bg-background/60 p-4 ring-1 ring-border"
                  >
                    <form
                      action={updateProfileLinkAction}
                      className="flex flex-col gap-4"
                    >
                      <input type="hidden" name="id" value={link.id} />
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor={`title-${link.id}`}>Title</FieldLabel>
                          <Input
                            id={`title-${link.id}`}
                            name="title"
                            defaultValue={link.title}
                            required
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor={`url-${link.id}`}>URL</FieldLabel>
                          <Input
                            id={`url-${link.id}`}
                            name="url"
                            type="url"
                            defaultValue={link.url}
                            required
                          />
                        </Field>
                      </div>
                      <Field>
                        <FieldLabel htmlFor={`description-${link.id}`}>
                          Description
                        </FieldLabel>
                        <Textarea
                          id={`description-${link.id}`}
                          name="description"
                          defaultValue={link.description ?? ''}
                        />
                      </Field>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input
                            name="isVisible"
                            type="checkbox"
                            defaultChecked={link.isVisible}
                            className="size-4 accent-primary"
                          />
                          {link.isVisible ? (
                            <Eye data-icon="inline-start" />
                          ) : (
                            <EyeOff data-icon="inline-start" />
                          )}
                          Visible
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {link.clickCount} clicks
                          </span>
                          <Button type="submit" size="sm">
                            Save
                          </Button>
                        </div>
                      </div>
                    </form>
                    <form action={deleteProfileLinkAction} className="mt-3">
                      <input type="hidden" name="id" value={link.id} />
                      <Button type="submit" variant="destructive" size="sm">
                        <Trash2 data-icon="inline-start" />
                        Delete
                      </Button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Add social</CardTitle>
            <CardDescription>
              Add Instagram, GitHub, TikTok, and other social profiles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createSocialLinkAction} className="flex flex-col gap-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="platform">Platform</FieldLabel>
                  <Select id="platform" name="platform" defaultValue="INSTAGRAM">
                    {socialPlatforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {formatPlatform(platform)}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="social-url">URL</FieldLabel>
                  <Input
                    id="social-url"
                    name="url"
                    type="url"
                    placeholder="https://instagram.com/username"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="label">Label</FieldLabel>
                  <Input id="label" name="label" placeholder="@username" />
                </Field>
              </FieldGroup>
              <Button type="submit">
                <Plus data-icon="inline-start" />
                Save social
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Socials</CardTitle>
            <CardDescription>One social entry per platform.</CardDescription>
          </CardHeader>
          <CardContent>
            {socials.length === 0 ? (
              <p className="rounded-2xl bg-background/60 p-4 text-sm text-muted-foreground">
                No socials connected yet.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {socials.map((social) => (
                  <div
                    key={social.id}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-background/60 p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {formatPlatform(social.platform)}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {social.label || social.url}
                      </p>
                    </div>
                    <form action={deleteSocialLinkAction}>
                      <input type="hidden" name="id" value={social.id} />
                      <Button type="submit" variant="ghost" size="icon">
                        <Trash2 data-icon="inline-start" />
                      </Button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
