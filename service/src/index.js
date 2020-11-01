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
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Search } from './views/Search';

const Root = () => (
  <React.Fragment>
    <Router>
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
                <Nav.Link href="/nixpkgs-db">Search</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/nixpkgs-db/about">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/nixpkgs-db/contributing">Contributing</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <br />
        <Switch>
          <Route exact={true} path="/nixpkgs-db">
            <Search />
          </Route>
          <Route exact={true} path="/nixpkgs-db/about">
            ...
          </Route>
          <Route exact={true} path="/nixpkgs-db/contributing">
            ...
          </Route>
        </Switch>
      </Container>
    </Router>
  </React.Fragment>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
