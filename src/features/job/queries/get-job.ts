import prisma from '@/lib/prisma';

export const getJOb = async (id: string) => {
  return await prisma.job.findUnique({
    where: {
      id,
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
