import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
