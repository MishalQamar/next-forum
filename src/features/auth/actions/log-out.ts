'use server';

import { redirect } from 'next/navigation';
import { getAuth } from '../queries/get-auth';
import { invalidateSession } from '../utils/session';
import { homePath, loginPath } from '@/paths';
import { deleteSessionTokenCookie } from '../utils/session-cookie';

export const logOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(loginPath());
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();

  redirect(homePath());
};
