import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { getGravatarURL } from '@/utils/get-gravatar-url';
import { Prisma, User } from '@prisma/client';

import { format, formatDistanceToNowStrict } from 'date-fns';

import { MarkdownText } from './markdown-text';

import { ReplyButton } from '@/features/posts/components/reply-button';
import { Element } from 'react-scroll';

import { useState } from 'react';
import { EditPostForm } from '@/features/posts/components/edit-post-form';
import { deletePost } from '@/features/posts/actions/delete-post';
import { Button } from './ui/button';
import { markPostAsBestAnswer } from '@/features/discussions/actions/mark-post-as-best-answer';
import clsx from 'clsx';
import { ActionButton } from './action-button';
import { isOwner } from '@/features/auth/utilis/is-owner';
type PostItemProps = {
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
  authUser: User | null;
  isDiscussionOwner: boolean;
  discussionId: string;
  solutionPostId: string | null;
};

const PostItem = ({
  post,
  authUser,
  isDiscussionOwner,
  discussionId,
  solutionPostId,
}: PostItemProps) => {
  const [activeMode, setActiveMode] = useState<'edit' | null>(null);
  const isPostOwner = isOwner(authUser, post.user?.id);

  const editButton = isPostOwner && (
    <Button
      variant="link"
      className="hover:no-underline text-[0.8rem] -ml-[1rem]"
      onClick={() =>
        setActiveMode(activeMode === 'edit' ? null : 'edit')
      }
    >
      edit
    </Button>
  );

  const deleteButton = isPostOwner && post.parentId !== null && (
    <ActionButton text="delete" action={() => deletePost(post.id)} />
  );

  const isSolution = solutionPostId === post.id;

  const bestAnswerButton = isDiscussionOwner && (
    <ActionButton
      text={
        isSolution ? 'Unmark best solution' : 'Mark best solution'
      }
      action={() =>
        markPostAsBestAnswer(
          isSolution ? null : post.id,
          discussionId
        )
      }
    />
  );

  return (
    <Element id={post.id} name={post.id}>
      <Card
        className={clsx(
          'p-4 flex-1 flex gap-y-1 gap-x-8 relative',
          isSolution && 'border-2 border-primary'
        )}
      >
        <div className="flex space-x-3 text-gray-900 items-start">
          {/*  <p className="text-sm text-muted-foreground">
            {comment.isOwner
              ? 'You'
              : comment.user?.username ?? 'Deleted User'}
          </p> */}
          <Avatar>
            {post.user && (
              <AvatarImage
                src={getGravatarURL(post.user?.email ?? '')}
              />
            )}
            <AvatarFallback>
              {post.user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">
              {post.user?.username || '[user deleted]'}
            </p>
            <span className="text-xs text-muted-foreground ">
              posted{' '}
              <time
                dateTime={post.createdAt.toISOString()}
                title={format(post.createdAt, 'PPpp')}
              >
                {formatDistanceToNowStrict(post.createdAt)}
              </time>{' '}
              ago
            </span>
          </div>
        </div>

        {activeMode === 'edit' ? (
          <EditPostForm
            post={post}
            handleActiveMode={setActiveMode}
          />
        ) : (
          <MarkdownText content={post.body} />
        )}

        <div className="flex gap-1 text-[10px] text-gray-600 mt-1">
          {authUser ? (
            <>
              <ReplyButton postId={post.id} />
              {editButton}
              {deleteButton}
              {bestAnswerButton}
            </>
          ) : null}
        </div>
        {isSolution && (
          <div className="absolute top-0 right-0 bg-purple-100 text-primary px-3 py-1 text-xs uppercase tracking-wide font-semibold rounded-bl  shadow-sm">
            Best Answer
          </div>
        )}
      </Card>
    </Element>
  );
};

export { PostItem };
