import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type PostMarkdownProps = {
  content: string;
};

type CodeProps = {
  inline?: boolean;
  className?: string | undefined;
  children?: React.ReactNode;
};

const components = {
  code({ inline, className, children, ...props }: CodeProps) {
    const match = /language-(\w+)/.exec(className || '');

    if (match && !inline) {
      return (
        <SyntaxHighlighter
          PreTag="div"
          language={match[1]}
          style={vscDarkPlus}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export const MarkdownText = ({ content }: PostMarkdownProps) => {
  return (
    <ReactMarkdown components={components}>{content}</ReactMarkdown>
  );
};
