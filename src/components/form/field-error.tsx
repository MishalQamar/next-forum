import { ActionState } from './utils/to-action-state';

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldErrors?.[name]?.[0];
  if (!message) return null;

  return (
    <div className="mt-1">
      <span className="text-sm text-red-600 dark:text-red-400">{message}</span>
    </div>
  );
};

export { FieldError };
