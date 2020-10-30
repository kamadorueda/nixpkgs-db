# shellcheck shell=bash

# exit on errors
set -o errexit
set -o pipefail

# unset variables are not allowed
set -o nounset

# shell options are propagated to child functions
set -o functrace
set -o errtrace

# enable job control
set -o monitor

# make this shell POSIX compliant
set -o posix

# https://reproducible-builds.org/docs/source-date-epoch
# https://nixos.org/nixpkgs/manual/#faq (15.17.3.3)
unset SOURCE_DATE_EPOCH
