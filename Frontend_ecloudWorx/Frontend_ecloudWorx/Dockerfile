# Stage 1 — builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install build deps
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — runtime
FROM nginx:1.25-alpine
LABEL org.opencontainers.image.source="local/ecloud-univ"

# Install envsubst (gettext) for runtime substitution and tini for proper PID 1 handling
RUN apk add --no-cache gettext tini

# Place nginx template (will be rendered by entrypoint)
COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Copy entrypoint script
COPY docker/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port. Default is 8080 (can be overridden via PORT env)
ENV PORT=8080
EXPOSE 8080

# Use tini as init and run our entrypoint which will render nginx conf and envsubst index.html
ENTRYPOINT ["/sbin/tini", "--", "/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
