import React, { useState } from 'react';
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Jumbotron,
  Pagination,
  Row,
  Table,
} from 'react-bootstrap';

import { ProgressBar } from '../components/ProgressBar';
import { GITHUB_RAW_NIXPKGS_DB, GITHUB_NIXPKGS } from '../constants';
import { useFetchJSON } from '../hooks/fetch';

const RESULTS_PER_PAGE = 10;

const filterPkgs = (pkgs, pkgName) => (
  pkgs.filter((pkg) => pkg.includes(pkgName)).sort()
);

const Pkg = (props) => {
  const pkg = props.pkg;

  const dataSource = `${GITHUB_RAW_NIXPKGS_DB}/data/pkgs/${pkg}.json`;
  const dataJSON = useFetchJSON(dataSource, {});
  const data =  Object.entries(dataJSON).reverse();

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
            <Col sm={3}>{lastData.meta.name}</Col>
            <Col>{lastData.meta.description}</Col>
            <Col sm={1}>{data.length}</Col>
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
                                  $ <b>nix-shell</b> -p {pkg} -I nixpkgs={`${GITHUB_NIXPKGS}/archive/${itemData.revs[1]}.tar.gz`}
                                </code>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <code>
                                  $ <b>nix-env</b> -i {pkg} -f {`${GITHUB_NIXPKGS}/archive/${itemData.revs[1]}.tar.gz`}
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

const SearchImplementation = (props) => {
  const pkgs = props.pkgs;

  const [page, setPage] = useState(1);
  const [pkgName, setPkgName] = useState("");
  const [matchingPackages, setMatchingPackages] = useState(filterPkgs(pkgs, ""));

  const startPage = Math.min(
    1 + (page - 1) * RESULTS_PER_PAGE,
    matchingPackages.length,
  );
  const endPage = Math.min(
    page * RESULTS_PER_PAGE,
    matchingPackages.length,
  );

  const matchingPackagesOnPage = matchingPackages.slice(startPage - 1, endPage);

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

  return (
    <React.Fragment>
      {/* Search box and pagination */}
      <Row>
        <Col sm={6}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="pkgName">Package name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="pkgName"
              aria-describedby="pkgName"
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
              Showing packages {startPage}-{endPage} of {matchingPackages.length}
            </Pagination.Item>
            <Pagination.Next
              disabled={page * RESULTS_PER_PAGE > matchingPackages.length}
              onClick={onNextButtonClick}
            />
          </Pagination>
        </Col>
      </Row>

      {/* Results table */}
      <Row>
        <Col sm={12}>
          <Row>
            <Col sm={3}><b>Attribute</b></Col>
            <Col sm={3}><b>Name</b></Col>
            <Col sm={5}><b>Description</b></Col>
            <Col sm={1}><b>Versions</b></Col>
          </Row>
          {matchingPackagesOnPage.map((pkg) => <Pkg pkg={pkg} />)}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export const Search = (props) => {
  if (props.pkgs.length === 0) {
    return <ProgressBar label="Loading..." variant="info" />;
  }

  return <SearchImplementation pkgs={props.pkgs} revs={props.revs} />;
}
