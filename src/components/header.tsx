import { getTopics } from '@/features/topics/queries/get-topics';
import { SortSelect } from './sort-select';
import { SearchInput } from './search-input';

export const Header = async () => {
  const topics = await getTopics();
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
      {/* Replace with your search + sort components */}
      <div className="flex gap-4 w-full">
        <SearchInput />
        <SortSelect topics={topics} />
      </div>
    </div>
  );
};
