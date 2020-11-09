import React, { useState } from 'react';
import {
  Col,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { A } from '../components/A';
import { CopyButton } from '../components/Code';
import {
  badge,
  COLORS,
  STYLES,
} from '../utils/badges';

const FORMATS_FUNCTIONS = {
  "AsciiDoc": (imageURL, linkURL) => `
    image:${imageURL}[link="${linkURL}"]
  `,
  "HTML": (imageURL, linkURL) => `
    <a href="${linkURL}">
      <img src="${imageURL}">
    </a>
  `,
  "Markdown": (imageURL, linkURL) => `
    [![](${imageURL})](${linkURL})
  `,
  "ReStructuredText": (imageURL, linkURL) => `
    .. image:: ${imageURL}
      :target: ${linkURL}
  `,
};
const FORMATS = Object.keys(FORMATS_FUNCTIONS);

const getLinkURL = (pkg) => (
  `https://kamadorueda.github.io/nixpkgs-db/#/pkg/${encodeURIComponent(pkg)}`
);

export const SimpleBadge = ({ pkg }) => {
  const imageURL = badge({ pkg });
  const linkURL = getLinkURL(pkg);

  return (
    <A href={linkURL}>
      <img alt="badge" src={imageURL} />
    </A>
  );
};

export const Badges = () => {
  const { pkg } = useParams();

  const [format, setFormat] = useState(FORMATS[2]);
  const [label, setLabel] = useState(pkg);

  const onChangeFormat = (event) => {
    setFormat(event.target.value);
  };
  const onChangeLabel = (event) => {
    setLabel(event.target.value);
  };

  const linkURL = getLinkURL(pkg);

  return (
    <React.Fragment>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Copy Format</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="select"
          value={format}
          onChange={onChangeFormat}
        >
          {FORMATS.map((format) => <option id={format}>{format}</option>)}
        </Form.Control>
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Custom label</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          defaultValue={pkg}
          onChange={onChangeLabel}
          value={label}
        />
      </InputGroup>
      <br />
      {STYLES.map((style) => (
        <React.Fragment>
          <Row>
            {COLORS.map((color) => {
              const imageURL = badge({
                color,
                label,
                pkg,
                style,
              });
              const content = FORMATS_FUNCTIONS[format](imageURL, linkURL);

              return (
                <Col xs={12} sm={6} md={4}>
                  <Row>
                    <Col xs={12}>
                      <CopyButton content={content} /> <A href={linkURL}>
                        <img alt="badge" src={imageURL} />
                      </A>
                    </Col>
                  </Row>
                </Col>
              );
            })}
          </Row>
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
