import prisma from '@/lib/prisma';
import { cache } from 'react';

export const getTopics = cache(async () => {
  const topics = await prisma.topic.findMany({
    orderBy: {
      title: 'asc',
    },
    select: {
      id: true,
      title: true,
    },
  });
  if (!topics) {
    return [];
  }

  return topics;
});
