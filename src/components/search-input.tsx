'use client';
import { searchParser } from '../features/discussions/search-params';
import { useQueryState } from 'nuqs';
import { Input } from './ui/input';

import { useDebouncedCallback } from 'use-debounce';

export const SearchInput = () => {
  const [search, setSearch] = useQueryState('search', searchParser);

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250
  );

  return (
    <Input
      defaultValue={search}
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      className="flex-1 p-2 border rounded-md"
    />
  );
};
