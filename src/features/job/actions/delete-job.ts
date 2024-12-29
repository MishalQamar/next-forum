'use server';

import { setCookieByKey } from '@/actions/cookies';
import { fromErrorToActionState } from '@/components/form/utils/to-action-state';
import prisma from '@/lib/prisma';
import { jobsPath } from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteJob = async (id: string) => {
  try {
    await prisma.job.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    fromErrorToActionState(error);
  }
  revalidatePath(jobsPath());
  await setCookieByKey('toast', 'job deleted');
  redirect(jobsPath());
};
