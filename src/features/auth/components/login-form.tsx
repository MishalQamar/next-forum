'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';

import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { FieldError } from '@/components/form/field-error';
import { logIn } from '../actions/sign-in';

export const LoginForm = () => {
  const [actionState, action] = useActionState(
    logIn,
    EMPTY_ACTION_STATE
  );

  return (
    <form action={action}>
      <div className="flex flex-col gap-6">
        {/* Form-level error */}
        {actionState?.status === 'ERROR' && actionState?.message && (
          <p className="text-sm text-red-500">
            {actionState.message}
          </p>
        )}

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
          />
          <FieldError actionState={actionState} name="email" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            required
          />
          <FieldError actionState={actionState} name="password" />
        </div>
      </div>

      <Button className="w-full mt-10">Login</Button>
    </form>
  );
};
