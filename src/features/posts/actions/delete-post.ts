'use server';

import { toActionState } from '@/components/form/utils/to-action-state';
import { getAuth } from '@/features/auth/actions/get-auth';
import { isOwner } from '@/features/auth/utilis/is-owner';

import prisma from '@/lib/prisma';
import { discussionPath } from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deletePost = async (postId: string) => {
  const { user } = await getAuth();

  if (!user) {
    return toActionState(
      'You must be logged in to delete a comment',
      'ERROR'
    );
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post || !isOwner(user, post.userId)) {
    return toActionState('not authorised', 'ERROR');
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  console.log(post.discussionId);

  revalidatePath(discussionPath(post.discussionId));
  redirect(discussionPath(post.discussionId));
};
