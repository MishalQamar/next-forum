'use client';

import { Button } from '@/components/ui/button';
import { postParser } from '@/features/discussions/search-params';
import { usePostStore } from '@/features/posts/hooks/use-post-store';
import { useQueryState } from 'nuqs';
import { useEffect, useRef } from 'react';

type ReplyButtonProps = {
  postId: string;
};

export const ReplyButton = ({ postId }: ReplyButtonProps) => {
  const showPostForm = usePostStore((state) => state.showPostForm);
  const visible = usePostStore((state) => state.visible);
  const [, setPostId] = useQueryState('postId', postParser);
  const scrollTimeoutRef = useRef<number | undefined>(undefined);

  const handleReply = () => {
    setPostId(postId);
    showPostForm();
  };

  // Scroll the post to the top of the viewport when the form becomes visible
  useEffect(() => {
    if (visible) {
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Wait for the form to be fully rendered and animated
      scrollTimeoutRef.current = window.setTimeout(() => {
        const postElement = document.getElementById(postId);
        
        if (postElement) {
          // Calculate the position to scroll to (post at top with some padding)
          const postRect = postElement.getBoundingClientRect();
          const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetScrollTop = currentScrollTop + postRect.top - 20; // 20px padding from top
          
          // Ensure we don't scroll beyond the top of the page
          const finalScrollTop = Math.max(0, targetScrollTop);
          
          // Smooth scroll to position the post at the top of the viewport
          window.scrollTo({
            top: finalScrollTop,
            behavior: 'smooth'
          });
        }
      }, 150); // Wait for form animation to complete

      return () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [visible, postId]);

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
