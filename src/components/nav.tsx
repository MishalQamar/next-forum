import { homePath, jobsPath } from '@/paths';

import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { ThemeSwitcher } from './themes/theme-switcher';

export const Nav = () => {
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
        <Link
          href={jobsPath()}
          className={buttonVariants({
            variant: 'default',
          })}
        >
          Jobs
        </Link>
      </div>
    </nav>
  );
};
