import { CardCompact } from '@/components/card-compact';
import { Button } from '@/components/ui/button';
import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { signInPath } from '@/paths';

import Link from 'next/link';

function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <CardCompact
        title="Register a new account"
        description="Enter your email below to create a new account"
        content={<SignUpForm />}
        action={
          <Button variant="link" asChild>
            <Link href={signInPath()}>Log in</Link>
          </Button>
        }
      />
    </div>
  );
}

export default RegisterPage;
