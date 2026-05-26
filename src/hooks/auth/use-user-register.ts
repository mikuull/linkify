'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { registerSchema } from '@/validations/auth/auth-schema';
import { authClient } from '@/lib/auth-client';

type RegisterValues = z.infer<typeof registerSchema>;

type AuthErrorContext = {
  error: {
    message: string;
  };
};

export const useUserRegister = (callbackURL = '/dashboard') => {
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    const { username, email, password } = values;

    await authClient.signUp.email(
      {
        email,
        password,
        name: username,
        callbackURL,
      },

      {
        onSuccess: () => {
          form.reset();
          router.push(callbackURL);
        },

        onError: (ctx: AuthErrorContext) => {
          form.setError('root', {
            type: 'manual',
            message: ctx.error.message,
          });
        },
      },
    );
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  };
};
