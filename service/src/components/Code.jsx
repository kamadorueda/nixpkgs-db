import React from 'react';
import dedent from 'dedent';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const Code = (props) => (
  <Highlight content={dedent(props.content)} lang={props.lang} />
);

export const CodeBlock = (props) => (
  <React.Fragment>
    <hr />
    <Code content={props.content} lang={props.lang} />
    <hr />
  </React.Fragment>
);

export const Highlight = (props) => (
  <SyntaxHighlighter language={props.lang} style={style}>
    {props.content}
  </SyntaxHighlighter>
);
