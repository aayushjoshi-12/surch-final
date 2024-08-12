// components/MarkdownRenderer.tsx
import React, { useRef, useMemo } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { Components } from 'react-markdown/lib/ast-to-react';

interface MarkdownRendererProps {
  markdown: string;
  syntaxStyle?: any;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
  syntaxStyle = atomDark,
}) => {
  const ref = useRef<SyntaxHighlighter>(null);

  const components = useMemo<Components>(
    () => ({
      code({ node, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : 'text'; // Default to 'text' if language is not found

        return (
          <SyntaxHighlighter
            ref={ref}
            style={syntaxStyle}
            language={language}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      },
    }),
    [syntaxStyle] // Recompute only if syntaxStyle changes
  );

  return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
};

export default MarkdownRenderer;
