import { FixedFormWrapper } from '@/components/fixed-form-wrapper';
import { useDiscussionStore } from '../hooks/use-disussion-store';

type DiscussionFixedFormWrapperProps = {
  header: string;
  children: React.ReactNode;
};
export const DiscussionFixedFormWrapper = ({
  header,
  children,
}: DiscussionFixedFormWrapperProps) => {
  const visible = useDiscussionStore((state) => state.visible);
  const hideDiscussionForm = useDiscussionStore(
    (state) => state.hideDiscussionForm
  );
  return (
    <FixedFormWrapper
      header={header}
      visible={visible}
      hideForm={hideDiscussionForm}
    >
      {children}
    </FixedFormWrapper>
  );
};
