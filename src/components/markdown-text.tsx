import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Import style from cjs path, which has correct type
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type PostMarkdownProps = {
  content: string;
};

export const MarkdownText = ({ content }: PostMarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...rest }) {
          const match = /language-(\w+)/.exec(className || '');
          const { ref, ...propsWithoutRef } = rest;

          return match ? (
            <SyntaxHighlighter
              PreTag="div"
              language={match[1]}
              style={vscDarkPlus as any} // no type assertion needed here
              {...propsWithoutRef}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...rest}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
