import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Col, Row } from 'react-bootstrap';
import { vs as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const renderers = {
  text: (props) => <span>{props.children}</span>,
  break: () => <br />,
  heading: (props) => React.createElement("h".concat(props.level + 1), {}, props.children),
  code: (props) => (
    <React.Fragment>
      <hr />
      <SyntaxHighlighter language={props.language} style={style}>
        {props.value}
      </SyntaxHighlighter>
      <hr />
    </React.Fragment>
  )
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
