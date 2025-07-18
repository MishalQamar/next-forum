import Link from 'next/link';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { loginPath, registerPath } from '@/paths';
import { getAuth } from '@/features/auth/queries/get-auth';
import { getInitials } from '@/utils/get-initials';
import { logOut } from '@/features/auth/actions/log-out';

export const NavBar = async () => {
  const { user } = await getAuth();

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-12 w-full">
      {/* Left: Brand/Logo */}
      <div className="text-xl font-bold">Forum</div>

      <div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>
                  {getInitials(user.username)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem asChild>
                <form action={logOut}>
                  <Button type="submit" variant="ghost">
                    Sign Out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="space-x-4">
            <Button asChild>
              <Link href={loginPath()}>Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={registerPath()}>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

/* 
When you change cookies in Next.js App Router, it invalidates any server component that depends on them. Next.js will re-render those on the server automatically. */
