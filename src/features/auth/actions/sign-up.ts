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
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(' '),
        'Username cannot contain spaces'
      ),
    email: z
      .string()
      .min(1, { message: 'Is required' })
      .max(191)
      .email(),
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

export const signUp = async (
  _actionState: ActionState,
  formData: FormData
) => {
  console.log('signUp started');

  let parsedData;
  try {
    console.log('Parsing form data...');
    parsedData = signUpSchema.parse(Object.fromEntries(formData));
    console.log('Parsed data:', parsedData);
  } catch (parseError) {
    console.error('Zod validation error:', parseError);
    return fromErrorToActionState(parseError);
  }

  const { username, email, password } = parsedData;

  let passwordHash;
  try {
    console.log('Hashing password...');
    passwordHash = await hashPassword(password);
    console.log('Password hashed.');
  } catch (hashError) {
    console.error('Error hashing password:', hashError);
    return fromErrorToActionState(hashError);
  }

  let user;
  try {
    console.log('Creating user in database...');
    user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });
    console.log('User created:', user);
  } catch (dbError) {
    console.error('Database error:', dbError);
    if (
      dbError instanceof Prisma.PrismaClientKnownRequestError &&
      dbError.code === 'P2002'
    ) {
      return toActionState('User or email already exists', 'ERROR');
    }
    return fromErrorToActionState(dbError);
  }

  let sessionToken, session;
  try {
    console.log('Generating session token...');
    sessionToken = generateSessionToken();
    console.log('Session token generated:', sessionToken);

    console.log('Creating session...');
    session = await createSession(sessionToken, user.id);
    console.log('Session created:', session);
  } catch (sessionError) {
    console.error('Session creation error:', sessionError);
    return fromErrorToActionState(sessionError);
  }

  try {
    console.log('Setting session cookie...');
    await setSessionTokenCookie(sessionToken, session.expiresAt);
    console.log('Session cookie set.');
  } catch (cookieError) {
    console.error('Error setting cookie:', cookieError);
    return fromErrorToActionState(cookieError);
  }
 
  console.log('Redirecting to home path...');
  redirect(homePath());
};
