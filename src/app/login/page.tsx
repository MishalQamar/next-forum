export const runtime = 'nodejs';
import { CardCompact } from '@/components/card-compact';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/features/auth/components/login-form';

import { registerPath } from '@/paths';
import Link from 'next/link';

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <CardCompact
        title="Log in to your account"
        description="Enter your email below to log in to your account"
        content={<LoginForm />}
        action={
          <Button variant="link" asChild>
            <Link href={registerPath()}>Register</Link>
          </Button>
        }
      />
    </div>
  );
}

export default LoginPage;
