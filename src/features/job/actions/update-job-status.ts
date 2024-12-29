'use server';

import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import prisma from '@/lib/prisma';
import { jobsPath } from '@/paths';
import { JobStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const UpdateJobStatus = async (
  id: string,
  status: JobStatus
) => {
  try {
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
