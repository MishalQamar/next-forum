import prisma from '@/lib/prisma';

export const getDiscussion = async (id: string) => {
  const discussion = await prisma.discussion.findUnique({
    where: {
      id,
    },
    include: {
      topic: {
        select: {
          id: true,
          title: true,
        },
      },

      _count: {
        select: {
          posts: {
            where: {
              NOT: {
                parentId: null,
              },
            },
          },
        },
      },
    },
  });
  if (!discussion) return null;
  return discussion;
};
