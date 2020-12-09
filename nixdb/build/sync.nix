let
  sources = import ../nix/sources.nix;
  pkgs = import sources.nixpkgs { };
in
  pkgs.stdenv.mkDerivation (
       (import ./ctx.nix)
    // (rec {
      buildInputs = [
        pkgs.git
        pkgs.cacert
        pkgs.nix
        pkgs.python38
      ];
      name = "builder";
    })
  )
