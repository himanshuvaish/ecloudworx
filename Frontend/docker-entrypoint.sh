#!/usr/bin/env bash
set -eo pipefail

# Render Nginx config from template using $PORT
envsubst '\$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Print the final conf (optional for debugging)
echo "---- Rendered Nginx config ----"
cat /etc/nginx/conf.d/default.conf
echo "--------------------------------"

# Start Nginx in foreground
exec nginx -g 'daemon off;'
