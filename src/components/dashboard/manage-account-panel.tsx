import { AtSign, KeyRound, LinkIcon, Settings, UserPen } from 'lucide-react';

import { Button } from '@/components/ui/button';

const actions = [
  {
    label: 'Change username',
    icon: UserPen,
  },
  {
    label: 'Change display name',
    icon: AtSign,
  },
  {
    label: 'Account settings',
    icon: Settings,
  },
  {
    label: 'Security',
    icon: KeyRound,
  },
];

export function ManageAccountPanel() {
  return (
    <aside className="rounded-2xl bg-card p-5 ring-1 ring-border">
      <div className="mb-4">
        <h2 className="text-base font-semibold">Manage account</h2>
        <p className="text-sm text-muted-foreground">
          Update your profile, security, and link settings.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            type="button"
            variant="secondary"
            className="justify-start"
          >
            <action.icon data-icon="inline-start" />
            {action.label}
          </Button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-background/60 p-4">
        <div className="mb-3 flex items-center gap-2">
          <LinkIcon data-icon="inline-start" />
          <h3 className="text-sm font-semibold">Quick link</h3>
        </div>
        <p className="mb-3 text-xs leading-5 text-muted-foreground">
          Preview the public page your saved profile links will point to.
        </p>
        <Button type="button" className="w-full">
          Open my page
        </Button>
      </div>
    </aside>
  );
}
