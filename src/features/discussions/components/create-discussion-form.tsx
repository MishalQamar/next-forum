'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/form/field-error';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { useActionState, useEffect, useRef, useState } from 'react';
import { createDisucssion } from '../actions/create-discussion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { discussionPath } from '@/paths';
import {
  ImperativeHandleFromSelect,
  SelectTopic,
} from '@/components/form/select-topic';

import { MarkdownText } from '@/components/markdown-text';

import { useDiscussionStore } from '../hooks/use-disussion-store';
import { DiscussionFixedFormWrapper } from './discussion-fixed-form-wrapper';

import { LucideLoaderCircle } from 'lucide-react';
import { createDiscussionData } from '../types';

const MarkdownToolbar = dynamic(
  () =>
    import('@/components/markdown-toolbar').then(
      (mod) => mod.MarkdownToolbar
    ),
  { ssr: false }
);

export const CreateDiscussionForm = () => {
  const [actionState, action, isPending] = useActionState(
    createDisucssion,
    EMPTY_ACTION_STATE
  );
  const [markdownPreviewEnabled, setMarkdownPreviewEnabled] =
    useState(false);
  const [text, setText] = useState(
    (actionState.payload?.get('content') as string) || ''
  );

  const hideDiscussionForm = useDiscussionStore(
    (state) => state.hideDiscussionForm
  );
  const router = useRouter();

  const selectImperativeHandleRef =
    useRef<ImperativeHandleFromSelect>(null);

  useEffect(() => {
    if (actionState.status === 'SUCCESS' && actionState.data) {
      selectImperativeHandleRef.current?.reset();
      hideDiscussionForm();
      setText('');

      const data = actionState.data as createDiscussionData;
      if (data?.discussionId) {
        router.push(discussionPath(data.discussionId));
      }
    }
  }, [actionState, hideDiscussionForm, router]);

  return (
    <DiscussionFixedFormWrapper header="Create Discussion">
      <form className="space-y-1" action={action}>
        <div className="flex items-end space-x-4">
          <div className="flex-grow space-y-1">
            <Label htmlFor="title" className="sr-only">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter title"
              className="h-10"
              defaultValue={
                actionState.payload?.get('title') as string
              }
            />
            <div className="min-h-[1.25rem]">
              <FieldError actionState={actionState} name="title" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="topicId" className="sr-only">
              Topic
            </Label>
            <SelectTopic
              imperativeHandleRef={selectImperativeHandleRef}
              id="topicId"
              name="topicId"
              defaultValue={
                actionState.payload?.get('topicId') as string
              }
            />
            <div className="min-h-[1.25rem]">
              <FieldError actionState={actionState} name="topicId" />
            </div>
          </div>
        </div>

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
        <Button type="submit" disabled={isPending}>
          {isPending && (
            <LucideLoaderCircle className="h-4 w-4 animate-spin mr-2" />
          )}
          Create Discussion
        </Button>
      </form>
    </DiscussionFixedFormWrapper>
  );
};
