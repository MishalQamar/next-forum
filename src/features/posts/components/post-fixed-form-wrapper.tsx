import { FixedFormWrapper } from '@/components/fixed-form-wrapper';

import { usePostStore } from '../hooks/use-post-store';
import { useDiscussionStore } from '@/features/discussions/hooks/use-disussion-store';

type DiscussionFixedFormWrapperProps = {
  header: string;
  children: React.ReactNode;
};
export const PostFixedFormWrapper = ({
  header,
  children,
}: DiscussionFixedFormWrapperProps) => {
  const visible = usePostStore((state) => state.visible);
  const hidePostForm = usePostStore((state) => state.hidePostForm);
  return (
    <FixedFormWrapper
      header={header}
      children={children}
      visible={visible}
      hideForm={hidePostForm}
    />
  );
};
