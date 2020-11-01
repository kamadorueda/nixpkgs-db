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
  Route,
  Switch,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                  <Link to="/">Search</Link>
                </Nav.Link>
              </Nav.Item>
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
            </Nav>
          </Col>
        </Row>
        <br />
        <Switch>
          <Route exact={true} path="/" component={Search} />
          <Route exact={true} path="/about">...</Route>
          <Route exact={true} path="/contributing">...</Route>
        </Switch>
      </Container>
    </HashRouter>
  </React.Fragment>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
