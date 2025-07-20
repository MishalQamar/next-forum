import { getDiscussion } from '../../../features/discussions/queries/get-discussion';
import { searchParamsCache } from '../../../features/discussions/search-params';

import { PostPagination } from '@/features/posts/components/post-pagination';
import { getPosts } from '@/features/posts/queries/get-posts';

import { SearchParams } from 'nuqs';

import { PostList } from '@/features/posts/components/post-list';

import { DiscussionItem } from '@/features/discussions/components/discussion-item';
import { getAuth } from '@/features/auth/actions/get-auth';
import { isOwner } from '@/features/auth/utilis/is-owner';

type DiscussionPageProps = {
  params: Promise<{
    discussionId: string;
  }>;
  searchParams: Promise<SearchParams>;
};

const DiscussionPage = async ({
  params,
  searchParams,
}: DiscussionPageProps) => {
  const { discussionId } = await params;
  const parsedSearchParams = await searchParamsCache.parse(
    searchParams
  );
  const { user } = await getAuth();
  const discussionPromise = getDiscussion(discussionId);
  const postPromise = await getPosts(
    discussionId,
    parsedSearchParams
  );

  const [discussion, { list: posts, metadata: postsMetadata }] =
    await Promise.all([discussionPromise, postPromise]);
  const isDiscussionOwner = isOwner(user, discussion?.userId);

  if (!discussion) {
    return <div className="p-6">Discussion not found.</div>;
  }

  return (
    <>
      <DiscussionItem
        discussion={discussion}
        isDiscussionOwner={isDiscussionOwner}
      />

      <PostList
        posts={posts}
        scrollId={parsedSearchParams.postId}
        authUser={user}
        isDiscussionOwner={isDiscussionOwner}
        discussionId={discussionId}
        solutionPostId={discussion.solutionPostId}
      />

      <PostPagination postsMetadata={postsMetadata} />
    </>
  );
};

export default DiscussionPage;
