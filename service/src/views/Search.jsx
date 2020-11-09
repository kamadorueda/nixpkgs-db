import React, { useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import {
  RiExternalLinkFill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { ProgressBar } from '../components/ProgressBar';
import { GITHUB_RAW_NIXPKGS_DB } from '../constants';
import { useFetchJSON } from '../hooks/fetch';
import { searchString } from '../utils/strings';

const DEFAULT_PKG_NAME = "nix";
const RESULTS_PER_PAGE = 12;

const PkgLoading = () => (
  <React.Fragment>
    <Row>
      <Col sm={12}>
        <ProgressBar label="Loading..." variant="info" />
      </Col>
    </Row>
    <hr />
  </React.Fragment>
);

const PkgLoaded = (props) => {
  const { data, pkg } = props;
  const lastData = props.data[0][1];
  const pkgLink = `/pkg/${encodeURIComponent(pkg)}`;

  return (
    <React.Fragment>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Row>
          <Col sm={12}>
            <Link to={pkgLink}>
              <RiExternalLinkFill /> {pkg}
              {pkg === lastData.meta.name ? "" : ` (${lastData.meta.name})`}
            </Link>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {lastData.meta.description}
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Badge variant="info">
              {data.length} version{data.length >= 2 ? "s" : ""} available
            </Badge>
          </Col>
        </Row>
        <br />
      </Col>
    </React.Fragment>
  );
};

const Pkg = (props) => {
  const pkg = props.pkg;

  const dataSource = `${GITHUB_RAW_NIXPKGS_DB}/data/pkgs/${pkg}.json`;
  const dataJSON = useFetchJSON(dataSource, {});
  const data =  Object.entries(dataJSON).reverse();

  if (data.length === 0) {
    return <PkgLoading />;
  }

  return <PkgLoaded data={data} pkg={pkg} />;
};

const SearchLoaded = (props) => {
  const { pkgs } = props;

  const [page, setPage] = useState(1);
  const [matchingPackages, setMatchingPackages] = useState(searchString(DEFAULT_PKG_NAME, pkgs));
  const [endPage, startPage] = [
    Math.min((page - 0) * RESULTS_PER_PAGE + 0, matchingPackages.length),
    Math.min((page - 1) * RESULTS_PER_PAGE + 1, matchingPackages.length),
  ];

  const changePage = (delta) => () => {
    setPage(page + delta);
  };
  const onPkgNameChange = (event) => {
    setPage(1);
    setMatchingPackages(searchString(event.target.value, pkgs));
  };

  const matchingPackagesOnPage = matchingPackages.slice(startPage - 1, endPage);

  return (
    <React.Fragment>
      {/* Search box */}
      <Row>
        <Col sm={12}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Package name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              defaultValue={DEFAULT_PKG_NAME}
              onChange={onPkgNameChange}
            />
          </InputGroup>
        </Col>
      </Row>

      {/* Pagination */}
      <br />
      <Row>
        <Col sm={12}>
          <ButtonGroup size="md">
            <Button
              disabled={page === 1}
              onClick={changePage(-1)}
              variant="outline-primary"
            >
              &lt; Previous
            </Button>
            <Button
              disabled={true}
              variant="outline-primary"
            >
              Page {page}
            </Button>
            <Button
              disabled={page * RESULTS_PER_PAGE > matchingPackages.length}
              onClick={changePage(+1)}
              variant="outline-primary"
            >
              Next &gt;
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {/* Results table */}
      <hr />
      <Row>
        {matchingPackagesOnPage.map((pkg) => <Pkg key={pkg} pkg={pkg} />)}
      </Row>
    </React.Fragment>
  );
}

export const Search = (props) => {
  if (props.pkgs.length === 0) {
    return <ProgressBar label="Loading..." variant="info" />;
  }

  return <SearchLoaded pkgs={props.pkgs} revs={props.revs} />;
}
