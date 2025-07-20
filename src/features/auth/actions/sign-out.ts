'use server';

import { redirect } from 'next/navigation';

import { signInPath } from '@/paths';
import { invalidateSession } from '../utilis/session';
import { deleteSessionTokenCookie } from '../utilis/session-cookie';
import { getAuth } from './get-auth';

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }
  console.log('signing out');

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();
};
