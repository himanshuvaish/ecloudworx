# eCloudWorx University Knowledge Base

## Overview

This is a knowledge base application called "eCloudWorx University" built as a full-stack web application. It provides a comprehensive platform for cloud management tutorials, guides, and best practices. The application features a modern, responsive interface with article categorization, search functionality, and user-friendly navigation. It serves as an educational resource for users to learn about cloud platforms like AWS, Azure, and Google Cloud, along with topics such as monitoring, security, and troubleshooting.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible components
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod for validation and type safety

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with endpoints for categories and articles
- **Error Handling**: Centralized error middleware with structured error responses
- **Development**: Hot module replacement via Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Development Storage**: In-memory storage implementation for development/testing with seeded data

### Database Schema Design
- **Users Table**: Basic user management with username/password authentication
- **Categories Table**: Article categorization with icons, descriptions, and article counts
- **Articles Table**: Content storage with rich metadata including tags, read time, views, and featured status
- **Relationships**: Articles reference categories via foreign key relationships

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Security**: Prepared for user authentication but currently focuses on content delivery
- **API Protection**: Basic request logging and error handling middleware

### API Structure
- **Categories Endpoint**: GET /api/categories for listing, POST for creation
- **Articles Endpoints**: 
  - GET /api/articles with search and category filtering
  - GET /api/articles/:id for individual article retrieval
  - Support for popular articles and featured content queries
- **Validation**: Zod schemas for request validation and type safety
- **Response Format**: Consistent JSON responses with proper HTTP status codes

### Content Management Features
- **Search Functionality**: Full-text search across article titles and content
- **Category Filtering**: Dynamic filtering by category with real-time updates
- **Article Features**: View tracking, featured articles, read time estimation
- **Responsive Design**: Mobile-first approach with collapsible navigation and adaptive layouts

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm** and **drizzle-zod**: Type-safe database operations and validation
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **wouter**: Lightweight React router for client-side navigation

### UI and Styling Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives for components
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Component variant management
- **clsx**: Conditional CSS class composition utility

### Development and Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety and enhanced developer experience
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **esbuild**: Fast JavaScript bundler for production builds

### Form and Validation Libraries
- **react-hook-form**: Efficient form state management
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries
- **zod**: Schema validation for type-safe data handling

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **embla-carousel-react**: Carousel/slider component functionality
- **cmdk**: Command palette and search interface components

### Session and Storage
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **express-session**: Session middleware for user state management

### Development Environment
- **Replit Integration**: Configured for Replit development environment with appropriate plugins and banner scripts
- **Hot Module Replacement**: Vite integration for fast development iteration
- **TypeScript Configuration**: Strict type checking with path mapping for clean imports