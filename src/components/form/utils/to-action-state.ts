import { ZodError } from 'zod';

export type ActionState<TData = unknown> = {
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  status?: 'SUCCESS' | 'ERROR';
  timeStamp: number;
  data?: TData;
};

export const EMPTY_ACTION_STATE: ActionState<undefined> = {
  message: '',
  fieldErrors: {},
  timeStamp: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState<undefined> => {
  if (error instanceof ZodError) {
    return {
      message: '',
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      status: 'ERROR',
      timeStamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
      status: 'ERROR',
      timeStamp: Date.now(),
    };
  } else {
    return {
      message: ' an unknown error occurred',
      fieldErrors: {},
      payload: formData,
      status: 'ERROR',
      timeStamp: Date.now(),
    };
  }
};

export const toActionState = <TData>(
  message: string,
  status: ActionState<TData>['status'],
  data?: ActionState<TData>['data'],
  formData?: FormData
): ActionState<TData> => {
  return {
    message,
    fieldErrors: {},
    status,
    timeStamp: Date.now(),
    payload: formData,
    data,
  };
};
