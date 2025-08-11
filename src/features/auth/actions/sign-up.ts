'use server';

import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import prisma from '@/lib/prisma';
import { homePath } from '@/paths';
import { hashPassword } from '../utilis/hash-verfiy';
import {
  createSession,
  generateSessionToken,
} from '../utilis/session';
import { setSessionTokenCookie } from '../utilis/session-cookie';

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Username is required' })
      .max(191, { message: 'Username must be less than 191 characters' })
      .refine(
        (value) => !value.includes(' '),
        'Username cannot contain spaces'
      ),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .max(191, { message: 'Email must be less than 191 characters' })
      .email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(191, { message: 'Password must be less than 191 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password confirmation is required' })
      .max(191, { message: 'Password confirmation must be less than 191 characters' }),
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

export const signUp = async (
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  try {
    // Parse form data
    const formDataObj = Object.fromEntries(formData);
    const { username, email, password } = signUpSchema.parse(formDataObj);

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    // Create session
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);

    // Set session cookie
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    // Redirect to dashboard - this will throw a NEXT_REDIRECT error
    redirect(homePath());
  } catch (error) {
    // Handle Prisma unique constraint violations
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target as string[];
        if (target?.includes('email')) {
          return toActionState('Email already exists', 'ERROR');
        }
        if (target?.includes('username')) {
          return toActionState('Username already exists', 'ERROR');
        }
        return toActionState('Username or email already exists', 'ERROR');
      }
    }

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return fromErrorToActionState(error, formData);
    }

    // Handle redirect errors (this is expected behavior)
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error; // Re-throw redirect errors
    }

    // Handle other errors
    console.error('Sign-up error:', error);
    return toActionState('An error occurred during sign-up. Please try again.', 'ERROR');
  }
};
