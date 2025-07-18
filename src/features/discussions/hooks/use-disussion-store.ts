/* import create from 'zustand';

type Store = {
  visible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

export const useCreateDiscussionStore = create<Store>((set) => ({
  visible: false,
  show: () => set({ visible: true }),
  hide: () => set({ visible: false }),
  toggle: () => set((state) => ({ visible: !state.visible })),
}));
 */

import { create } from 'zustand';
import { Prisma } from '@prisma/client';

type Topic = Prisma.TopicGetPayload<{
  select: {
    id: true;
    title: true;
  };
}>;

type Store = {
  visible: boolean;
  showDiscussionForm: () => void;
  hideDiscussionForm: () => void;
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
};

export const useDiscussionStore = create<Store>((set) => ({
  visible: false,
  showDiscussionForm: () => set({ visible: true }),
  hideDiscussionForm: () => set({ visible: false }),

  topics: [],
  setTopics: (topics) => set({ topics }),
}));
