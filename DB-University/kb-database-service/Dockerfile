# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose port 6001
EXPOSE 6001

# Set environment variables
ENV NODE_ENV=production
ENV PORT=6001

# Start the application
CMD ["npm", "start"]