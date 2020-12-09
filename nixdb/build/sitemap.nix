let
  sources = import ../nix/sources.nix;
  pkgs = import sources.nixpkgs { };
in
  pkgs.stdenv.mkDerivation (
       (import ./ctx.nix)
    // (rec {
      buildInputs = [
        pkgs.python38
        pkgs.python38Packages.more-itertools
      ];
      name = "builder";
    })
  )
