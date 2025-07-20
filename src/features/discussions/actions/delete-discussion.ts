'use server';

import { toActionState } from '@/components/form/utils/to-action-state';
import { getAuth } from '@/features/auth/actions/get-auth';
import { isOwner } from '@/features/auth/utilis/is-owner';

import prisma from '@/lib/prisma';
import { homePath } from '@/paths';
import { setCookieByKey } from '@/utils/cookies';

import { redirect } from 'next/navigation';

export const deleteDiscussion = async (discussionId: string) => {
  const { user } = await getAuth();

  if (!user) {
    return toActionState(
      'You must be logged in to delete a comment',
      'ERROR'
    );
  }

  const discussion = await prisma.discussion.findUnique({
    where: {
      id: discussionId,
    },
  });

  if (!discussion || !isOwner(user, discussion.userId)) {
    return toActionState('not authorised', 'ERROR');
  }

  await prisma.discussion.delete({
    where: {
      id: discussionId,
    },
  });
  await setCookieByKey('toast', 'Discussion deleted');

  redirect(homePath());
};
