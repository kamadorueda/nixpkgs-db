import React from 'react';
import ReactMarkdown from 'react-markdown';

const renderers = {
  text: (props) => <span>{props.children}</span>,
  break: () => <br />,
  heading: (props) => React.createElement("h".concat(props.level + 1), {}, props.children),

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
  // code: (props) => <pre><code>{props.children}</code></pre>,
  // list: (props) => <ul> or <ol>{props.children}</ul> or <ol>,
  // {/* heading: (props) => <h1> through <h6>{props.children}</h1> through <h6>, */}
}

export const Markdown = (props) => (
  <ReactMarkdown
    children={props.content}
    renderers={renderers}
  />
)
