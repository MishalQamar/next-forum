'use server';

import { setCookieByKey } from '@/actions/cookies';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
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
  try {
    const data = upsertJobSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      salary: formData.get('salary'),
      deadline: formData.get('deadline'),
    });

    const dbData = {
      ...data,
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
