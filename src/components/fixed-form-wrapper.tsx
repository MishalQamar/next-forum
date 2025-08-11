'use client';

import clsx from 'clsx';
import { Button } from './ui/button';
import { LucideX } from 'lucide-react';

type FixedFormWrapperProps = {
  header: string;
  children: React.ReactNode;
  visible: boolean;
  hideForm: () => void;
};

export const FixedFormWrapper = ({
  header,
  children,
  visible,
  hideForm,
}: FixedFormWrapperProps) => {
  return (
    <div
      data-fixed-form
      className={clsx(
        'fixed bottom-0 left-0 right-0 w-full z-50 p-6 m-0 border-t border-gray-100 space-y-3 overflow-hidden rounded-t-[10px] bg-white text-sm font-medium shadow-sm outline-none transition-all duration-300 ease-in-out transform',
        visible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-full opacity-0 pointer-events-none'
      )}
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="font-medium mb- text-gray-900">
            {header}
          </div>
          <div>
            <Button
              variant="outline"
              className="mb-4"
              onClick={hideForm}
            >
              <LucideX className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
