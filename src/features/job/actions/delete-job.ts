'use server';

import { setCookieByKey } from '@/actions/cookies';
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utilis/is-owner';
import prisma from '@/lib/prisma';
import { jobsPath } from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteJob = async (id: string) => {
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
