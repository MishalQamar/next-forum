import { toast } from 'sonner';
import { useActionFeedback } from '../hooks/use-action-feedback';
import { ActionState } from './to-action-state';

type FormProps = {
  children: React.ReactNode;
  action: (payload: FormData) => void;
  actionState: ActionState;
  onSuccess?: () => void;
  onError?: () => void;
};

const Form = ({
  children,
  action,
  actionState,
  onSuccess,
}: FormProps) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
      onSuccess?.();
    },
    onError: ({ actionState }) => {
      if (actionState.message) toast.error(actionState.message);
    },
  });

  return (
    <form action={action} className="space-y-2 flex flex-col flex-1">
      {children}
    </form>
  );
};

export { Form };
