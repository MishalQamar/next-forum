import '@github/markdown-toolbar-element';
import {
  LucideBold,
  LucideCode,
  LucideItalic,
  LucideLink,
} from 'lucide-react';

export const MarkdownToolbar = ({ forId }: { forId: string }) => {
  return (
    /* -ml-1 */
    <markdown-toolbar for={forId} className="flex items-center ">
      <md-bold className="cursor-pointer py-1.5 px-1">
        <LucideBold className="h-4 w-4" />
      </md-bold>

      <md-italic className="cursor-pointer py-1.5 px-1">
        <LucideItalic className="h-4 w-4" />
      </md-italic>

      <md-code className="cursor-pointer py-1.5 px-1">
        <LucideCode className="h-4 w-4" />
      </md-code>
      <md-link className="cursor-pointer py-1.5 px-1">
        <LucideLink className="h-4 w-4" />
      </md-link>

      {/*   <md-mention>mention</md-mention> */}
    </markdown-toolbar>
  );
};
