export const runtime = 'nodejs';
import { CardCompact } from '@/components/card-compact';
import { Button } from '@/components/ui/button';
import { RegisterForm } from '@/features/auth/components/register-form';

import { loginPath } from '@/paths';
import Link from 'next/link';

function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <CardCompact
        title="Register a new account"
        description="Enter your email below to create a new account"
        content={<RegisterForm />}
        action={
          <Button variant="link" asChild>
            <Link href={loginPath()}>Log in</Link>
          </Button>
        }
      />
    </div>
  );
}

export default RegisterPage;
