'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Job } from '@prisma/client';
import { upsertJob } from '../actions/upsert-job';
import { SubmitButton } from '@/components/form/submit-button';
import { useActionState, useRef } from 'react';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { FieldError } from '@/components/form/field-error';

import { DatePicker } from '@/components/form/date-picker';
import { Form } from '@/components/form/utils/form';

type JobUpsertFormProps = {
  job?: Job;
};

const JobUpsertForm = ({ job }: JobUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertJob.bind(null, job?.id),
    EMPTY_ACTION_STATE
  );

  const datePickerRef = useRef<{ reset: () => void }>(null);

  const handleSuccess = () => {
    datePickerRef.current?.reset();
  };

  return (
    <Form
      action={action}
      actionState={actionState}
      onSuccess={handleSuccess}
    >
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get('title') as string) ?? job?.title
        }
      />
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
      <SubmitButton label={job ? 'Edit' : 'Create'} />
    </Form>
  );
};

export { JobUpsertForm };
