import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Col, Row } from 'react-bootstrap';

import { CodeBlock } from './Code';

const renderers = {
  text: (props) => <span>{props.children}</span>,
  break: () => <br />,
  heading: (props) => React.createElement("h".concat(props.level + 1), {}, props.children),
  code: (props) => <CodeBlock lang={props.language} content={props.value} />,
  // paragraph: (props) => <p>{props.children}</p>,
  // emphasis: (props) => <em>{props.children}</em>,
  // strong: (props) => <strong>{props.children}</strong>,
  // thematicBreak: (props) => <hr>{props.children}</hr>,
  // blockquote: (props) => <blockquote>{props.children}</blockquote>,
  // link: (props) => <a>{props.children}</a>,
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
