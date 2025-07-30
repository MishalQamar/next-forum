'use server';

import { toActionState } from '@/components/form/utils/to-action-state';
import { getAuth } from '@/features/auth/actions/get-auth';
import { isOwner } from '@/features/auth/utilis/is-owner';

import prisma from '@/lib/prisma';
import { discussionPath } from '@/paths';
import { revalidatePath } from 'next/cache';

export const markPostAsBestAnswer = async (
  postId: string | null,
  discussionId: string
) => {
  const { user } = await getAuth();

  if (!user) {
    return toActionState(
      'You must be logged in to mark a post as the best answer.',
      'ERROR'
    );
  }

  // Fetch discussion (with userId)
  const discussion = await prisma.discussion.findUnique({
    where: { id: discussionId },
    select: { userId: true },
  });

  if (!discussion || !isOwner(user, discussion.userId)) {
    return toActionState(
      'Not authorized to update this discussion.',
      'ERROR'
    );
  }

  // If postId is not null, validate that the post exists and belongs to this discussion
  if (postId) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { discussionId: true },
    });

    if (!post || post.discussionId !== discussionId) {
      return toActionState('Invalid post selected.', 'ERROR');
    }
  }

  // Update the solutionPostId (can be null to unmark)
  await prisma.discussion.update({
    where: { id: discussionId },
    data: {
      solutionPostId: postId,
    },
  });
  console.log('backend update mark as best answer');
  revalidatePath(discussionPath(discussionId));
  return toActionState(
    'Successfully updated best answer.',
    'SUCCESS'
  );
};
