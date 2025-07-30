'use client';

import { Pagination } from '@/components/pagination';
import { useQueryState, useQueryStates } from 'nuqs';
import {
  paginationOptions,
  paginationParser,
  postParser,
  searchParser,
  selectParser,
} from '../search-params';
import { useRef, useEffect } from 'react';

type DiscussionMetadata = {
  count: number;
  hasNextPage: boolean;
};

export const DiscussionPagination = ({
  discussionsMetadata,
}: {
  discussionsMetadata: DiscussionMetadata;
}) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  const [search] = useQueryState('search', searchParser);
  const [select] = useQueryState('select', selectParser);

  const prevSearch = useRef(search);
  const prevSelect = useRef(select);
  const [, setPostId] = useQueryState('postId', postParser);
  useEffect(() => {
    setPostId('');
  }, [setPostId]);
  useEffect(() => {
    if (
      search === prevSearch.current &&
      select === prevSelect.current
    )
      return;
    // Reset pagination if search or select changes
    prevSelect.current = select;
    prevSearch.current = search;
    setPagination({ ...pagination, page: 0 });
  }, [search, select, pagination, setPagination, setPostId]);
  return (
    <Pagination
      pagination={pagination}
      onChange={setPagination}
      metadata={discussionsMetadata}
    />
  );
};
