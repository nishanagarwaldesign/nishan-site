#!/usr/bin/env bash
# Push the site to your own server (VPS route). Usage: ./deploy/deploy-vps.sh
set -euo pipefail
SERVER="deploy@YOUR_SERVER_IP"
TARGET="/var/www/nishz.com"
rsync -avz --delete public/ "$SERVER:$TARGET/"
echo "deployed to $TARGET"
