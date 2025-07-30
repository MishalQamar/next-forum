'use client';

import { useTransition } from 'react';
import { Button } from './ui/button';
import { LucideLoaderCircle } from 'lucide-react';
import { ActionState } from './form/utils/to-action-state';

type ActionButtonProps = {
  text: string;
  action: () => Promise<ActionState>;
};
export const ActionButton = ({ text, action }: ActionButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      variant="link"
      className="hover:no-underline text-[0.8rem] -ml-[1rem]"
      onClick={() => {
        startTransition(async () => {
          await action();
        });
      }}
    >
      <span className="flex items-center gap-1">
        {isPending && (
          <LucideLoaderCircle className=" h-[0.1rem] w-[0.1rem] animate-spin" />
        )}
        {text}
      </span>
    </Button>
  );
};
