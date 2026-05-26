import { z } from 'zod';

const passwordSchema = z.string().min(8, {
  message: 'Password must be at least 8 characters long',
});

const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, {
        message: 'Username must be at least 3 characters long',
      })
      .max(30, {
        message: 'Username must be at most 30 characters long',
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores',
      }),

    email: z.email({
      message: 'Invalid email address',
    }),

    password: passwordSchema,

    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const loginSchema = z.object({
  email: z.email({
    message: 'Invalid email address',
  }),

  password: passwordSchema,
});

export { registerSchema, loginSchema };
