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
    .min(1, { message: 'Email is required' })
    .max(191, { message: 'Email must be less than 191 characters' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(191, { message: 'Password must be less than 191 characters' }),
});

export const signIn = async (
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  try {
    // Parse form data
    const formDataObj = Object.fromEntries(formData);
    const { email, password } = signInSchema.parse(formDataObj);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toActionState('Invalid email or password', 'ERROR');
    }

    // Verify password
    const validPassword = await verifyPasswordHash(
      user.passwordHash,
      password
    );

    if (!validPassword) {
      return toActionState('Invalid email or password', 'ERROR');
    }

    // Create session
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);

    // Set session cookie
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    // Redirect to dashboard - this will throw a NEXT_REDIRECT error
    redirect(homePath());
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return fromErrorToActionState(error, formData);
    }

    // Handle redirect errors (this is expected behavior)
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error; // Re-throw redirect errors
    }

    // Handle other errors
    console.error('Sign-in error:', error);
    return toActionState('An error occurred during sign-in. Please try again.', 'ERROR');
  }
};
