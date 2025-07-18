import { serialize } from './features/discussions/search-params';

export const loginPath = () => ' /login';
export const registerPath = () => '/register';

export const discussionPath = (discussionId: string) =>
  `/dashboard/${discussionId}`;

export const homePath = () => '/dashboard';

export const noRepliesPath = () =>
  serialize(homePath(), { noreplies: true });

export const solvedPath = () =>
  serialize(homePath(), { solved: true });

export const unsolvedPath = () =>
  serialize(homePath(), { unsolved: true });

export const myDiscussionsPath = () =>
  serialize(homePath(), { mydiscussions: true });
export const participatingPath = () =>
  serialize(homePath(), { participating: true });
export const goToPostPath = (
  discussionId: string,
  postId: string,
  page: number
) => `${discussionId}?page=${page}&postId=${postId}`;
