import { Prisma } from '@prisma/client';

export type JobWithMetaData = Prisma.JobGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
  };
}>;
