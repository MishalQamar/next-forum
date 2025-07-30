/* 'use client'; */

import Link from 'next/link';
import { Button } from './ui/button';

import { getAuth } from '@/features/auth/actions/get-auth';
import { signOut } from '@/features/auth/actions/sign-out';
import { signInPath, signUpPath } from '@/paths';
export const NavBar = async () => {
  const { user } = await getAuth();

  /*   const { user } = useAuth(); */

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-12 w-full">
      {/* Left: Brand/Logo */}
      <div className="text-xl font-bold">Forum</div>

      <div>
        {user ? (
          <Button asChild>
            <form action={signOut}>
              <button>Sign out</button>
            </form>
          </Button>
        ) : (
          <div className="space-x-4">
            <Button asChild>
              <Link href={signInPath()}>Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={signUpPath()}>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
