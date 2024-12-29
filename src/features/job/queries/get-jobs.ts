import prisma from '@/lib/prisma';

export const getJobs = async () => {
  return await prisma.job.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};
