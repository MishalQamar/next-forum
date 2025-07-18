import { ParsedSearchParams } from '../../discussions/search-params';
import prisma from '@/lib/prisma';

export const getPosts = async (
  discussionId: string,
  parsedSearchParams: ParsedSearchParams
) => {
  const take = parsedSearchParams.size;
  const skip = take * parsedSearchParams.page;

  const where = { discussionId };

  const [posts, count] = await prisma.$transaction([
    prisma.post.findMany({
      where,
      orderBy: {
        createdAt: 'asc',
      },
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    }),
    prisma.post.count({ where }),
  ]);

  return {
    list: posts,
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
