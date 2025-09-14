#!/bin/sh
set -eo pipefail

# Render Nginx config from template using $PORT
if [ -f /etc/nginx/templates/default.conf.template ]; then
  envsubst '\$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
else
  echo "ERROR: /etc/nginx/templates/default.conf.template not found" >&2
fi

# Replace placeholders inside the built index.html so the frontend can pick up runtime envs.
if [ -f /usr/share/nginx/html/index.html ]; then
  echo "---- Running envsubst on /usr/share/nginx/html/index.html ----"
  # Replace the variables you expect at runtime. Add them here separated by space if needed.
  envsubst '\$UNIVERSITY_URL' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp \
    && mv /usr/share/nginx/html/index.html.tmp /usr/share/nginx/html/index.html
  echo "---- Completed envsubst on index.html ----"
else
  echo "---- /usr/share/nginx/html/index.html not found; skipping envsubst ----"
fi

# Print the final conf (helpful for debugging)
echo "---- Rendered Nginx config ----"
cat /etc/nginx/conf.d/default.conf || true
echo "--------------------------------"

# Finally exec the command given (defaults to starting nginx)
exec "$@"
