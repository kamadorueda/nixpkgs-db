import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Code } from '../components/Code';
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

export const Badges = () => {
  const { pkg } = useParams();

  const [badgesData, setBadgesData] = useState([]);
  const [content, setContent] = useState("");
  const [format, setFormat] = useState(FORMATS[2]);
  const [label, setLabel] = useState(pkg);

  const linkURL = getLinkURL(pkg);

  useEffect(() => {
    const newBadgesData = [].concat.apply([],
      STYLES.map((style) => COLORS.map((color) => {
        const imageURL = badge({ color, label, pkg, style });
        const badgeContent = FORMATS_FUNCTIONS[format](imageURL, linkURL);

        return {
          badgeContent,
          color,
          imageURL,
          style,
        };
      }))
    );

    setBadgesData(newBadgesData);
    setContent(newBadgesData[0].badgeContent);
  }, [format, label, linkURL, pkg])

  const onBadgeSelection = (content) => () => {
    setContent(content);
  };
  const onChangeFormat = (event) => {
    setFormat(event.target.value);
  };
  const onChangeLabel = (event) => {
    setLabel(event.target.value);
  };

  return (
    <React.Fragment>
      Add the badge of your preference to your project!
      <br />
      It will tell your users the number of releases they can install with Nix.
      <br />
      It will also link to this page so they can get more information!
      <br />
      <br />
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
      <Row>
        {badgesData.map(({ badgeContent, color, imageURL, style }) => {
          const radioID = `${style}/${color}`;

          return (
            <Col xs={12} sm={6} md={4}>
              <input
                defaultChecked={radioID === "flat/blue"}
                id={radioID}
                name="badge"
                onClick={onBadgeSelection(badgeContent)}
                type="radio"
              /> <img alt="badge" src={imageURL} />
            </Col>
          );
        })}
      </Row>
      <br />
      <Code
        content={content}
        copyable={true}
        type="icon+copy+center"
      />
    </React.Fragment>
  );
};
