'use client';

import * as z from 'zod';

export const todoFormSchema = z.object({
  title: z
    .string({
      required_error: 'Please enter a Title.'
    })
    .max(30, {
      message: 'Title must not be longer than 30 characters.'
    }),
  description: z.string().min(8, {
    message: 'Description Must be at least 8 characters'
  })
});

export const DisplayNameFormSchema = z.object({
  display_name: z
    .string()
    .min(2, {
      message: 'Display Name must be at least 2 characters.'
    })
    .max(30, {
      message: 'Display Name must not be longer than 30 characters.'
    })
});

export const EmailFormSchema = z.object({
  email: z.string().email()
});

export const UpdatePasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.'
    })
    .max(30, {
      message: 'Password must not be longer than 30 characters.'
    })
});

export type DisplayNameFormValues = z.infer<typeof DisplayNameFormSchema>;
export type EmailFormValues = z.infer<typeof EmailFormSchema>;
export type UpdatePasswordFormValues = z.infer<typeof UpdatePasswordFormSchema>;
export type todoFormValues = z.infer<typeof todoFormSchema>;
