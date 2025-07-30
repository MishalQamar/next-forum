import { create } from 'zustand';

type Store = {
  visible: boolean;
  showPostForm: () => void;
  hidePostForm: () => void;
};

export const usePostStore = create<Store>((set) => ({
  visible: false,
  showPostForm: () => set({ visible: true }),
  hidePostForm: () => set({ visible: false }),
}));
