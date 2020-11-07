let
  sources = import ../../nix/sources.nix;
  pkgs = import sources.nixpkgs {
    config.android_sdk.accept_license = true;
  };

  trace = a: b: builtins.trace (builtins.toJSON a) b;
  debug = x: trace x x;

  metaPkgNames =
    let
      createEntry = pkgName: {
        name = pkgName;
        value = null;
      };
      list = builtins.map createEntry [
        "AAAAAASomeThingsFailToEvaluate"
        "alienfx"
        "batti"
        "beegfs"
        "bionic"
        "bittorrentSync"
        "bittorrentSync14"
        "bittorrentSync20"
        "bootchart"
        "buildkite-agent2"
      ];
    in
      builtins.listToAttrs list;

  isValidPkg = pkgName: trace pkgName (
        (!builtins.hasAttr pkgName metaPkgNames)
    &&  (builtins.isAttrs (builtins.getAttr pkgName pkgs))
  );

  getPkgAttr =
    pkg: attr:
      if (builtins.hasAttr attr pkg)
      then (builtins.getAttr attr pkg)
      else null;

  getDeps =
    pkgName:
      let
        pkg = builtins.getAttr pkgName pkgs;
        attrValues = builtins.map (getPkgAttr pkg) [
          "buildInputs"
          "propagatedBuildInputs"
        ];
        attrsFiltered = builtins.filter builtins.isList attrValues;
        attrsFilteredFlattened = builtins.concatLists attrsFiltered;
      in
        {
          name = pkgName;
          value = trace [pkgName attrsFilteredFlattened] attrsFilteredFlattened;
        };

  pkgNames = builtins.filter isValidPkg (builtins.attrNames pkgs);
  depsAttrs = builtins.map getDeps pkgNames;
in
  builtins.toJSON (builtins.listToAttrs depsAttrs)
