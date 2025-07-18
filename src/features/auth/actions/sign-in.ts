'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';

import { z } from 'zod';

import { redirect } from 'next/navigation';

import { verifyPasswordHash } from '../utils/hash-verify';
import {
  generateSessionToken,
  createSession,
} from '../utils/session';
import { setSessionTokenCookie } from '../utils/session-cookie';
import prisma from '@/lib/prisma';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Is required' })
    .max(191)
    .email(),
  password: z.string().min(6).max(191),
});

export const logIn = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return toActionState(
        'Incorrect email or password',
        'ERROR',
        formData
      );
    }

    const validPassword = await verifyPasswordHash(
      user.passwordHash,
      password
    );

    if (!validPassword) {
      return toActionState(
        'Incorrect email or password',
        'ERROR',
        formData
      );
    }

    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    await setSessionTokenCookie(token, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect('/');
};
