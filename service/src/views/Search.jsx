import React, { useState } from 'react';
import {
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Jumbotron,
  Navbar,
  Pagination,
  Row,
} from 'react-bootstrap';

import { ProgressBar } from '../components/ProgressBar';
import { DATA_SOURCE, NIXPKGS_SOURCE } from '../constants';
import { useFetchJSON } from '../hooks/fetch';

const DEFAULT_PKG_NAME = "";
const RESULTS_PER_PAGE = 10;

const filterPkgs = (pkgs, pkgName) => (
  pkgs.filter((pkg) => pkg.includes(pkgName)).sort()
);

const sortByVersion = (data) => {
  var values = Object.entries(data);
  values.sort((a, b) => a[0] < b[0] ? 1 : -1);
  return values;
};

const Pkg = (props) => {
  const pkg = props.pkg;

  const dataSource = `${DATA_SOURCE}/data/pkgs/${pkg}.json`;
  const data = sortByVersion(useFetchJSON(dataSource, {}));

  if (data.length === 0) {
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} variant="link" eventKey={pkg}>
          <ProgressBar label="Loading..." variant="info" />
        </Accordion.Toggle>
      </Card>
    );
  } else {
    const lastVersion = data[0][0];
    const lastData = data[0][1];

    return (
      <Card>
        <Accordion.Toggle as={Card.Header} variant="link" eventKey={pkg}>
          <Row>
            <Col sm={3}>
              <b>
                {lastData.meta.homepage === "" ? pkg : (
                  <a href={lastData.meta.homepage} rel="noopener" target="blank">
                    {pkg}
                  </a>
                )}
              </b>
            </Col>
            <Col>{lastData.meta.description}</Col>
            <Col sm={1}>{data.length}</Col>
            <Col sm={2}>
              {lastData.meta.license?.fullName === undefined
                ? undefined
                : lastData.meta.license.fullName}
            </Col>
          </Row>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={pkg}>
          <Jumbotron>
            <Accordion defaultActiveKey={`${pkg} v${lastVersion} @ ${lastData.revs[1]}`}>
              {data.map((item) => {
                const itemVersion = item[0];
                const itemData = item[1];
                const itemKey = `${pkg} v${itemVersion} @ ${itemData.revs[1]}`;

                return (
                  <Card>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={itemKey}>
                      <a href={dataSource} rel="noopener" target="blank">
                        <b>{pkg} v{itemVersion}</b>
                      </a>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={itemKey}>
                      <Card.Body>
                        <Card.Text>
                          <Container fluid>
                            <Row>
                              <Col>
                                <code>
                                  $ <b>nix-shell</b> -p {pkg} -I nixpkgs={`${NIXPKGS_SOURCE}/archive/${itemData.revs[1]}.tar.gz`}
                                </code>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <code>
                                  $ <b>nix-env</b> -i {pkg} -f {`${NIXPKGS_SOURCE}/archive/${itemData.revs[1]}.tar.gz`}
                                </code>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Text>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              })}
            </Accordion>
          </Jumbotron>
        </Accordion.Collapse>
      </Card>
    );
  }
}

const Results = (props) => {
  const pkgs = props.pkgs;
  const revs = props.revs;

  const [page, setPage] = useState(1);
  const [pkgName, setPkgName] = useState(DEFAULT_PKG_NAME);
  const [matchingPackages, setMatchingPackages] = useState(filterPkgs(pkgs, DEFAULT_PKG_NAME));

  const onPkgNameChange = (event) => {
    setPkgName(event.target.value);
  };

  const onSearchButtonClick = () => {
    setPage(1);
    setMatchingPackages(filterPkgs(pkgs, pkgName));
  };

  const onPreviousButtonClick = () => {
    setPage(page - 1);
  };
  const onNextButtonClick = () => {
    setPage(page + 1);
  };

  const pageStart = Math.min(1 + (page - 1) * RESULTS_PER_PAGE, matchingPackages.length);
  const pageEnd = Math.min(page * RESULTS_PER_PAGE, matchingPackages.length);

  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="pkgName">Package name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="pkgName"
              aria-describedby="pkgName"
              defaultValue={DEFAULT_PKG_NAME}
              onChange={onPkgNameChange}
            />
            <Button onClick={onSearchButtonClick} variant="outline-primary" >
              Search
            </Button>
          </InputGroup>
        </Col>
        <Col sm={6}>
          <Pagination>
            <Pagination.Prev
              disabled={page === 1}
              onClick={onPreviousButtonClick}
            />
            <Pagination.Item disabled={true}>
              Showing packages {pageStart}-{pageEnd} of {matchingPackages.length}
            </Pagination.Item>
            <Pagination.Next
              disabled={page * RESULTS_PER_PAGE > matchingPackages.length}
              onClick={onNextButtonClick}
            />
          </Pagination>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Accordion defaultActiveKey={matchingPackages[0]}>
            <Card>
              <Accordion.Toggle as={Card.Header} variant="dark">
                <Row>
                  <Col sm={3}><b>Attribute</b></Col>
                  <Col><b>Description</b></Col>
                  <Col sm={1}><b>Versions</b></Col>
                  <Col sm={2}><b>License</b></Col>
                </Row>
              </Accordion.Toggle>
            </Card>
            {matchingPackages
              .slice(pageStart - 1, pageEnd)
              .map((pkg) => <Pkg key={pkg} pkg={pkg} />)}
          </Accordion>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Alert variant="light">
            A total of {pkgs.length} packages and {revs.length} commits put in your hands <br />
            Created and maintained by Kevin Amado
          </Alert>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export const Search = () => {
  const pkgs = useFetchJSON(`${DATA_SOURCE}/data/pkgs.json`, []);
  const revs = useFetchJSON(`${DATA_SOURCE}/data/revs.json`, []);

  return (
    <React.Fragment>
      <Navbar>
        <Navbar.Brand>
          <h1>Nixpkgs Database!</h1>
          <h5>A database with packages from all versions, all commits and all channels.</h5>
        </Navbar.Brand>
      </Navbar>
      <Container fluid={true}>
        {pkgs.length === 0 ? (
          <ProgressBar label="Loading..." variant="info" />
        ) : (
          <Results pkgs={pkgs} revs={revs} />
        )}
      </Container>
    </React.Fragment>
  );
}
