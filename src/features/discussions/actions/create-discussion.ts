'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuth } from '@/features/auth/actions/get-auth';

import prisma from '@/lib/prisma';

import { setCookieByKey } from '@/utils/cookies';

import { z } from 'zod';

const createDiscussionSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1),
  topicId: z.string().min(1, { message: 'Please select a topic' }),
});

export const createDisucssion = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuth();
  if (!user) {
    return toActionState(
      'You must be logged in to create a discussion',
      'ERROR'
    );
  }

  try {
    const { title, content, topicId } = createDiscussionSchema.parse(
      Object.fromEntries(formData)
    );

    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId,
      },
    });

    if (!topic) {
      return toActionState('Topic not found', 'ERROR');
    }

    const discussion = await prisma.$transaction(async (tx) => {
      const discussion = await tx.discussion.create({
        data: {
          title,
          topicId: topic.id,
          userId: user.id,
        },
      });

      await tx.post.create({
        data: {
          body: content,
          userId: user.id,
          discussionId: discussion.id,
        },
      });

      await tx.participant.create({
        data: {
          discussionId: discussion.id,
          userId: user.id,
        },
      });

      return discussion;
    });

    await setCookieByKey('toast', 'Discussion created');
    return toActionState('Discussion created', 'SUCCESS', {
      discussionId: discussion.id,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
};
