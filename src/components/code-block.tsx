import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

type Props = {
  children: React.ReactElement;
};

export const CodeBlock: React.FC<Props> = ({ children }) => {
  // getting the code language
  // attempt to select the child node's className
  const className = children?.props?.className || '';
  // check whether a language was specified in the markdown
  const match = className.match(/language-(?<lang>.*)/);
  // extract the language from the match, or provide one if not specified
  const language: Language = match?.groups?.lang || 'markdown';

  // getting the code
  // select the text content of the <code> node, and trim any whitespace
  const code = children?.props?.children.trim();

  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style} data-language={language}>
          <code>
            {tokens.map((line, i) => (
              <div
                key={i}
                data-line={i + 1}
                {...getLineProps({ line, key: i })}
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
};
