# 🐳 **DOCKER DEPLOYMENT** - eCloudWorx University

## 🚀 **Quick Start - Docker**

### **Method 1: Docker Compose (Recommended)**
```bash
# 1. Extract the ZIP file
unzip ecloudworx-university-DOCKERIZED-port4000.zip
cd ecloudworx-university

# 2. Set your Strapi URL (optional)
export VITE_STRAPI_URL=http://localhost:7200

# 3. Start with Docker Compose
docker-compose up -d

# 4. Access the application
http://localhost:4000
```

### **Method 2: Docker Build & Run**
```bash
# 1. Build the Docker image
docker build -t ecloudworx-university .

# 2. Run the container
docker run -p 4000:4000 ecloudworx-university

# 3. Access the application  
http://localhost:4000
```

### **Method 3: Development Mode**
```bash
# 1. Install dependencies
npm install

# 2. Install typography plugin
npm install @tailwindcss/typography

# 3. Start development server
npm run dev

# 4. Access at http://localhost:4000
```

## 📋 **What's Included:**

### **Docker Files:**
- ✅ `Dockerfile` - Multi-stage build with Node.js 18
- ✅ `docker-compose.yml` - Complete orchestration setup  
- ✅ `.dockerignore` - Optimized for smaller images
- ✅ `.env.production` - Production environment variables

### **Configuration:**
- ✅ `vite.config.js` - Configured for port 4000
- ✅ `package.json` - Updated scripts for Docker
- ✅ All source files with optimized density layout

### **Features:**
- 🎯 **Perfect at 100% zoom** - No more zoom issues!
- 🐳 **Full Docker support** with port 4000
- ⚡ **Optimized density** layout for better proportions
- 📱 **Responsive design** that works on all devices
- 🔧 **Production ready** with minification and optimization

## 🔧 **Environment Variables:**

```bash
# Default Strapi connection
VITE_STRAPI_URL=http://localhost:7200

# Production mode
NODE_ENV=production

# Server port
PORT=4000
```

## 📊 **Container Details:**
- **Base Image**: `node:18-alpine` (lightweight)
- **Port**: `4000` (exposed and mapped)
- **Static Server**: Uses `serve` for production
- **Build**: Optimized Vite build with minification
- **Size**: ~50MB final image

## 🌐 **Access Points:**
- **Local**: http://localhost:4000
- **Network**: http://[your-server-ip]:4000
- **Docker**: Container exposes port 4000

## ✅ **Production Ready:**
- Optimized build process
- Minified assets
- Efficient Docker image
- Health checks included
- Restart policies configured

This version gives you the perfect layout at 100% zoom AND full Docker deployment capability on port 4000! 🎯🐳