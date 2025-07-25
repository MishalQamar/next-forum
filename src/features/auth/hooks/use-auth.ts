import { useEffect, useState } from 'react';
import { getAuth } from '../actions/get-auth';
import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setIsFetched(true);
    };
    fetchUser();
  }, [pathname]);

  return { user, isFetched };
};
