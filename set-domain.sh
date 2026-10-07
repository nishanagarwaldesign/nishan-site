#!/usr/bin/env bash
# One-time: replace the YOURDOMAIN placeholder everywhere. Usage: ./set-domain.sh nishanagarwal.com
set -euo pipefail
D="${1:?give your domain, e.g. ./set-domain.sh nishanagarwal.com}"
grep -rl YOURDOMAIN --exclude=set-domain.sh --exclude=README.md . | while read -r f; do
  sed -i.bak "s/YOURDOMAIN/$D/g" "$f" && rm "$f.bak"
done
echo "domain set to $D"
