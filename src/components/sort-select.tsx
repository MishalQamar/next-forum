'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { selectParser } from '../features/discussions/search-params';

import { TopicWithPayload } from '@/features/topics/types';
import { capitalizeFirstLetter } from '@/utils/capitalise-first-letter';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { useDiscussionStore } from '@/features/discussions/hooks/use-disussion-store';

type SortSelectProps = {
  topics: TopicWithPayload[];
};

export const SortSelect = ({ topics }: SortSelectProps) => {
  const [select, setSelect] = useQueryState('select', selectParser);

  const handleSort = (value: string) => {
    setSelect(value);
  };

  const setTopics = useDiscussionStore((state) => state.setTopics);

  useEffect(() => {
    setTopics(topics);
  }, [setTopics, topics]);

  return (
    <Select value={select} onValueChange={handleSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose a Topic" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Topics</SelectItem>
        {topics.map((topic) => (
          <SelectItem key={topic.id} value={topic.title}>
            {capitalizeFirstLetter(topic.title)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
