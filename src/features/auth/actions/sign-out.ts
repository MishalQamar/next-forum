'use server';

import { homePath, signInPath } from '@/paths';
import { redirect } from 'next/navigation';
import { invalidateSession } from '../utilis/session';
import { getAuth } from './get-auth';
import { deleteSessionTokenCookie } from '../utilis/session-cookie';
export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }
  console.log('signing out');

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();

  redirect(homePath());
};
