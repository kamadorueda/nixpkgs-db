import React from 'react';
import {
  Col,
  Container,
  Nav,
  Row,
} from 'react-bootstrap';
import {
  HashRouter,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {
  RiBrushLine,
  RiCodeSSlashLine,
  RiHeart3Line,
  RiInformationLine,
  RiSearchLine,
} from 'react-icons/ri';
import 'bootstrap/dist/css/bootstrap.min.css';

import contentAbout from './About.md';
import contentContributing from './Contributing.md';
import contentSource from './Source.md';
import contentSponsor from './Sponsor.md';
import { GITHUB_RAW_NIXPKGS_DB } from '../constants';
import { A } from '../components/A';
import { markdownTab } from '../components/Markdown';
import { useFetchJSON } from '../hooks/fetch';
import { Pkg } from './Pkg';
import { Search } from './Search';

const Tab = (props) => (
  <Nav.Item>
    <Nav.Link href={props.href}>
      {props.children}
    </Nav.Link>
  </Nav.Item>
);

export const Root = () => {
  const pkgs = useFetchJSON(`${GITHUB_RAW_NIXPKGS_DB}/data/pkgs.json`, []);
  const revs = useFetchJSON(`${GITHUB_RAW_NIXPKGS_DB}/data/revs.json`, []);

  return (
    <Container fluid={true}>
      {/* Header */}
      <A href="/nixpkgs-db" remote={false}>
        <Row>
          <Col sm={12}>
            <h1>Nixpkgs Database!</h1>
            <h2 style={{ fontSize: "1rem" }}>
              A database with packages at all versions, from all channels.
            </h2>
          </Col>
        </Row>
      </A>

      {/* Content */}
      <HashRouter>
        {/* Navigation tabs */}
        <Row>
          <Col sm={12}>
            <Nav variant="tabs">
              <Tab>
                <Link to="/about"><RiInformationLine /> About</Link>
              </Tab>
              <Tab>
                <Link to="/contributing"><RiBrushLine /> Contributing</Link>
              </Tab>
              <Tab>
                <Link to="/search"><RiSearchLine /> Search</Link>
              </Tab>
              <Tab>
                <Link to="/source"><RiCodeSSlashLine /> Source</Link>
              </Tab>
              <Tab>
                <Link to="/sponsor"><RiHeart3Line /> Sponsor</Link>
              </Tab>
            </Nav>
          </Col>
        </Row>
        <br />

        {/* Dynamic page body */}
        <Switch>
          <Route exact={true} path="/about">
            {markdownTab(contentAbout)}
          </Route>
          <Route exact={true} path="/contributing">
            {markdownTab(contentContributing)}
          </Route>
          <Route exact={true} path="/pkg/:pkg">
            <Pkg />
          </Route>
          <Route exact={true} path="/pkg/:pkg/:version">
            <Pkg />
          </Route>
          <Route exact={true} path="/search">
            <Search pkgs={pkgs} revs={revs} />
          </Route>
          <Route exact={true} path="/source">
            {markdownTab(contentSource)}
          </Route>
          <Route exact={true} path="/sponsor">
            {markdownTab(contentSponsor)}
          </Route>
          <Redirect to="/search" />
        </Switch>
      </HashRouter>

      {/* Footer */}
      <hr />
      <Row>
        <Col sm={12}>
          <div style={{ color: "grey" }}>
            A total of {pkgs.length} packages and {revs.length} commits put in your hands! <br />
            Please help us improve by <A href="https://github.com/kamadorueda/nixpkgs-db/issues">reporting issues</A> <RiHeart3Line />
          </div>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};
