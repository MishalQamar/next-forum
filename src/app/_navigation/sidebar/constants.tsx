import {
  homePath,
  myDiscussionsPath,
  noRepliesPath,
  participatingPath,
  solvedPath,
  unsolvedPath,
} from '@/paths';
import { NavItem } from './types';

export const navItems: NavItem[] = [
  {
    title: 'All Discussions',
    filterKey: null,

    href: homePath(),
  },
  {
    title: 'No replies',
    filterKey: 'noreplies',

    href: noRepliesPath(),
  },
  {
    title: 'Solved',
    filterKey: 'solved',

    href: solvedPath(),
  },
  {
    title: 'Unsolved',
    filterKey: 'unsolved',

    href: unsolvedPath(),
  },
];

export const authNavItems: NavItem[] = [
  {
    title: 'My discussions',
    filterKey: 'mydiscussions',
    href: myDiscussionsPath(),
  },
  {
    title: 'Participating',
    filterKey: 'participating',
    href: participatingPath(),
  },
];
