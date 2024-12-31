'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import prisma from '@/lib/prisma';
import { jobsPath } from '@/paths';

import { verify } from '@node-rs/argon2';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  generateSessionToken,
  createSession,
} from '../utilis/session';
import { setSessionTokenCookie } from '../utilis/session-cookie';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Is required' })
    .max(191)
    .email(),
  password: z.string().min(6).max(191),
});

export const signIn = async (
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
        'incorrect password or email',
        'ERROR',
        formData
      );
    }

    const validPassword = verify(user.passwordHash, password);

    if (!validPassword) {
      return toActionState(
        'incorrect password or email',
        'ERROR',
        formData
      );
    }

    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    await setSessionTokenCookie(token, session.expiresAt);
  } catch (error) {
    fromErrorToActionState(error, formData);
  }

  redirect(jobsPath());
};
