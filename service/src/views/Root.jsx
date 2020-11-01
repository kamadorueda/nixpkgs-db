import React from 'react';
import {
  Alert,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from 'react-bootstrap';
import {
  HashRouter,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { DATA_SOURCE } from '../constants';
import { markdownTab } from '../components/Markdown';
import { useFetchJSON } from '../hooks/fetch';
import contentAbout from './About.md';
import contentContributing from './Contributing.md';
import { Search } from './Search';

const Tab = (props) => (
  <Nav.Item>
    <Nav.Link href={props.href}>
      {props.children}
    </Nav.Link>
  </Nav.Item>
);

export const Root = () => {
  const pkgs = useFetchJSON(`${DATA_SOURCE}/data/pkgs.json`, []);
  const revs = useFetchJSON(`${DATA_SOURCE}/data/revs.json`, []);

  return (
    <React.Fragment>
      <HashRouter>
        <Navbar>
          <Navbar.Brand>
            <h1>Nixpkgs Database!</h1>
            <h5>A database with packages from all versions, all commits and all channels.</h5>
          </Navbar.Brand>
        </Navbar>
        <Container fluid={true}>
          <Row>
            <Col sm={12}>
              <Nav variant="tabs">
                <Tab><Link to="/about">About</Link></Tab>
                <Tab><Link to="/contributing">Contributing</Link></Tab>
                <Tab><Link to="/search">Search</Link></Tab>
                <Tab href="https://github.com/kamadorueda/nixpkgs-db">Source</Tab>
                <Tab href="https://www.patreon.com/kamadorueda">Sponsor</Tab>
              </Nav>
            </Col>
          </Row>
          <br />
          <Switch>
            <Route exact={true} path="/search">
              <Search pkgs={pkgs} revs={revs} />
            </Route>
            <Route exact={true} path="/about">
              {markdownTab(contentAbout)}
            </Route>
            <Route exact={true} path="/contributing">
              {markdownTab(contentContributing)}
            </Route>
            <Redirect to="/search" />
          </Switch>
          <hr />
          <Row>
            <Col sm={12}>
              <Alert variant="light">
                A total of {pkgs.length} packages and {revs.length} commits put in your hands <br />
                Created and maintained by Kevin Amado
              </Alert>
            </Col>
          </Row>
        </Container>
      </HashRouter>
    </React.Fragment>
  );
};
