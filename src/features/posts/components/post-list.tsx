'use client';

import { PostItem } from '@/components/post-item';
import { Prisma } from '@prisma/client';
import { useEffect } from 'react';
import { scroller } from 'react-scroll';
import { User } from '@prisma/client';

type PostListProps = {
  posts: Prisma.PostGetPayload<{
    include: {
      user: {
        select: {
          id: true;
          username: true;
          email: true;
        };
      };
    };
  }>[];
  scrollId?: string;
  authUser: User | null;
  isDiscussionOwner: boolean;
  discussionId: string;
  solutionPostId: string | null;
};

export const PostList = ({
  posts,
  scrollId,
  authUser,
  isDiscussionOwner,
  discussionId,
  solutionPostId,
}: PostListProps) => {
  useEffect(() => {
    if (scrollId) {
      scroller.scrollTo(scrollId, {
        duration: 500,
        smooth: true,
        offset: -50,
        block: 'start',
      });
    }
  }, [scrollId]);

  return (
    <>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          authUser={authUser}
          isDiscussionOwner={isDiscussionOwner}
          discussionId={discussionId}
          solutionPostId={solutionPostId}
        />
      ))}
    </>
  );
};
