# shellcheck shell=bash

function common_clone_repo {
  local source="${1}"
  local target="${2}"

  if test -e "${target}"
  then
        echo "[INFO] Updating local repository copy at: ${target}" \
    &&  pushd "${target}" \
      &&  git remote set-url origin "${source}" \
      &&  git fetch -a \
      &&  git reset --hard HEAD \
    &&  popd \
    ||  return 1
  else
        echo "[INFO] Creating local repository copy at: ${target}" \
    &&  git clone "${source}" "${target}" \
    &&  pushd "${target}" \
      &&  git fetch -a \
      &&  git reset --hard HEAD \
    &&  popd \
    ||  return 1
  fi
}
