import { User } from '@prisma/client';

export const isOwner = (
  authUser: User | null | undefined,
  entity: String | null | undefined
) => {
  if (!authUser || !entity) {
    return false;
  }

  if (!entity) {
    return false;
  }

  if (authUser.id !== entity) {
    return false;
  } else {
    return true;
  }
};
