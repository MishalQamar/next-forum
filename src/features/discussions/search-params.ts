import {
  createSearchParamsCache,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
  createSerializer,
} from 'nuqs/server';

export const searchParser = parseAsString
  .withDefault('')
  .withOptions({
    shallow: false,
    clearOnDefault: true,
  });

export const selectParser = parseAsString
  .withDefault('all')
  .withOptions({
    shallow: false,
    clearOnDefault: true,
  });

export const noRepliesParser = parseAsBoolean
  .withDefault(false)
  .withOptions({
    shallow: false,
    clearOnDefault: true,
  });

export const solvedParser = parseAsBoolean
  .withDefault(false)
  .withOptions({
    shallow: false,
    clearOnDefault: true,
  });

export const unsolvedParser = parseAsBoolean
  .withDefault(false)
  .withOptions({
    shallow: false,
    clearOnDefault: true,
  });

export const mydiscussionsParser = parseAsBoolean
  .withDefault(false)
  .withOptions({
    shallow: false,
    clearOnDefault: true,
  });

export const participatingParser = parseAsBoolean
  .withDefault(false)
  .withOptions({
    shallow: false,
    clearOnDefault: true,
  });

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(3),
};

export const POSTS_PER_PAGE = 3;

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const postParser = parseAsString.withDefault('').withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  select: selectParser,
  noreplies: noRepliesParser,
  mydiscussions: mydiscussionsParser,
  participating: participatingParser,
  solved: solvedParser,
  unsolved: unsolvedParser,
  ...paginationParser,
  postId: postParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;

export const serialize = createSerializer({
  noreplies: noRepliesParser,
  mydiscussions: mydiscussionsParser,
  participating: participatingParser,
  solved: solvedParser,
  unsolved: unsolvedParser,
});
