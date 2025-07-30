'use server';

import {
  ActionState,
  toActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state';
import prisma from '@/lib/prisma';
import { homePath } from '@/paths';
import { redirect } from 'next/navigation';
import z from 'zod';
import { verifyPasswordHash } from '../utilis/hash-verfiy';
import {
  createSession,
  generateSessionToken,
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
      where: { email },
    });

    if (!user) {
      return toActionState('Incorrect email or password', 'ERROR');
    }

    const validPassword = await verifyPasswordHash(
      user.passwordHash,
      password
    );

    if (!validPassword) {
      return toActionState('Incorrect email or password', 'ERROR');
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionTokenCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(homePath());
};
