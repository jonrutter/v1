import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';

type Props = {
  children: React.ReactElement;
};

export const CodeBlock: React.FC<Props> = ({ children }) => {
  // getting the code language
  // attempt to select the child node's className
  const className = children?.props?.className || '';
  // check whether a language was specified in the markdown
  const match = className.match(/language-(.*)/);
  // extract the language from regex match, defaulting to markdown if no match is found
  const language: Language = match !== null ? match[1] : 'markdown';

  // getting the code
  // select the text content of the <code> node, and trim any whitespace
  const code = children?.props?.children.trim();

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={vsDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={style}
          data-language={language}
          data-testid="code-block"
        >
          <code className="not-prose">
            {tokens.map((line, i) => (
              <div
                key={i}
                data-line={i + 1}
                data-testid="code-block-line"
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
