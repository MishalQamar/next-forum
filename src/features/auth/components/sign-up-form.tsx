'use client';

import { FieldError } from '@/components/form/field-error';
import { GeneralError } from '@/components/form/general-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { signUp } from '../actions/sign-up';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { SubmitButton } from '@/components/submit-button';

const SignUpForm = () => {
  const [actionState, action] = useActionState(
    signUp,
    EMPTY_ACTION_STATE
  );

  console.log('Sign-up form actionState:', actionState);

  return (
    <form action={action} className="space-y-4">
      <GeneralError actionState={actionState} />
      
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          placeholder="Choose a username"
          className="w-full"
        />
        <FieldError actionState={actionState} name="username" />
      </div>

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
          autoComplete="new-password"
          placeholder="Create a password (min 6 characters)"
          className="w-full"
        />
        <FieldError actionState={actionState} name="password" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          placeholder="Confirm your password"
          className="w-full"
        />
        <FieldError actionState={actionState} name="confirmPassword" />
      </div>

      <SubmitButton label="Sign Up" className="w-full" />
    </form>
  );
};

export { SignUpForm };
