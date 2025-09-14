# Troubleshooting Guide - eCloudWorx Internet Deployment

## Common Issues and Solutions

### 1. "Docker not found" Error
**Problem:** Docker or Docker Compose not installed
**Solution:**
```bash
# Install Docker (Ubuntu/Debian)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. "Permission denied" on deploy.sh
**Problem:** Script not executable
**Solution:**
```bash
chmod +x deploy.sh
```

### 3. Port 80 Already in Use
**Problem:** Another service using port 80
**Solution:**
```bash
# Check what's using port 80
sudo netstat -tulpn | grep :80

# Stop conflicting service (e.g., Apache)
sudo systemctl stop apache2

# Or change nginx port in docker-compose.yml
ports:
  - "8080:80"  # Use port 8080 instead
```

### 4. API Calls Still Failing
**Problem:** React code still using localhost:7200
**Solution:**
1. Check if `src/UniversityLanding.jsx` was updated:
   ```bash
   grep "localhost:7200" src/UniversityLanding.jsx
   ```
2. If found, manually update:
   ```javascript
   const STRAPI = import.meta.env.VITE_STRAPI_URL || "/api";
   ```
3. Rebuild containers:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

### 5. "strapi" Host Not Found
**Problem:** Nginx can't reach Strapi container
**Solution:**
1. Check if both containers are running:
   ```bash
   docker-compose ps
   ```
2. Verify network connectivity:
   ```bash
   docker exec ecloudworx-nginx ping strapi
   ```
3. Check Docker network:
   ```bash
   docker network ls
   docker network inspect <network_name>
   ```

### 6. Static Files Not Loading (404s)
**Problem:** React build files not properly copied
**Solution:**
1. Check if files exist in container:
   ```bash
   docker exec ecloudworx-nginx ls -la /usr/share/nginx/html
   ```
2. Rebuild if empty:
   ```bash
   docker-compose down
   docker-compose build --no-cache nginx
   docker-compose up -d
   ```

### 7. Health Check Failing
**Problem:** Nginx health endpoint not responding
**Solution:**
1. Check nginx config syntax:
   ```bash
   docker exec ecloudworx-nginx nginx -t
   ```
2. View nginx error logs:
   ```bash
   docker logs ecloudworx-nginx
   ```
3. Test health endpoint directly:
   ```bash
   curl -v http://localhost/health
   ```

### 8. Strapi Connection Errors
**Problem:** Strapi not starting or crashing
**Solution:**
1. Check Strapi logs:
   ```bash
   docker logs ecloudworx-strapi
   ```
2. Verify environment variables:
   ```bash
   docker exec ecloudworx-strapi env | grep -E "(JWT|DATABASE|NODE_ENV)"
   ```
3. Check Strapi health:
   ```bash
   docker exec ecloudworx-strapi curl http://localhost:7200/_health
   ```

## Diagnostic Commands

### Check Service Status
```bash
# Container status
docker-compose ps

# Resource usage
docker stats

# Network information
docker network ls
docker network inspect ecloudworx_internal
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service  
docker-compose logs -f nginx
docker-compose logs -f strapi

# Last 50 lines
docker-compose logs --tail=50 nginx
```

### Test Connectivity
```bash
# External access
curl -I http://localhost/
curl http://localhost/health
curl http://localhost/api/articles

# Internal container access
docker exec ecloudworx-nginx curl http://strapi:7200/api/articles
```

### Debug Container Issues
```bash
# Enter container shell
docker exec -it ecloudworx-nginx sh
docker exec -it ecloudworx-strapi sh

# Check container configuration
docker inspect ecloudworx-nginx
docker inspect ecloudworx-strapi
```

## Performance Issues

### Slow Loading
1. Check resource usage: `docker stats`
2. Verify gzip compression is working: `curl -H "Accept-Encoding: gzip" -I http://localhost/`
3. Monitor nginx access logs for slow requests

### High Memory Usage
1. Limit container memory in docker-compose.yml:
   ```yaml
   deploy:
     resources:
       limits:
         memory: 512M
   ```

## Security Verification

### Confirm Strapi Is Not Exposed
```bash
# This should fail (good!)
curl http://your-server-ip:7200/api/articles

# This should work
curl http://your-server-ip/api/articles
```

### Check Security Headers
```bash
curl -I http://localhost/ | grep -E "(X-Frame-Options|X-XSS-Protection|Content-Security-Policy)"
```

## Recovery Steps

### Complete Reset
```bash
# Stop and remove everything
docker-compose down -v --remove-orphans

# Remove images
docker rmi $(docker images -q ecloudworx*)

# Rebuild from scratch  
docker-compose up -d --build
```

### Restore Original Files
```bash
# If backups exist
cp src/UniversityLanding.jsx.backup src/UniversityLanding.jsx
cp .env.backup .env
```

## Getting Help

1. **Check logs first**: `docker-compose logs -f`
2. **Verify file locations**: Ensure all files are in the correct directory
3. **Test step by step**: Use diagnostic commands above
4. **Check Docker installation**: Ensure Docker and Docker Compose work
5. **Review configuration**: Compare with working examples in documentation

## Success Checklist

After deployment, verify:
- [ ] `docker-compose ps` shows all containers running
- [ ] `curl http://localhost/health` returns "healthy"  
- [ ] `curl http://localhost/` returns HTML content
- [ ] `curl http://localhost/api/articles` returns JSON or 404 (but not connection error)
- [ ] `curl http://localhost:7200/` fails (Strapi not exposed)
- [ ] Web browser can access your site from internet

If all items check out, your deployment is successful! 🎉
