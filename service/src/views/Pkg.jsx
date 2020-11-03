import React, { useState } from 'react';
import {
  Col,
  Row,
} from 'react-bootstrap';
import {
  RiCpuLine,
  RiExternalLinkFill,
} from 'react-icons/ri';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Code } from '../components/Code';
import { ProgressBar } from '../components/ProgressBar';
import { GITHUB_NIXPKGS, GITHUB_RAW_NIXPKGS_DB } from '../constants';
import { useFetchJSON } from '../hooks/fetch';

const pkgVersionLink = (pkg, version) => (
  `/pkg/${encodeURIComponent(pkg)}/${encodeURIComponent(version)}`
);

const Item = (props) => (
  <React.Fragment>
    <Row>
      <Col sm={2}><b>{props.title}</b></Col>
      <Col sm={10}>{
        [null, undefined, ""].includes(props.content) ? "-" : props.content
      }</Col>
    </Row>
    <hr />
  </React.Fragment>
);

const PkgLoaded = (props) => {
  const { data, dataJSON } = props;
  const { pkg, version } = useParams();

  if (version === undefined) {
    return <Redirect to={pkgVersionLink(pkg, data[0][0])} />;
  }

  const versionData = dataJSON[version];
  const versions = data.map(([version, _]) => version);

  const nixpkgs = `${GITHUB_NIXPKGS}/archive/${versionData?.revs[1]}.tar.gz`;
  const nixEnv = `nix-env -i '${pkg}' -f '${nixpkgs}'`;
  const nixShell = `nix-env -i '${pkg}' -I 'nixpkgs=${nixpkgs}'`;

  return (
    <Row>
      <Col sm={12}>
        <Item
          title="Package"
          content={pkg}
        />
        <Item
          title="Name"
          content={versionData?.meta?.name}
        />
        <Item
          title="Version"
          content={version}
        />
        <Item
          title="Description"
          content={versionData?.meta?.description}
        />
        <Item
          title="Long description"
          content={versionData?.meta?.long_description}
        />
        <Item
          title="Homepage"
          content={versionData?.meta?.homepage}
        />
        <Item
          title="License"
          content={versionData?.meta?.license?.fullName}
        />
        <Item
          title="Platforms"
          content={
            <Row>
              {versionData?.meta?.platforms?.sort()?.map((platform) => (
                <Col sm={2}><RiCpuLine /> {platform}</Col>
              ))}
            </Row>
          }
        />
        {/* Add Maintainers */}
        <Item
          title="Interactive shell"
          content={<Code content={nixShell} />}
        />
        <Item
          title="Install in your system"
          content={<Code content={nixEnv} />}
        />
        <Item
          title="Commits range"
          content={
            `${versionData?.revs[0]} -> ${versionData?.revs[1]}
          `}
        />
        <Item
          title="Versions"
          content={
            <Row>
              {versions.map((v) => (
                <Col sm={2}>
                  <Link to={pkgVersionLink(pkg, v)}>
                    <RiExternalLinkFill /> {v}
                  </Link>
                </Col>
              ))}
            </Row>
          }
        />
      </Col>
      data: {JSON.stringify(data)}
      version: {version}
    </Row>
  );
};

export const Pkg = () => {
  const { pkg } = useParams();

  const dataSource = `${GITHUB_RAW_NIXPKGS_DB}/data/pkgs/${pkg}.json`;
  const dataJSON = useFetchJSON(dataSource, {});
  const data =  Object.entries(dataJSON).reverse();

  if (data.length === 0) {
    return <ProgressBar label="Loading..." variant="info" />;;
  }

  return <PkgLoaded data={data} dataJSON={dataJSON} />;
};
