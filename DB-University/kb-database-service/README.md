# eCloudWorx Knowledge Base - Database Service

A dedicated PostgreSQL-backed microservice providing database operations for the eCloudWorx University knowledge base.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Environment variables configured

### Setup
```bash
# Install dependencies
npm install

# Set up database schema
npm run db:push

# Seed with sample data
npm run db:seed

# Start development server
npm run dev
```

### Production Deployment
```bash
# Build the service
npm run build

# Start production server
npm start
```

## 🐳 Docker Deployment

### Using Docker Compose
```bash
docker-compose up --build
```

### Using Docker directly
```bash
# Build image
docker build -t kb-db-service .

# Run container
docker run -p 6001:6001 \
  -e DATABASE_URL=your_database_url \
  kb-db-service
```

## 🌐 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `PORT` | No | `6001` | Service port |
| `NODE_ENV` | No | `development` | Environment mode |

## 📡 API Endpoints

### Health Check
- `GET /health` - Service health status

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PATCH /api/categories/:id/article-count` - Update article count

### Articles
- `GET /api/articles` - List articles (with search/filter support)
- `GET /api/articles/:id` - Get article by ID
- `POST /api/articles` - Create new article
- `PATCH /api/articles/:id/views` - Increment article views
- `GET /api/articles/featured` - Get featured articles
- `GET /api/articles/popular` - Get popular articles
- `GET /api/articles/by-category/:categoryId` - Get articles by category

### Users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/by-username/:username` - Get user by username
- `POST /api/users` - Create new user

## 📊 Database Schema

### Categories Table
```sql
CREATE TABLE categories (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT,
  article_count INTEGER DEFAULT 0
);
```

### Articles Table
```sql
CREATE TABLE articles (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category_id VARCHAR NOT NULL,
  tags TEXT[],
  read_time INTEGER NOT NULL,
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT true,
  last_updated TIMESTAMP DEFAULT NOW()
);
```

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);
```

## 🎯 Sample Data

The service includes 3 sample articles:

1. **Getting Started with eCloudWorx Multi-Cloud Dashboard** (Getting Started category)
   - Comprehensive setup and configuration guide
   - 12 minute read, featured article

2. **AWS Cost Optimization with eCloudWorx Analytics** (AWS Management category)  
   - Cost tracking and optimization strategies
   - 18 minute read

3. **Multi-Cloud Security Compliance Framework** (Security & Compliance category)
   - SOC2, GDPR, HIPAA compliance guidelines
   - 22 minute read, featured article

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Populate database with sample data

## 📈 Monitoring & Logging

The service provides:
- Request/response logging for all API endpoints
- Error handling with structured responses
- Health check endpoint for monitoring
- CORS support for microservice communication

## 🔍 API Response Format

### Success Response
```json
{
  "id": "uuid",
  "title": "Article Title",
  "content": "Full article content...",
  "category_id": "category-uuid",
  "views": 1234,
  ...
}
```

### Error Response
```json
{
  "message": "Error description",
  "errors": [...] // Optional validation errors
}
```

This microservice is designed to work seamlessly with the eCloudWorx University frontend service, providing reliable and scalable database operations for the knowledge base.