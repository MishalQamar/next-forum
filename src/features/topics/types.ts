import { Prisma } from '@prisma/client';
export type TopicWithPayload = Prisma.TopicGetPayload<{
  select: { id: true; title: true };
}>;
