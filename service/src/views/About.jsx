import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { Markdown } from '../components/Markdown';
import content from './About.md';

export const About = () => {
  return (
    <Row>
      <Col sm={12}>
        <Markdown content={content} />
      </Col>
    </Row>
  );
}
