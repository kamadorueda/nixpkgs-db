import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Col, Row } from 'react-bootstrap';

import { A } from './A';
import { CodeBlock } from './Code';

const renderers = {
  break: () => <br />,
  code: ({ language, value }) => <CodeBlock
    content={value}
    dedent={false}
    lang={language}
  />,
  heading: ({ children, level }) => React.createElement(
    "h".concat(level + 1), {}, children,
  ),
  text: ({ children }) => <span>{children}</span>,
  link: ({ href, children}) => <A href={href}>{children}</A>,

  // paragraph: (props) => <p>{props.children}</p>,
  // emphasis: (props) => <em>{props.children}</em>,
  // strong: (props) => <strong>{props.children}</strong>,
  // thematicBreak: (props) => <hr>{props.children}</hr>,
  // blockquote: (props) => <blockquote>{props.children}</blockquote>,
  // image: (props) => <img>{props.children}</img>,
  // linkReference: (props) => <a>{props.children}</a>,
  // imageReference: (props) => <img>{props.children}</img>,
  // listItem: (props) => <li>{props.children}</li>,
  // inlineCode: (props) => <code>{props.children}</code>,
  // list: (props) => <ul> or <ol>{props.children}</ul> or <ol>,
  // {/* heading: (props) => <h1> through <h6>{props.children}</h1> through <h6>, */}
}

export const Markdown = (props) => (
  <ReactMarkdown
    children={props.content}
    plugins={[gfm]}
    renderers={renderers}
  />
)

export const markdownTab = (content) => () => {
  return (
    <Row>
      <Col sm={12}>
        <Markdown content={content} />
      </Col>
    </Row>
  );
}
