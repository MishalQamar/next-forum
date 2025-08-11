import { ActionState } from './utils/to-action-state';

type GeneralErrorProps = {
  actionState: ActionState;
};

const GeneralError = ({ actionState }: GeneralErrorProps) => {
  if (!actionState.message || actionState.status !== 'ERROR') return null;

  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
      <p className="text-sm text-red-600 dark:text-red-400">
        {actionState.message}
      </p>
    </div>
  );
};

export { GeneralError };
