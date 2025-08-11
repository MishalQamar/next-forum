'use client';

import { useActionState, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/form/field-error';

import { MarkdownText } from '@/components/markdown-text';

import { PostFixedFormWrapper } from './post-fixed-form-wrapper';

import { createPost } from '../actions/create-post';
import { usePostStore } from '../hooks/use-post-store';

import {
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { POSTS_PER_PAGE } from '@/features/discussions/search-params';
import { goToPostPath } from '@/paths';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import dynamic from 'next/dynamic';

import { SubmitButton } from '@/components/submit-button';
import { createPostData } from '../types';
const MarkdownToolbar = dynamic(
  () =>
    import('@/components/markdown-toolbar').then(
      (mod) => mod.MarkdownToolbar
    ),
  { ssr: false }
);

export const CreatePostForm = () => {
  const { discussionId } = useParams<{ discussionId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const postId = searchParams.get('postId');

  const [actionState, action] = useActionState(
    createPost.bind(null, discussionId, postId),
    EMPTY_ACTION_STATE
  );
  const [markdownPreviewEnabled, setMarkdownPreviewEnabled] =
    useState(false);
  const [text, setText] = useState(
    actionState.payload?.get('content')?.toString() || ''
  );

  const hidePostForm = usePostStore((state) => state.hidePostForm);

  useEffect(() => {
    if (actionState.status === 'SUCCESS' && actionState.data) {
      hidePostForm();
      setText('');

      const data = actionState.data as createPostData;
      const { postId, count } = data;

      const page = Math.floor((count - 1) / POSTS_PER_PAGE);

      router.push(goToPostPath(discussionId, postId, page));
    }
  }, [actionState, hidePostForm, discussionId, router]);

  return (
    <PostFixedFormWrapper header="Reply to Discussion">
      <form className="space-y-1" action={action}>
        <div className="space-y-1 h-[10rem]">
          <Label htmlFor="content" className="sr-only">
            Content
          </Label>

          {!markdownPreviewEnabled && (
            <Textarea
              className="p-2 align-top h-full"
              id="content"
              placeholder="Enter content"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
            />
          )}

          {markdownPreviewEnabled && (
            <div className=" overflow-auto rounded-lg border p-2 h-full bg-slate-100">
              <MarkdownText content={text} />
            </div>
          )}

          {/* Always include hidden input for form submission */}
          <input type="hidden" name="content" value={text} />
        </div>

        <div className="min-h-[1.25rem]">
          <FieldError actionState={actionState} name="content" />
        </div>

        <div className="flex justify-between items-center">
          <MarkdownToolbar forId="content" />

          <Button
            type="button"
            variant="link"
            className="hover:no-underline"
            onClick={() => {
              setMarkdownPreviewEnabled(!markdownPreviewEnabled);
            }}
          >
            {markdownPreviewEnabled ? 'Edit' : 'Markdown Preview'}
          </Button>
        </div>

        <SubmitButton label=" Post reply" />
      </form>
    </PostFixedFormWrapper>
  );
};
