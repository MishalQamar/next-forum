import prisma from '@/lib/prisma';

export const getJobs = async (userId: string | undefined) => {
  return await prisma.job.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
