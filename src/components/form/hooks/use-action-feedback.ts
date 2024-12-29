import { useEffect, useRef } from 'react';

import { ActionState } from '../utils/to-action-state';

type onArgs = {
  actionState: ActionState;
};
type useActionFeedbackOptions = {
  onSuccess: (onArgs: onArgs) => void;
  onError: (onArgs: onArgs) => void;
};

export const useActionFeedback = (
  actionState: ActionState,
  options: useActionFeedbackOptions
) => {
  const prevTimeStamp = useRef(actionState.timeStamp);
  const isUpdate = prevTimeStamp.current !== actionState.timeStamp;

  useEffect(() => {
    if (!isUpdate) return;

    if (actionState.status === 'SUCCESS') {
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === 'ERROR') {
      options.onError?.({ actionState });
    }
    prevTimeStamp.current = actionState.timeStamp;
  }, [actionState, options, isUpdate]);
};
