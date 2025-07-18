'use server';
export const runtime = 'nodejs';

import { z } from 'zod';
import { hashPassword } from '../utils/hash-verify';
import {
  generateSessionToken,
  createSession,
} from '../utils/session';
import { setSessionTokenCookie } from '../utils/session-cookie';
import { redirect } from 'next/navigation';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '@/lib/prisma';

const registerSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(99)
      .refine(
        (val) => !val.includes(' '),
        'Username cannot contain spaces'
      ),
    email: z
      .string()
      .email()
      .min(1, { message: 'Email is required' }),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const register = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { username, email, password } = registerSchema.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: await hashPassword(password),
      },
    });

    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    await setSessionTokenCookie(token, session.expiresAt);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return toActionState(
        'email or username already in use',
        'ERROR',
        {},
        formData
      );
    }

    return fromErrorToActionState(error, formData);
  }

  redirect('/');
};
