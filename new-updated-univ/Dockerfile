# Dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# allow build-time injection of VITE vars
ARG VITE_STRAPI_URL=http://localhost:7200
ENV VITE_STRAPI_URL=${VITE_STRAPI_URL}

# copy package files first for caching
COPY package*.json ./
# If you use pnpm/yarn, adjust accordingly
RUN npm ci --silent

# copy source and build
COPY . .
RUN npm run build

# Production stage (nginx)
FROM nginx:stable-alpine AS runner
# remove default site config to replace with our own
RUN rm /etc/nginx/conf.d/default.conf

# copy our custom nginx config
COPY ./docker/nginx/spa.conf /etc/nginx/conf.d/spa.conf

# copy built static assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose nginx port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
