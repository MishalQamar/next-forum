import '@github/markdown-toolbar-element';
import {
  LucideBold,
  LucideCode,
  LucideItalic,
  LucideLink,
} from 'lucide-react';
import React from 'react';

export const MarkdownToolbar = ({ forId }: { forId: string }) => {
  const MarkdownToolbarTag = 'markdown-toolbar';
  const MdBoldTag = 'md-bold';
  const MdItalicTag = 'md-italic';
  const MdCodeTag = 'md-code';
  const MdLinkTag = 'md-link';

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
