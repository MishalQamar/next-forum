import { Header } from '@/components/header';
import { DiscussionPagination } from '../../features/discussions/components/discussion-pagination';
import { DiscussionPreview } from '../../features/discussions/components/discussion-preview';
import { getDiscussions } from '../../features/discussions/queries/get-discussions';
import { searchParamsCache } from '../../features/discussions/search-params';

import { SearchParams } from 'nuqs';

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

async function HomePage({ searchParams }: HomePageProps) {
  const parsedSearchParams = await searchParamsCache.parse(
    searchParams
  );

  const { list: discussions, metadata: disussionsMetadata } =
    await getDiscussions(parsedSearchParams);

  if (discussions.length === 0) {
    return <div className="p-6">No discussions found.</div>;
  }

  return (
    <>
      {/* <NavBar /> */}
      <Header />
      {discussions.map((discussion) => (
        <DiscussionPreview
          discussion={discussion}
          key={discussion.id}
        />
      ))}
      <DiscussionPagination
        discussionsMetadata={disussionsMetadata}
      />
    </>
  );
}

export default HomePage;
