# Use official Node.js image for build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package.json .

# Copy source and public directories
COPY src ./src
COPY public ./public

# Install dependencies and build
RUN npm install
RUN npm run build

# Use nginx to serve built static files
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (will map to 8000 in docker-compose)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
