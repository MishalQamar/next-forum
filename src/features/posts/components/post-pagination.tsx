'use client';

import { Pagination } from '@/components/pagination';
import {
  paginationParser,
  paginationOptions,
  searchParser,
  selectParser,
} from '../../discussions/search-params';
import { useQueryState, useQueryStates } from 'nuqs';

import { useRef, useEffect } from 'react';

type PostMetadata = {
  count: number;
  hasNextPage: boolean;
};

export const PostPagination = ({
  postsMetadata,
}: {
  postsMetadata: PostMetadata;
}) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  const [search] = useQueryState('search', searchParser);
  const [select] = useQueryState('select', selectParser);

  const prevSearch = useRef(search);
  const prevSelect = useRef(select);
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
  }, [search, select, pagination, setPagination]);
  return (
    <Pagination
      pagination={pagination}
      onChange={setPagination}
      metadata={postsMetadata}
    />
  );
};
