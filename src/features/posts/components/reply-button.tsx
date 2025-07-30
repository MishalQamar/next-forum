'use client';

import { Button } from '@/components/ui/button';
import { postParser } from '@/features/discussions/search-params';

import { usePostStore } from '@/features/posts/hooks/use-post-store';
import { useQueryState } from 'nuqs';

type ReplyButtonProps = {
  postId: string;
};

export const ReplyButton = ({ postId }: ReplyButtonProps) => {
  const showPostForm = usePostStore((state) => state.showPostForm);
  const [, setPostId] = useQueryState('postId', postParser);

  const handleReply = () => {
    setPostId(postId);
    showPostForm();
  };

  return (
    <Button
      onClick={handleReply}
      variant="link"
      className="hover:no-underline text-[0.8rem] -ml-[1rem]"
    >
      reply
    </Button>
  );
};
