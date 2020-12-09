import React from 'react';
import dedentContent from 'dedent';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { RiFileCopyLine } from 'react-icons/ri';
import { defaultStyle as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const onCopy = () => alert('Copied!');

export const CopyButton = ({ content, type }) => {
  const style = { color: "#007bff" };

  let inner;
  switch (type) {
    case "icon":
      inner = <span style={style}><RiFileCopyLine /></span>
      break;
    case "icon+copy":
      inner = <span style={style}><RiFileCopyLine /> Copy</span>
      break;
    case "icon+copy+center":
      inner = <center style={style}><RiFileCopyLine /> Copy</center>
      break;
    default:
      throw type;
  }

  return (
    <CopyToClipboard onCopy={onCopy} text={content}>
      {inner}
    </CopyToClipboard>
  );
};

export const Highlight = ({
  content,
  lang,
}) => (
  <SyntaxHighlighter
    language={lang}
    style={style}
  >
    {content}
  </SyntaxHighlighter>
);

export const Code = ({
  content,
  dedent=true,
  copyable=false,
  lang,
}) => {
  const contentD = dedent ? dedentContent(content) : content;

  return (
    <React.Fragment>
      <Highlight
        content={contentD}
        lang={lang}
      />
      {copyable ? <CopyButton content={contentD} type="icon+copy+center" /> : undefined }
    </React.Fragment>
  );
};

export const CodeBlock = ({ content, dedent, copyable, lang }) => {
  return (
    <React.Fragment>
      <hr />
      <Code content={content} copyable={copyable} dedent={dedent} lang={lang} />
      <hr />
    </React.Fragment>
  );
};
