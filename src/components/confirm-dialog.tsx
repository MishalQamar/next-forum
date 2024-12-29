import React, { cloneElement, useActionState, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from './ui/alert-dialog';
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from './form/utils/to-action-state';

import { Form } from '@/components/form/utils/form';
import { SubmitButton } from './form/submit-button';

type ConfirmDialogProps = {
  action: () => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick: () => void }>;
  title?: string;
  description?: string;
};

const UseConfirmDialog = ({
  action,
  trigger,
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. Make sure you understand the consequences.',
}: ConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const alertTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const [actionState, formAction] = useActionState(
    action,
    EMPTY_ACTION_STATE
  );

  const alertDialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form
              action={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
            >
              <SubmitButton label="confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [alertTrigger, alertDialog];
};

export { UseConfirmDialog };
