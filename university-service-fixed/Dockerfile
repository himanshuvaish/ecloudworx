# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm ci --only=production && npm cache clean --force

# Expose port 7000
EXPOSE 7000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=7000
ENV DB_SERVICE_URL=http://db-service:6001

# Start the application
CMD ["npm", "start"]