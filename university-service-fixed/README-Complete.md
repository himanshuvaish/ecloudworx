# eCloudWorx University Knowledge Base Microservice

## 📁 Project Structure

```
ecloudworx-university/
├── 📂 client/                    # Frontend React Application
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 ui/           # Reusable UI components (buttons, forms, etc.)
│   │   │   └── 📂 university/   # Knowledge base specific components
│   │   │       ├── NavigationHeader.tsx    # Top navigation bar
│   │   │       ├── LeftSidebar.tsx        # Search & category filters
│   │   │       ├── ArticleList.tsx        # Article listing view
│   │   │       ├── ArticleReader.tsx      # Full article reading view
│   │   │       └── RightSidebar.tsx       # Popular articles & stats
│   │   ├── 📂 hooks/            # Custom React hooks
│   │   ├── 📂 lib/              # Utility functions & API client
│   │   ├── 📂 pages/            # Route pages
│   │   └── App.tsx              # Main application & routing
│   └── index.html               # HTML entry point
├── 📂 server/                   # Backend Express API
│   ├── index.ts                 # Main server entry point
│   ├── routes.ts                # API route definitions
│   ├── storage.ts               # In-memory storage (development)
│   ├── db-service-storage.ts    # Database service client (production)
│   └── vite.ts                  # Development server configuration
├── 📂 shared/                   # Shared TypeScript types
│   └── schema.ts                # Database schemas & TypeScript types
├── 🐳 Docker Configuration
│   ├── Dockerfile               # Container build instructions
│   ├── docker-compose.yml       # Multi-service deployment
│   └── .dockerignore           # Files to exclude from build
├── ⚙️ Configuration Files
│   ├── package.json            # Dependencies & scripts
│   ├── tsconfig.json           # TypeScript configuration
│   ├── vite.config.ts          # Vite build tool settings
│   ├── tailwind.config.ts      # CSS framework configuration
│   └── components.json         # UI component library settings
└── 📖 Documentation
    ├── README.md               # Basic setup instructions
    ├── README-Docker.md        # Docker deployment guide
    └── README-Complete.md      # This comprehensive guide
```

## 🎯 What Each Folder Does

### 📂 `/client` - Frontend Application
**Purpose**: React-based user interface for the knowledge base
- **When to modify**: UI changes, styling, user experience improvements
- **Key files**:
  - `App.tsx` - Add new routes or global app settings
  - `components/university/` - Modify knowledge base specific UI components
  - `index.css` - Update colors, fonts, and global styles

### 📂 `/server` - Backend API Service  
**Purpose**: Express.js API that handles data operations and serves the frontend
- **When to modify**: API endpoints, business logic, data processing
- **Key files**:
  - `routes.ts` - Add/modify API endpoints
  - `storage.ts` - Change in-memory data structure (development)
  - `db-service-storage.ts` - Modify database service communication
  - `index.ts` - Server configuration, middleware, ports

### 📂 `/shared` - Common Types & Schemas
**Purpose**: TypeScript type definitions shared between frontend and backend
- **When to modify**: Data structure changes, new fields, API contracts
- **Key files**:
  - `schema.ts` - Database table structures, API request/response types

## 🔧 Which Files to Update For...

### 🎨 **Styling & Branding Changes**
- `client/src/index.css` - Colors, fonts, global styles
- `tailwind.config.ts` - Color palette, spacing, design tokens
- `client/src/components/university/NavigationHeader.tsx` - Logo, brand elements

### 🗃️ **Data Structure Changes**
1. **First**: Update `shared/schema.ts` - Define new database tables/fields
2. **Then**: Update `server/db-service-storage.ts` - API calls to database service
3. **Finally**: Update frontend components to handle new data

### 🚀 **New API Endpoints**
1. Add endpoint to `server/routes.ts`
2. Add corresponding method to `IStorage` interface in `server/storage.ts`
3. Implement in both `MemStorage` (development) and `DBServiceStorage` (production)
4. Update frontend components to use new endpoint

### 🖥️ **New UI Components**
1. Create component in `client/src/components/university/`
2. Import and use in relevant page (`client/src/pages/university.tsx`)
3. Add necessary TypeScript types in `shared/schema.ts` if needed

### 🐳 **Deployment Configuration**
- `Dockerfile` - Change Node.js version, build steps, dependencies
- `docker-compose.yml` - Add services, environment variables, ports
- `package.json` scripts - Modify build/start commands

## 📡 Database Service API Schema

Your database service on port 6001 must implement these endpoints:

### 🗂️ **Categories API**

#### `GET /api/categories`
**Response:**
```typescript
Category[] = {
  id: string;
  name: string;
  icon: string;                    // FontAwesome class (e.g., "fas fa-cloud")
  description: string | null;
  articleCount: number | null;
}[]
```

#### `POST /api/categories`
**Request:**
```typescript
{
  name: string;
  icon: string;
  description?: string | null;
}
```
**Response:** `Category` object

#### `PATCH /api/categories/:id/article-count`
**Request:**
```typescript
{
  count: number;
}
```

### 📄 **Articles API**

#### `GET /api/articles`
**Query Parameters:**
- `search?: string` - Search term for title/content
- `categoryId?: string` - Filter by category

**Response:**
```typescript
Article[] = {
  id: string;
  title: string;
  content: string;                 // Full article content
  excerpt: string;                 // Brief description
  categoryId: string;
  tags: string[] | null;
  readTime: number;                // Minutes to read
  views: number | null;
  isFeatured: boolean | null;
  isVerified: boolean | null;
  lastUpdated: Date | null;
}[]
```

#### `GET /api/articles/:id`
**Response:** Single `Article` object

#### `POST /api/articles`
**Request:**
```typescript
{
  title: string;
  content: string;
  excerpt: string;
  categoryId: string;
  tags?: string[] | null;
  readTime: number;
  isFeatured?: boolean | null;
  isVerified?: boolean | null;
}
```
**Response:** `Article` object

#### `PATCH /api/articles/:id/views`
**Purpose:** Increment view count when article is opened

#### `GET /api/articles/featured`
**Response:** `Article[]` - Only featured articles

#### `GET /api/articles/popular?limit=N`
**Response:** `Article[]` - Most viewed articles

### 👤 **Users API** (Future Admin Features)

#### `GET /api/users/:id`
**Response:**
```typescript
{
  id: string;
  username: string;
  password: string;               // Hashed password
}
```

#### `POST /api/users`
**Request:**
```typescript
{
  username: string;
  password: string;
}
```

## 🔧 Development vs Production Modes

### 🛠️ **Development Mode** (`NODE_ENV=development`)
- Uses `MemStorage` with sample data
- Server binds to `127.0.0.1` (localhost)
- Hot module replacement enabled
- Detailed error messages
- Sample categories and articles pre-loaded

### 🚀 **Production Mode** (`NODE_ENV=production`)
- Uses `DBServiceStorage` to communicate with database service
- Server binds to `0.0.0.0` (all interfaces)
- Optimized builds
- Requires `DB_SERVICE_URL` environment variable

## 🌐 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `7000` | Port for the microservice |
| `NODE_ENV` | `development` | Environment mode |
| `DB_SERVICE_URL` | `http://db-service:6001` | Database service URL |

## 🚀 Quick Start Commands

```bash
# Development
npm install
npm run dev                      # Starts on http://localhost:7000

# Production Build
npm run build                    # Builds frontend and backend
npm start                        # Runs production server

# Docker
docker-compose up --build        # Full stack with DB service placeholder
docker build -t university .    # Build container image
```

## 🔍 Troubleshooting

### Common Issues:
1. **Port conflicts**: Change `PORT` environment variable
2. **Database connection**: Verify `DB_SERVICE_URL` points to your DB service
3. **Build failures**: Check Node.js version (requires 18+)
4. **CORS issues**: Database service must allow requests from university service

### Log Locations:
- API requests: Console output shows all `/api/*` calls
- Frontend errors: Browser developer console
- Build errors: Terminal output during `npm run build`

This microservice is designed to be modular and easy to customize. Modify the files mentioned above based on your specific needs!