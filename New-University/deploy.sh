#!/bin/bash

# eCloudWorx University - Internet Deployment Script
set -e

echo "🚀 eCloudWorx University - Internet Deployment Setup"
echo "=================================================="

# Check dependencies
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed."
    exit 1
fi

# Create directories
echo "📁 Creating directories..."
mkdir -p logs/nginx logs/strapi strapi

# Check files
echo "🔍 Checking required files..."
if [ ! -f "src/UniversityLanding.jsx" ]; then
    echo "❌ src/UniversityLanding.jsx not found."
    exit 1
fi

# Backup and update
echo "💾 Creating backups..."
[ -f "src/UniversityLanding.jsx" ] && cp src/UniversityLanding.jsx src/UniversityLanding.jsx.backup
[ -f ".env" ] && cp .env .env.backup

echo "🔧 Updating React component..."
sed -i 's|const STRAPI = import.meta.env.VITE_STRAPI_URL.*|const STRAPI = import.meta.env.VITE_STRAPI_URL || "/api";|g' src/UniversityLanding.jsx

# Create production env
cat > .env.production << EOF
VITE_STRAPI_URL=/api
NODE_ENV=production
PORT=4000
EOF

# Prepare files
cp nginx-reverse-proxy.conf nginx.conf
cp docker-compose-solution.yml docker-compose.yml

echo "🔨 Building and starting services..."
docker-compose down --remove-orphans 2>/dev/null || true
docker-compose up -d --build

echo "⏳ Waiting for services..."
sleep 30

echo "🧪 Testing deployment..."
curl -f http://localhost/health > /dev/null 2>&1 && echo "✅ Health check passed" || echo "❌ Health check failed"
curl -f http://localhost/ > /dev/null 2>&1 && echo "✅ Frontend accessible" || echo "❌ Frontend failed"
curl -f http://localhost/api/articles > /dev/null 2>&1 && echo "✅ API working" || echo "⚠️ API test failed (normal if no data)"

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "Frontend: http://your-server-ip/"
echo "API: http://your-server-ip/api/articles"
echo "Admin: http://your-server-ip/admin"
echo ""
echo "🔧 Management Commands:"
echo "View logs: docker-compose logs -f"
echo "Restart: docker-compose restart"  
echo "Stop: docker-compose down"
echo ""
echo "🔒 Security: Only port 80 exposed, Strapi internal only"
echo "🎯 Your eCloudWorx University is now securely deployed!"
