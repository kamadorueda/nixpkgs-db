import React, { useState } from 'react';
import {
  Col,
  FormControl,
  InputGroup,
  Pagination,
  Row,
} from 'react-bootstrap';
import { RiExternalLinkFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { ProgressBar } from '../components/ProgressBar';
import { GITHUB_RAW_NIXPKGS_DB } from '../constants';
import { useFetchJSON } from '../hooks/fetch';

const RESULTS_PER_PAGE = 10;

const filterPkgs = (pkgs, pkgName) => (
  pkgs.filter((pkg) => pkg.includes(pkgName)).sort()
);

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
      <Row>
        <Col sm={3}><Link to={pkgLink}><RiExternalLinkFill /> {pkg}</Link></Col>
        <Col sm={3}>{lastData.meta.name}</Col>
        <Col sm={5}>{lastData.meta.description}</Col>
        <Col sm={1}>{data.length}</Col>
      </Row>
      <hr />
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
  const pkgs = props.pkgs;

  const [page, setPage] = useState(1);
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
    setPage(1);
    setMatchingPackages(filterPkgs(pkgs, event.target.value));
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
        <Col sm={12}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="pkgName">Package name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="pkgName"
              aria-describedby="pkgName"
              onChange={onPkgNameChange}
            />
          </InputGroup>
        </Col>
      </Row>

      {/* Results table */}
      <Row>
        <Col sm={12}>
          <hr />
          <Row>
            <Col sm={3}><b>Attribute</b></Col>
            <Col sm={3}><b>Name</b></Col>
            <Col sm={5}><b>Description</b></Col>
            <Col sm={1}><b>Versions</b></Col>
          </Row>
          <hr />
          {matchingPackagesOnPage.map((pkg) => <Pkg pkg={pkg} />)}
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
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
    </React.Fragment>
  );
}

export const Search = (props) => {
  if (props.pkgs.length === 0) {
    return <ProgressBar label="Loading..." variant="info" />;
  }

  return <SearchLoaded pkgs={props.pkgs} revs={props.revs} />;
}
