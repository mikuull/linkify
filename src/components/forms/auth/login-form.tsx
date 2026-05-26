'use client';

import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';

import { useUserLogin } from '@/hooks/auth/user-user-login';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const LoginForm = () => {
  const { form, onSubmit, isSubmitting } = useUserLogin();
  const emailError = form.formState.errors.email?.message;
  const passwordError = form.formState.errors.password?.message;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <FieldGroup>
        <Field data-invalid={Boolean(emailError)}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            aria-invalid={Boolean(emailError)}
            {...form.register('email')}
          />
          {emailError && <FieldError>{emailError}</FieldError>}
        </Field>

        <Field data-invalid={Boolean(passwordError)}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            aria-invalid={Boolean(passwordError)}
            {...form.register('password')}
          />
          {passwordError && <FieldError>{passwordError}</FieldError>}
        </Field>
      </FieldGroup>

      {form.formState.errors.root && (
        <FieldError>{form.formState.errors.root.message}</FieldError>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && (
          <LoaderCircle data-icon="inline-start" className="animate-spin" />
        )}
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>

      <FieldDescription className="text-center">
        New here?{' '}
        <Link href="/sign-up" className="font-medium text-primary">
          Create an account
        </Link>
      </FieldDescription>
    </form>
  );
};
