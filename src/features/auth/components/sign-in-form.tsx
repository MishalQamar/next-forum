'use client';

import { FieldError } from '@/components/form/field-error';
import { SubmitButton } from '@/components/form/submit-button';
import { Form } from '@/components/form/utils/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useActionState } from 'react';
import { signIn } from '../actions/sign-in';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';

const SignInForm = () => {
  const [actionState, action] = useActionState(
    signIn,
    EMPTY_ACTION_STATE
  );
  return (
    <Form action={action} actionState={actionState}>
      <Label
        htmlFor="email"
        className="block text-sm font-medium leading-6"
      >
        Email address
      </Label>

      <Input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 mt-2"
      />
      <FieldError actionState={actionState} name="email" />

      <div className="flex items-center justify-between mt-2">
        <Label
          htmlFor="password"
          className="block text-sm font-medium leading-6 mt-2"
        >
          Password
        </Label>
        <div className="text-sm">
          <Link href="#" className="font-semibold">
            Forgot password?
          </Link>
        </div>
      </div>

      <Input
        id="password"
        name="password"
        type="password"
        required
        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 mt-2 "
      />

      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="Sign In" />

      {/* 
      <FieldError actionState={actionState} name="title" />

      <Label
        htmlFor="content"
        className="block text-sm font-medium leading-6 "
      >
        Content
      </Label>
      <Input
        id="content"
        name="content"
        type="text"
        defaultValue={
          (actionState.payload?.get('content') as string) ??
          job?.content
        }
      />
      <FieldError actionState={actionState} name="content" />

      <div className="flex space-x-2">
        <div className="w-1/2 ">
          <Label
            htmlFor="deadline"
            className="block text-sm font-medium leading-6 mb-2"
          >
            Deadline
          </Label>

          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get('deadline') as string) ??
              job?.deadline
            }
            ref={datePickerRef}
          />

          <FieldError actionState={actionState} name="deadline" />
        </div>

        <div className="w-1/2">
          <Label
            htmlFor="salary"
            className="block text-sm font-medium leading-6 mb-2"
          >
            Salary
          </Label>
          <Input
            id="salary"
            name="salary"
            type="number"
            step="0.1"
            defaultValue={
              (actionState.payload?.get('salary') as string) ??
              job?.salary
            }
          />
          <FieldError actionState={actionState} name="salary" />
        </div>
      </div>
      <SubmitButton label={job ? 'Edit' : 'Create'} /> */}
    </Form>
  );
};

export { SignInForm };
