import React from 'react';
import ReactDOM from 'react-dom';
import {
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

import contentAbout from './views/About.md';
import contentContributing from './views/Contributing.md';
import { markdownTab } from './components/Markdown';
import { Search } from './views/Search';

const Root = () => (
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
              <Nav.Item>
                <Nav.Link>
                  <Link to="/about">About</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link to="/contributing">Contributing</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link to="/search">Search</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://github.com/kamadorueda/nixpkgs-db">
                  Source
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://www.patreon.com/kamadorueda">
                  Sponsor
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <br />
        <Switch>
          <Route exact={true} path="/search" component={Search} />
          <Route exact={true} path="/about" component={markdownTab(contentAbout)} />
          <Route exact={true} path="/contributing" component={markdownTab(contentContributing)} />
          <Redirect to="/search" />
        </Switch>
      </Container>
    </HashRouter>
  </React.Fragment>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
