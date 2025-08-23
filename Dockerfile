# ---- Build stage: create optimized static assets ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runtime stage: Nginx serves /dist ----
FROM nginx:alpine AS runtime
WORKDIR /app

# envsubst for dynamic $PORT at runtime
RUN apk add --no-cache bash gettext

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy templated nginx config and entrypoint
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Cloud Run will set $PORT; default to 8080 locally
ENV PORT=8080
EXPOSE 8080

CMD ["/docker-entrypoint.sh"]
