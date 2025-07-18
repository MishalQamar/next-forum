'use client';

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/avatar';
import { discussionPath } from '@/paths';
import { getGravatarURL } from '@/utils/get-gravatar-url';
import { Prisma } from '@prisma/client';
import pluralize from 'pluralize';

import { LucidePin } from 'lucide-react';
import Link from 'next/link';

type DiscussionProps = {
  discussion: Prisma.DiscussionGetPayload<{
    include: {
      topic: {
        select: {
          id: true;
          title: true;
        };
      };
      posts: {
        where: {
          parentId: null;
        };
      };
      participants: {
        select: {
          user: {
            select: {
              email: true;
            };
          };
        };
      };
      _count: {
        select: {
          posts: {
            where: {
              NOT: {
                parentId: null;
              };
            };
          };
        };
      };
    };
  }>;
};

export const DiscussionPreview = ({
  discussion,
}: DiscussionProps) => {
  return (
    <Link href={discussionPath(discussion.id)}>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-2">
        {/* Row 1: Topic tag + title */}
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-0.5 text-sm text-gray-600">
            {discussion.topic.title}
          </span>
          <div className="text-lg font-medium flex items-center">
            {discussion.pinned ? (
              <LucidePin className="mr-2" />
            ) : null}
            {discussion.title}
          </div>
        </div>

        {/* Row 2: First post + avatars */}
        <div className="mt-2 flex justify-between items-center">
          {discussion.posts.length > 0 ? (
            <p className="text-sm text-muted-foreground line-clamp-1 max-w-prose">
              {discussion.posts[0].body}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No posts yet.
            </p>
          )}
          <div className="flex  flex-col justify-center">
            <div className="flex items-center space-x-2 ml-4">
              <div className="flex -space-x-2 *:ring-background *:ring-2 ">
                {discussion.participants
                  .slice(0, 3)
                  .map((participant) => (
                    <Avatar key={participant.user.email}>
                      <AvatarImage
                        src={getGravatarURL(
                          participant.user.email ?? ''
                        )}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ))}
              </div>
              {discussion.participants.length > 3 && (
                <span className="text-sm text-gray-500">
                  + {discussion.participants.length - 3} more
                </span>
              )}
            </div>

            <div className="text-sm mt-3 self-end">
              {pluralize('reply', discussion._count.posts, true)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
