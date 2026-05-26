'use client';

import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';

import { useUserRegister } from '@/hooks/auth/use-user-register';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const RegisterForm = () => {
  const { form, onSubmit, isSubmitting } = useUserRegister();
  const usernameError = form.formState.errors.username?.message;
  const emailError = form.formState.errors.email?.message;
  const passwordError = form.formState.errors.password?.message;
  const confirmPasswordError = form.formState.errors.confirmPassword?.message;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <FieldGroup>
        <Field data-invalid={Boolean(usernameError)}>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            type="text"
            placeholder="john"
            autoComplete="username"
            aria-invalid={Boolean(usernameError)}
            {...form.register('username')}
          />
          {usernameError && <FieldError>{usernameError}</FieldError>}
        </Field>

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
            placeholder="At least 8 characters"
            autoComplete="new-password"
            aria-invalid={Boolean(passwordError)}
            {...form.register('password')}
          />
          {passwordError && <FieldError>{passwordError}</FieldError>}
        </Field>

        <Field data-invalid={Boolean(confirmPasswordError)}>
          <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            aria-invalid={Boolean(confirmPasswordError)}
            {...form.register('confirmPassword')}
          />
          {confirmPasswordError && (
            <FieldError>{confirmPasswordError}</FieldError>
          )}
        </Field>
      </FieldGroup>

      {form.formState.errors.root && (
        <FieldError>{form.formState.errors.root.message}</FieldError>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && (
          <LoaderCircle data-icon="inline-start" className="animate-spin" />
        )}
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>

      <FieldDescription className="text-center">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-medium text-primary">
          Sign in
        </Link>
      </FieldDescription>
    </form>
  );
};
