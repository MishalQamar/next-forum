import '@github/markdown-toolbar-element';
import {
  LucideBold,
  LucideCode,
  LucideItalic,
  LucideLink,
} from 'lucide-react';
import React from 'react';

export const MarkdownToolbar = ({ forId }: { forId: string }) => {
  const MarkdownToolbarTag = 'markdown-toolbar' as any;
  const MdBoldTag = 'md-bold' as any;
  const MdItalicTag = 'md-italic' as any;
  const MdCodeTag = 'md-code' as any;
  const MdLinkTag = 'md-link' as any;

  return React.createElement(
    MarkdownToolbarTag,
    { for: forId, className: 'flex items-center' },
    React.createElement(
      MdBoldTag,
      { className: 'cursor-pointer py-1.5 px-1' },
      React.createElement(LucideBold, { className: 'h-4 w-4' })
    ),
    React.createElement(
      MdItalicTag,
      { className: 'cursor-pointer py-1.5 px-1' },
      React.createElement(LucideItalic, { className: 'h-4 w-4' })
    ),
    React.createElement(
      MdCodeTag,
      { className: 'cursor-pointer py-1.5 px-1' },
      React.createElement(LucideCode, { className: 'h-4 w-4' })
    ),
    React.createElement(
      MdLinkTag,
      { className: 'cursor-pointer py-1.5 px-1' },
      React.createElement(LucideLink, { className: 'h-4 w-4' })
    )
  );
};
