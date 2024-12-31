import { useEffect, useState } from 'react';
import { getAuth } from '../actions/get-auth';
import { User } from '@prisma/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setIsFetched(true);
    };
    fetchUser();
  });

  return [user, isFetched];
};
