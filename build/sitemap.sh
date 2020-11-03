#! /usr/bin/env nix-shell
#! nix-shell -i bash
#! nix-shell --pure
#! nix-shell sitemap.nix

source "${srcCtxSh}"

function main {
  python3 ./build/sitemap.py
}

main "${@}"
