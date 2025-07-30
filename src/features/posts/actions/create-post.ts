'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuth } from '@/features/auth/actions/get-auth';

import prisma from '@/lib/prisma';

import { z } from 'zod';

const createPostSchema = z.object({
  content: z.string().min(1),
});

export const createPost = async (
  discussionId: string,
  postId: string | null,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuth();
  if (!user) {
    return toActionState(
      'You must be logged in to reply to discussion',
      'ERROR'
    );
  }

  try {
    const { content } = createPostSchema.parse(
      Object.fromEntries(formData)
    );

    const discussion = await prisma.discussion.findUnique({
      where: {
        id: discussionId,
      },
    });

    if (!discussion) {
      return toActionState('Discussion not found', 'ERROR');
    }

    const [post, , , count] = await prisma.$transaction([
      prisma.post.create({
        data: {
          body: content,
          userId: user.id,
          discussionId,
          parentId: postId,
        },
      }),
      prisma.participant.upsert({
        where: {
          participantId: {
            userId: user.id,
            discussionId,
          },
        },
        update: {},
        create: {
          userId: user.id,
          discussionId,
        },
      }),
      prisma.discussion.update({
        where: { id: discussionId },
        data: { lastActivityAt: new Date() },
      }),
      prisma.post.count({
        where: {
          discussionId,
        },
      }),
    ]);

    return toActionState('Post created successfully', 'SUCCESS', {
      postId: post.id,
      count,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
};
