# eCloudWorx Knowledge Base - Complete Database Service

## 🎯 Overview

This is a complete PostgreSQL-backed database microservice that provides all the data operations for the eCloudWorx University knowledge base. It runs on port 6001 and serves as the data layer for the frontend university service.

## 📦 What's Included

### ✅ **Complete Database Service**
- **PostgreSQL Integration**: Full Drizzle ORM setup with Neon database
- **RESTful API**: All endpoints the university service expects
- **Sample Data**: 3 comprehensive articles with categories
- **Docker Ready**: Complete containerization with docker-compose
- **Production Ready**: Built for microservice deployment

### ✅ **Sample Articles Included**
1. **"Getting Started with eCloudWorx Multi-Cloud Dashboard"** (Featured)
   - Complete setup and configuration guide
   - 3,247 views, 12 minute read
   - Getting Started category

2. **"AWS Cost Optimization with eCloudWorx Analytics"**
   - Detailed cost optimization strategies
   - 1,856 views, 18 minute read  
   - AWS Management category

3. **"Multi-Cloud Security Compliance Framework"** (Featured)
   - SOC2, GDPR, HIPAA compliance guidelines
   - 2,893 views, 22 minute read
   - Security & Compliance category

## 🚀 Quick Deployment

### Method 1: Direct Run
```bash
# Extract and setup
tar -xzf kb-database-service.tar.gz
cd db-service

# Install dependencies
npm install

# Set up database (requires DATABASE_URL)
npm run db:push --force

# Add sample data
npm run db:seed

# Start service
npm run dev  # Development
npm start    # Production
```

### Method 2: Docker
```bash
cd db-service
docker-compose up --build
```

## 🌐 API Endpoints (Port 6001)

### 📊 **Categories API**
- `GET /api/categories` → List all categories with article counts
- `GET /api/categories/:id` → Get specific category
- `POST /api/categories` → Create new category
- `PATCH /api/categories/:id/article-count` → Update article count

### 📄 **Articles API**
- `GET /api/articles` → List articles (supports ?search and ?categoryId)
- `GET /api/articles/:id` → Get specific article (increments views)
- `POST /api/articles` → Create new article
- `PATCH /api/articles/:id/views` → Increment view count
- `GET /api/articles/featured` → Get featured articles only
- `GET /api/articles/popular?limit=N` → Get most viewed articles
- `GET /api/articles/by-category/:categoryId` → Articles by category

### 👤 **Users API** (Future Admin)
- `GET /api/users/:id` → Get user by ID
- `GET /api/users/by-username/:username` → Get user by username
- `POST /api/users` → Create new user

### 🔍 **Health Check**
- `GET /health` → Service status and timestamp

## 🗄️ Database Schema

### Categories Table
```sql
CREATE TABLE categories (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,              -- FontAwesome classes
  description TEXT,
  article_count INTEGER DEFAULT 0
);
```

### Articles Table  
```sql
CREATE TABLE articles (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,           -- Full article content
  excerpt TEXT NOT NULL,           -- Brief description  
  category_id VARCHAR NOT NULL,
  tags TEXT[],                     -- Array of tags
  read_time INTEGER NOT NULL,      -- Minutes to read
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT true,
  last_updated TIMESTAMP DEFAULT now()
);
```

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL           -- Store hashed passwords
);
```

## 🔧 Configuration

### Environment Variables
```bash
DATABASE_URL=postgresql://user:pass@host:port/db  # Required
PORT=6001                                         # Optional
NODE_ENV=production                               # Optional
```

### Sample Categories Created
1. **Getting Started** (`fas fa-cloud-upload`) - Essential beginner guides
2. **AWS Management** (`fab fa-aws`) - Amazon Web Services integration  
3. **Security & Compliance** (`fas fa-shield-alt`) - Security best practices

## 🔌 Integration with University Service

The university service (port 7000) automatically connects to this database service:

```typescript
// University service configuration
DB_SERVICE_URL=http://db-service:6001

// In production mode, it will use DBServiceStorage
// which makes HTTP calls to these API endpoints
```

## 📈 Production Features

- **Request Logging**: All API calls logged with timing
- **Error Handling**: Structured error responses
- **CORS Support**: Cross-origin requests enabled
- **Validation**: Zod schema validation on all inputs
- **Performance**: Optimized database queries with indexes

## 🐳 Docker Deployment

The included `docker-compose.yml` sets up:
- Database service on port 6001
- Proper networking between services
- Environment variable management
- Production-ready configuration

## 📊 Sample Data Stats

After seeding, you'll have:
- **3 Categories** with proper article counts
- **3 Full Articles** with real content (not Lorem Ipsum)  
- **Realistic View Counts** and read times
- **Proper Tags** and featured article flags
- **Recent Timestamps** for last_updated fields

This database service is production-ready and provides all the data operations needed for a professional knowledge base application!

## 🔍 Testing the Service

After startup, test endpoints:
```bash
# Health check
curl http://localhost:6001/health

# Get categories  
curl http://localhost:6001/api/categories

# Get articles
curl http://localhost:6001/api/articles

# Search articles
curl "http://localhost:6001/api/articles?search=security"
```