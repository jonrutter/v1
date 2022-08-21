import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import clsx from 'clsx';

type Props = {
  children: React.ReactElement;
};

/**
 * Returns a string of tailwind classes to style the code language indicator, or an empty string the language is if not found
 */
const getLanguageClassname = (language: string) => {
  const className = {
    js: 'bg-[#F7DF1E] text-black',
    javascript: 'bg-[#F7DF1E] text-black',
    jsx: 'bg-[#F7DF1E] text-black',
    ts: 'bg-[#3178C6] text-white',
    tsx: 'bg-[#3178C6] text-white',
    typescript: 'bg-[#3178C6] text-white',
    html: 'bg-[#E34F26] text-black',
    css: 'bg-[#1572B6] text-white',
  };
  return className[language as keyof typeof className] || '';
};

/**
 * Provides a short version of certain languages, for the code block's language display.
 *
 * Returns an abbreviated form of the language if found, or else the original language.
 */
const formatDisplayLanguage = (language: string) => {
  if (language === 'javascript') return 'js';
  if (language === 'typescript') return 'ts';
  return language;
};

export const CodeBlock: React.FC<Props> = ({ children }) => {
  // getting the code language
  // attempt to select the child node's className
  const className = children.props.className || '';
  // check whether a language was specified in the markdown
  const match = className.match(/language-(.*)/);
  // extract the language from regex match, defaulting to markdown if no match is found
  const language: Language = match !== null ? match[1] : 'markdown';

  // getting the code
  // select the text content of the <code> node, and trim any whitespace
  const code = children.props.children.trim();

  // getting metadata
  const fileName = children.props.filename || null;

  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={style}
          data-language={language}
          data-testid="code-block"
          data-file={!!fileName}
        >
          {fileName && (
            <div className="min-w-full w-full px-5 py-2 text-sm text-[#d4d4d4] border-b-white/30 border-b-[1px] bg-[#1e1e1e] mb-4 sticky top-0 left-0">
              {fileName}
            </div>
          )}
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
          <div className="sticky z-10 right-0 w-40 -ml-40 -translate-x-4 translate-y-8 text-[#d4d4d4] inline-flex justify-end text-xs text-right select-none">
            <div
              className={clsx(
                'py-1 px-1 leading-none rounded-sm',
                getLanguageClassname(language)
              )}
            >
              {formatDisplayLanguage(language)}
            </div>
          </div>
        </pre>
      )}
    </Highlight>
  );
};
