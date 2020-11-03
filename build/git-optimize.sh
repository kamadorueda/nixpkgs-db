    echo '[INFO] Deleting unreachable objects' \
&&  git prune --expire=now --progress \
&&  echo '[INFO] Garbage collecting the repository' \
&&  git gc --aggressive --prune=all \
&&  echo '[INFO] Repacking the repository' \
&&  git repack -abd --depth 4095 --threads 4 --window 1000000
