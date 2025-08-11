'use client';

import { FieldError } from '@/components/form/field-error';
import { GeneralError } from '@/components/form/general-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { signIn } from '../actions/sign-in';
import { SubmitButton } from '@/components/submit-button';

const SignInForm = () => {
  const [actionState, action] = useActionState(
    signIn,
    EMPTY_ACTION_STATE
  );

  return (
    <form action={action} className="space-y-4">
      <GeneralError actionState={actionState} />
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          className="w-full"
        />
        <FieldError actionState={actionState} name="email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Enter your password"
          className="w-full"
        />
        <FieldError actionState={actionState} name="password" />
      </div>

      <SubmitButton label="Sign In" className="w-full" />
    </form>
  );
};

export { SignInForm };
