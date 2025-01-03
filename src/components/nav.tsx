'use client';

import { homePath, signInPath, signUpPath } from '@/paths';

import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { ThemeSwitcher } from './themes/theme-switcher';
import { SubmitButton } from './form/submit-button';
import { SignOut } from '@/features/auth/actions/sign-out';
import { useAuth } from '@/features/auth/hooks/use-auth';

export const Nav = () => {
  const [user, isFetched] = useAuth();

  if (!isFetched) return null;

  const navItems = user ? (
    <>
      {/*     <Link
        href={jobsPath()}
        className={buttonVariants({
          variant: 'default',
        })}
      >
        Jobs
      </Link>
 */}
      <form action={SignOut}>
        <SubmitButton label="Sign Out" />
      </form>
    </>
  ) : (
    <>
      <Link
        href={signInPath()}
        className={buttonVariants({
          variant: 'default',
        })}
      >
        Sign In
      </Link>
      <Link
        href={signUpPath()}
        className={buttonVariants({
          variant: 'default',
        })}
      >
        Sign Up
      </Link>
    </>
  );

  return (
    <nav className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex justify-between">
      <div>
        <Link
          href={homePath()}
          className={buttonVariants({ variant: 'outline' })}
        >
          Home
        </Link>
      </div>

      <div className="flex gap-x-2">
        <ThemeSwitcher />

        {navItems}
      </div>
    </nav>
  );
};
