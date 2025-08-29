# eCloudWorx University - Docker Microservice

## Overview
This is the containerized version of eCloudWorx University knowledge base, configured to run as a microservice on port 7000 and communicate with a separate database service on port 6001.

## Architecture
- **University Service**: Runs on port 7000
- **Database Service**: External service on port 6001
- **Storage**: Uses DB service in production, in-memory storage in development

## Quick Start

### Using Docker Compose
```bash
docker-compose up --build
```

### Using Docker directly
```bash
# Build the image
docker build -t university-service .

# Run the container
docker run -p 7000:7000 -e DB_SERVICE_URL=http://your-db-service:6001 university-service
```

## Environment Variables
- `PORT`: Service port (default: 7000)
- `NODE_ENV`: Environment (development/production)
- `DB_SERVICE_URL`: Database service URL (default: http://db-service:6001)

## Database Service API Endpoints
Your database service should implement these endpoints:

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PATCH /api/categories/:id/article-count` - Update article count

### Articles
- `GET /api/articles` - List articles (supports ?search and ?categoryId)
- `GET /api/articles/:id` - Get article by ID
- `POST /api/articles` - Create new article
- `PATCH /api/articles/:id/views` - Increment view count
- `GET /api/articles/featured` - Get featured articles
- `GET /api/articles/popular?limit=N` - Get popular articles
- `GET /api/articles/by-category/:categoryId` - Get articles by category

### Users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/by-username/:username` - Get user by username
- `POST /api/users` - Create new user

## Development
```bash
# Local development (uses in-memory storage)
npm install
npm run dev

# Production build
npm run build
npm start
```

## Configuration
- In development: Uses in-memory storage with sample data
- In production: Connects to database service on port 6001
- Service binds to 0.0.0.0 in production, 127.0.0.1 in development