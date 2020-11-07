import React, { useState } from 'react';
import {
  Badge,
  Col,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { RiExternalLinkFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Pagination } from '../components/Pagination';
import { ProgressBar } from '../components/ProgressBar';
import { GITHUB_RAW_NIXPKGS_DB } from '../constants';
import { useFetchJSON } from '../hooks/fetch';

const RESULTS_PER_PAGE = 5;

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

  const [matchingPackages, setMatchingPackages] = useState(filterPkgs(pkgs, ""));
  const [matchingPackagesOnPage, setMatchingPackagesOnPage] = useState([]);

  const onPkgNameChange = (event) => {
    setMatchingPackages(filterPkgs(pkgs, event.target.value));
  };
  const renderCaption = ({ endPage, startPage, resultsLength }) => (
    `Showing packages ${startPage}-${endPage} of ${resultsLength}`
  );

  return (
    <React.Fragment>
      {/* Search box */}
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
          {matchingPackagesOnPage.map((pkg) => <Pkg pkg={pkg} />)}
        </Col>
      </Row>

      {/* Pagination */}
      <Row>
        <Col sm={12}>
          <Pagination
            renderCaption={renderCaption}
            resultPerPage={RESULTS_PER_PAGE}
            results={matchingPackages}
            setResultsOnPage={setMatchingPackagesOnPage}
          />
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
