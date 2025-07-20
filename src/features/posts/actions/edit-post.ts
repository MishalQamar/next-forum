'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuth } from '@/features/auth/actions/get-auth';
import { isOwner } from '@/features/auth/utilis/is-owner';

import prisma from '@/lib/prisma';
import { discussionPath } from '@/paths';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const editPostSchema = z.object({
  text: z.string().min(1, 'Comment field is required'),
});

export const editPost = async (
  postId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuth();
  if (!user) {
    return toActionState(
      'You must be logged in to edit post',
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

  try {
    const { text } = editPostSchema.parse(
      Object.fromEntries(formData)
    );

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        body: text,
      },
    });

    revalidatePath(discussionPath(post.discussionId));
  } catch (error) {
    fromErrorToActionState(error);
  }

  return toActionState('Post edited successfully', 'SUCCESS');
};
