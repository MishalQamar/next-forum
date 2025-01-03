'use server';

import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utilis/is-owner';
import prisma from '@/lib/prisma';
import { jobsPath } from '@/paths';
import { JobStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const UpdateJobStatus = async (
  id: string,
  status: JobStatus
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
    await prisma.job.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    fromErrorToActionState(error);
  }

  revalidatePath(jobsPath());
  return toActionState('status changed', 'SUCCESS');
};
