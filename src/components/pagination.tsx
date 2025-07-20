'use client';

import { Button } from '@/components/ui/button';

type Pagination = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: Pagination;
  onChange: (pagination: Pagination) => void;
  metadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export const Pagination = ({
  pagination,
  onChange,
  metadata,
}: PaginationProps) => {
  const total = metadata.count;

  const startOffset =
    total === 0 ? 0 : pagination.page * pagination.size + 1;
  const endOffset =
    total === 0
      ? 0
      : Math.min(startOffset - 1 + pagination.size, total);
  const actualEndOffset = Math.min(endOffset, metadata.count);

  const handlePreviousPage = () => {
    onChange({ ...pagination, page: pagination.page - 1 });
  };

  const handleNextPage = () => {
    onChange({ ...pagination, page: pagination.page + 1 });
  };

  const previousButton = (
    <Button
      variant="outline"
      onClick={handlePreviousPage}
      disabled={pagination.page < 1}
    >
      Previous
    </Button>
  );
  const nextButton = (
    <Button
      variant="outline"
      onClick={handleNextPage}
      disabled={!metadata.hasNextPage}
    >
      Next
    </Button>
  );

  return (
    <div className="flex items-center justify-between border-t border-gray-200  px-4 py-3 sm:px-6">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startOffset}</span>{' '}
          to <span className="font-medium">{actualEndOffset}</span> of{' '}
          <span className="font-medium">{metadata.count}</span>{' '}
          results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end space-x-1">
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};
