import prisma from '@/lib/prisma';
import { ParsedSearchParams } from '../search-params';
import { getAuth } from '@/features/auth/actions/get-auth';

export const getDiscussions = async (
  parsedSearchParams: ParsedSearchParams
) => {
  const { user: authUser } = await getAuth();

  const take = parsedSearchParams.size;
  const skip = take * parsedSearchParams.page;
  const where = {
    title: {
      contains: parsedSearchParams.search,
      mode: 'insensitive' as const,
    },
    topic: {
      title: {
        ...(parsedSearchParams.select !== 'all' && {
          contains: parsedSearchParams.select,
          mode: 'insensitive' as const,
        }),
      },
    },
    ...(parsedSearchParams.noreplies && {
      posts: {
        none: {
          parentId: {
            not: null,
          },
        },
      },
    }),
    ...(parsedSearchParams.solved && {
      NOT: {
        solutionPostId: null,
      },
    }),
    ...(parsedSearchParams.unsolved && {
      solutionPostId: null,
    }),
    ...(parsedSearchParams.mydiscussions &&
      authUser && {
        userId: authUser.id,
      }),
    ...(parsedSearchParams.participating &&
      authUser && {
        userId: {
          not: authUser.id,
        },
        posts: {
          some: {
            userId: authUser.id,
          },
        },
      }),
  };

  const [discussions, count] = await prisma.$transaction([
    prisma.discussion.findMany({
      where,
      take,
      skip,
      orderBy: {
        lastActivityAt: 'desc',
      },
      include: {
        topic: {
          select: {
            id: true,
            title: true,
          },
        },
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },

        participants: {
          select: {
            user: {
              select: {
                email: true,
              },
            },
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
    }),
    prisma.discussion.count({
      where,
    }),
  ]);

  return {
    list: discussions,
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
