'use server';

import { setCookieByKey } from '@/actions/cookies';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';

import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utilis/is-owner';
import prisma from '@/lib/prisma';
import { jobPath, jobsPath } from '@/paths';
import { toCent } from '@/utilis/currency';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';

const upsertJobSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  salary: z.coerce.number().positive(),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Is required'),
});

export const upsertJob = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (id) {
      const job = await prisma.job.findUnique({
        where: {
          id,
        },
      });

      if (!job || !isOwner(user, job)) {
        return toActionState('Not authorized', 'ERROR');
      }
    }

    const data = upsertJobSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      salary: formData.get('salary'),
      deadline: formData.get('deadline'),
    });

    const dbData = {
      ...data,
      userId: user.id,
      salary: toCent(data.salary),
    };

    await prisma.job.upsert({
      where: {
        id: id || '',
      },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(jobsPath());

  if (id) {
    await setCookieByKey('toast', 'job updated');
    redirect(jobPath(id));
  }

  return toActionState('job created', 'SUCCESS');
};
