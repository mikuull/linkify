'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { loginSchema } from '@/validations/auth/auth-schema';
import { authClient } from '@/lib/auth-client';

type LoginValues = z.infer<typeof loginSchema>;

export const useUserLogin = (callbackURL = '/dashboard') => {
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async (values: LoginValues) => {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
          callbackURL,
        },
        {
          onSuccess: () => {
            form.reset();
            router.push(callbackURL);
          },

          onError: (ctx) => {
            form.setError('root', {
              type: 'manual',
              message: ctx.error.message,
            });
          },
        },
      );
    },
    [form, router, callbackURL],
  );

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  };
};
