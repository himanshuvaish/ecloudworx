# eCloudWorx University - Knowledge Base

A professional knowledge base application built with React, TypeScript, and Express.js.

## Features

- **Professional UI**: Clean, responsive design matching eCloudWorx branding
- **Search & Filter**: Full-text search and category-based filtering
- **Article Management**: Complete CRUD operations for articles and categories
- **Responsive Design**: Mobile-first approach with collapsible navigation
- **Rich Content**: Article reader with table of contents and structured content

## Quick Start

1. Extract the archive:
   ```bash
   tar -xzf ecloudworx-university.tar.gz
   cd ecloudworx-university
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5000`

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Node.js, Express.js, TypeScript
- **UI Components**: Radix UI primitives with shadcn/ui
- **State Management**: TanStack Query for server state
- **Storage**: In-memory storage (can be easily switched to PostgreSQL)

## Project Structure

- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript schemas and types
- Configuration files for Vite, Tailwind, TypeScript, etc.

## API Endpoints

- `GET /api/categories` - Fetch all categories
- `GET /api/articles` - Fetch articles (supports search and filtering)
- `GET /api/articles/:id` - Fetch specific article
- `GET /api/articles/popular` - Fetch popular articles
- `POST /api/categories` - Create new category
- `POST /api/articles` - Create new article

## Development Notes

- The application uses in-memory storage for development
- Sample data is automatically seeded on startup
- Hot module replacement is enabled for fast development
- All components include proper test IDs for testing

## Customization

The application is highly modular and can be easily customized:

- Colors and branding in `client/src/index.css`
- Component styling with Tailwind utilities
- Data models in `shared/schema.ts`
- API endpoints in `server/routes.ts`