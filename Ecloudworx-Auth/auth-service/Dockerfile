# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy backend files
COPY package.json .
COPY index.js .

# Install dependencies
RUN npm install

# Expose non-standard port
EXPOSE 7100

# Start the service
CMD ["node", "index.js"]
