'use client';
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
} from 'react';

import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { FieldError } from '@/components/form/field-error';
import { Prisma } from '@prisma/client';
import { editPost } from '../actions/edit-post';

type EditPostFormProps = {
  post: Prisma.PostGetPayload<{
    include: {
      user: {
        select: {
          id: true;
          username: true;
          email: true; // Include email for Gravatar URL generation
          /* avatar_url:true, */
        };
      };
    };
  }>;
  handleActiveMode: Dispatch<SetStateAction<'edit' | null>>;
};

export const EditPostForm = ({
  post,
  handleActiveMode,
}: EditPostFormProps) => {
  const [actionState, action] = useActionState(
    editPost.bind(null, post.id),
    EMPTY_ACTION_STATE
  );

  useEffect(() => {
    if (actionState.status === 'SUCCESS') {
      handleActiveMode(null);
    }
  }, [actionState, handleActiveMode]);

  return (
    <form action={action}>
      <textarea
        name="text"
        className="w-full border border-gray-300 rounded p-1 text-xs resize-y"
        defaultValue={post.body}
      />

      <FieldError actionState={actionState} name="text" />
      <div className="mt-1 flex gap-2 text-xs">
        <button
          className="text-blue-600 hover:underline"
          type="submit"
        >
          Save
        </button>
        <button
          className="text-gray-500 hover:underline"
          onClick={() => handleActiveMode(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
