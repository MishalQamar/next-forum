import { createPostData } from '@/features/posts/types';
import { ZodError } from 'zod';

export type ActionState = {
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  status?: 'SUCCESS' | 'ERROR';
  timeStamp: number;
  data?: createPostData;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: '',
  fieldErrors: {},
  timeStamp: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
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

export const toActionState = (
  message: string,
  status: ActionState['status'],
  data?: ActionState['data'],
  formData?: FormData
): ActionState => {
  return {
    message,
    fieldErrors: {},
    status,
    timeStamp: Date.now(),
    payload: formData,
    data,
  };
};
