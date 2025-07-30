'use client';
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from '@/components/ui/select';

import { capitalizeFirstLetter } from '@/utils/capitalise-first-letter';
import { useImperativeHandle, useState } from 'react';
import { useDiscussionStore } from '@/features/discussions/hooks/use-disussion-store';

export type ImperativeHandleFromSelect = {
  reset: () => void;
};

type SelectTopicProps = {
  id: string;
  name: string;
  defaultValue?: string;
  imperativeHandleRef?: React.RefObject<ImperativeHandleFromSelect | null>;
};

export const SelectTopic = ({
  imperativeHandleRef,

  defaultValue,
}: SelectTopicProps) => {
  const topics = useDiscussionStore((state) => state.topics);
  const [topicId, setTopicId] = useState<string | undefined>(
    defaultValue ?? undefined
  );

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => {
      setTopicId('');
    },
  }));

  return (
    <>
      <Select
        value={topicId}
        onValueChange={setTopicId}
        name="topicId"
      >
        <SelectTrigger id="topicId" className="w-[180px]">
          <SelectValue placeholder="Choose a Topic" />
        </SelectTrigger>
        <SelectContent>
          {topics.map((topic) => (
            <SelectItem key={topic.id} value={topic.id}>
              {capitalizeFirstLetter(topic.title)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
