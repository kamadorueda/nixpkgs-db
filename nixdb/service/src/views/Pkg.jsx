import React from 'react';
import {
  Col,
  Row,
} from 'react-bootstrap';
import {
  RiCpuLine,
  RiExternalLinkFill,
  RiUserHeartLine,
} from 'react-icons/ri';
import { useParams, Redirect } from 'react-router-dom';
import { A } from '../components/A';
import { Code } from '../components/Code';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ProgressBar } from '../components/ProgressBar';
import { GITHUB_NIXPKGS, GITHUB_RAW_NIXPKGS_DB } from '../constants';
import { useFetchJSON } from '../hooks/fetch';
import { Badges } from './Badge';

const pkgVersionLink = (pkg, version) => (
  `/pkg/${encodeURIComponent(pkg)}/${encodeURIComponent(version)}`
);

const formatMaintainers = (maintainers) => {
  let formatted = [];

  if (maintainers === undefined) {
    return formatted;
  }

  for (let maintainer of maintainers) {
    switch (typeof maintainer) {
      case "string":
        formatted.push(maintainer);
        break;
      case "object":
        formatted.push(`${maintainer.name} <${maintainer.email}>`);
        break;
      default:
    }
  }

  return formatted.sort();
}

const formatPlatforms = (platforms) => {
  let formatted = [];

  if ([null, undefined].includes(platforms)) {
    return formatted;
  }

  for (let platform of platforms) {
    switch (typeof platform) {
      case "string":
        formatted.push(platform);
        break;
      default:
    }
  }

  return formatted.sort();
}

const Item = (props) => (
  <React.Fragment>
    <Row>
      <Col sm={2}><b>{props.title}</b></Col>
      <Col sm={10}>
      <ErrorBoundary onError="Not specified">
        {[null, undefined, ""].includes(props.content)
          ? "-"
          : props.content}
      </ErrorBoundary>
      </Col>
    </Row>
    <hr />
  </React.Fragment>
);

const PkgLoaded = (props) => {
  const { data, dataJSON, dataSource } = props;
  const { pkg, version } = useParams();

  if (version === undefined) {
    return <Redirect to={pkgVersionLink(pkg, data[0][0])} />;
  }

  const versionData = dataJSON[version];
  const versionDataLastRev = versionData?.revs[1];
  const versions = data.map(([version, _]) => version);

  const nixpkgs = `${GITHUB_NIXPKGS}/archive/${versionDataLastRev}.tar.gz`;
  const nixEnv = `
    # Version: ${version}
    nix-env -i ${pkg} -f ${nixpkgs}
  `;
  const nixShell = `
    # Version: ${version}
    nix-shell -p ${pkg} -I nixpkgs=${nixpkgs}
  `;
  const nixBuild = `
    let
      pkgs = import <nixpkgs> { };

      # Version: ${version}
      ${pkg} = (import (pkgs.fetchzip {
        url = "https://github.com/nixos/nixpkgs/archive/${versionDataLastRev}.zip";
        # Please update this hash with the one nix says on the first build attempt
        sha256 = "0000000000000000000000000000000000000000000000000000000000000000";
      }) { }).${pkg};
    in
      ...
  `;

  const pkgName = versionData?.meta?.name === undefined ? "" : `(${versionData?.meta?.name})`;

  return (
    <Row>
      <Col sm={12}>
        <Item
          title="Package"
          content={`${pkg} ${pkgName}`}
        />
        <Item
          title="This page version"
          content={
            <A href={`/nixpkgs-db/#${pkgVersionLink(pkg, version)}`}>
              <RiExternalLinkFill /> {version}
            </A>
          }
        />
        <Item
          title="All versions"
          content={
            <Row>
              {versions.map((v) => (
                <Col xs={12} sm={6} md={3}>
                  <A href={`/nixpkgs-db/#${pkgVersionLink(pkg, v)}`}>
                    <RiExternalLinkFill /> {v}
                  </A>
                </Col>
              ))}
            </Row>
          }
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
          content={<A href={versionData?.meta?.homepage} />}
        />
        <Item
          title="License"
          content={versionData?.meta?.license?.fullName}
        />
        <Item
          title="Maintainers"
          content={
            <Row>
              {formatMaintainers(versionData?.meta?.maintainers).map((maintainer) => (
                <Col sm={6}> <RiUserHeartLine /> {maintainer}</Col>
              ))}
            </Row>
          }
        />
        <Item
          title="Interactive shell"
          content={<Code content={nixShell} copyable={true} lang="bash" />}
        />
        <Item
          title="Install in your system"
          content={<Code content={nixEnv} copyable={true} lang="bash" />}
        />
        <Item
          title="Use in an expression"
          content={<Code content={nixBuild} copyable={true} lang="nix" />}
        />
        <Item
          title="Badges"
          content={
            <Badges pkg={pkg} />
          }
        />
        <Item
          title="Commits range"
          content={
            `${versionData?.revs[0]} -> ${versionData?.revs[1]}
          `}
        />
        <Item
          title="Raw data"
          content={<A href={dataSource} />}
        />
        <Item
          title="Available platforms"
          content={
            <Row>
              {formatPlatforms(versionData?.meta?.platforms).map((platform) => (
                <Col sm={2}> <RiCpuLine /> {platform}</Col>
              ))}
            </Row>
          }
        />
      </Col>
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

  return <PkgLoaded data={data} dataJSON={dataJSON} dataSource={dataSource} />;
};
