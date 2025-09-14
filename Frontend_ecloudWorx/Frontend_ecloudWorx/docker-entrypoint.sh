# #!/usr/bin/env bash
# set -eo pipefail

# # Render Nginx config from template using $PORT
# envsubst '\$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# # Print the final conf (optional for debugging)
# echo "---- Rendered Nginx config ----"
# cat /etc/nginx/conf.d/default.conf
# echo "--------------------------------"

# # Start Nginx in foreground
# exec nginx -g 'daemon off;'

#!/usr/bin/env bash
set -eo pipefail

# Render Nginx config from template using $PORT
envsubst '\$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Replace placeholders inside the built index.html so the frontend can pick up runtime envs.
# We replace UNIVERSITY_URL; add other variables separated by space if needed in future.
if [ -f /usr/share/nginx/html/index.html ]; then
  echo "---- Running envsubst on /usr/share/nginx/html/index.html ----"
  # envsubst does not allow in-place replacement, so write to temp then move.
  envsubst '\$UNIVERSITY_URL' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp \
    && mv /usr/share/nginx/html/index.html.tmp /usr/share/nginx/html/index.html
  echo "---- Completed envsubst on index.html ----"
else
  echo "---- /usr/share/nginx/html/index.html not found; skipping envsubst ----"
fi

# Print the final conf (helpful for debugging)
echo "---- Rendered Nginx config ----"
cat /etc/nginx/conf.d/default.conf
echo "--------------------------------"

# Start Nginx in foreground
exec nginx -g 'daemon off;'
