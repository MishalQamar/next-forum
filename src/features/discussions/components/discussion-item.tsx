'use client';

import { Prisma } from '@prisma/client';
import { LucidePin } from 'lucide-react';
import pluralize from 'pluralize';
import { deleteDiscussion } from '../actions/delete-discussion';
import { ActionButton } from '@/components/action-button';

type DiscussionItemProps = {
  discussion: Prisma.DiscussionGetPayload<{
    include: {
      topic: {
        select: {
          id: true;
          title: true;
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
  isDiscussionOwner: boolean;
};

export const DiscussionItem = ({
  discussion,
  isDiscussionOwner,
}: DiscussionItemProps) => {
  if (!discussion) {
    return <div className="p-6">Discussion not found.</div>;
  }

  const deleteButton = isDiscussionOwner && (
    <ActionButton
      text="delete"
      action={() => deleteDiscussion(discussion.id)}
    />
  );

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-2 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-0.5 text-sm text-gray-600">
            {discussion.topic.title}
          </span>

          <div className="text-lg font-medium flex items-center">
            {discussion.pinned ? (
              <LucidePin className="w-4 h-4" />
            ) : null}
            {discussion.title}
          </div>

          <div className="-mb-1">{deleteButton}</div>
        </div>

        <div className="text-sm  ">
          {pluralize('reply', discussion._count.posts, true)}
        </div>
      </div>
    </>
  );
};
