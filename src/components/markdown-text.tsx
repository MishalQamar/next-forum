import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type PostMarkdownProps = {
  content: string;
};
export const MarkdownText = ({ content }: PostMarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...rest }) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            // @ts-ignore: Suppress ref and style typing errors here
            <SyntaxHighlighter
              PreTag="div"
              language={match[1]}
              // @ts-ignore: Suppress ref and style typing errors here
              style={vscDarkPlus}
              {...rest}
            >
              {children}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
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
