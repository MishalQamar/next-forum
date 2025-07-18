'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { register } from '../actions/register';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { FieldError } from '@/components/form/field-error';

export const RegisterForm = () => {
  const [actionState, action] = useActionState(
    register,
    EMPTY_ACTION_STATE
  );

  return (
    <form action={action}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username" // ✅ match schema
            type="text"
            placeholder="Your username"
            required
          />
          <FieldError actionState={actionState} name="username" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          <FieldError actionState={actionState} name="email" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
          />
          <FieldError actionState={actionState} name="password" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
          <FieldError
            actionState={actionState}
            name="confirmPassword"
          />
        </div>
      </div>

      <Button className="w-full mt-10">Register</Button>
    </form>
  );
};
