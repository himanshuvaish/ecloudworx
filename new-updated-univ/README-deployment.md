# eCloudWorx University - Internet Deployment

## Quick Answer

**No, your frontend cannot directly talk to localhost:7200 when exposed to the internet.** When users access your site, the JavaScript runs in *their* browser, so `localhost:7200` points to their machine, not your server.

## The Solution

Use **nginx reverse proxy** to serve both frontend and backend through one port:

```
Internet → nginx:80 → {
    / → React Frontend
    /api → Strapi Backend (internal)
}
```

## Quick Deployment

1. **Extract this solution package** to your eCloudWorx University project directory

2. **Make deploy script executable:**
   ```bash
   chmod +x deploy.sh
   ```

3. **Run deployment:**
   ```bash
   ./deploy.sh
   ```

4. **Access your app:**
   - Frontend: `http://your-server-ip/`
   - API: `http://your-server-ip/api/articles`
   - Admin: `http://your-server-ip/admin` (optional)

## What This Does

✅ **Updates your React code** to use relative URLs (`/api` instead of `localhost:7200`)  
✅ **Sets up nginx reverse proxy** to handle internet requests  
✅ **Keeps Strapi internal** - not exposed to internet directly  
✅ **Creates production Docker setup** with proper networking  
✅ **Adds security headers** and performance optimizations  

## Files Included

- `nginx-reverse-proxy.conf` - Nginx configuration
- `docker-compose-solution.yml` - Docker Compose setup  
- `Dockerfile-nginx` - Multi-stage build for frontend
- `deploy.sh` - Automated deployment script
- Complete documentation and troubleshooting guides

## Security Features

🔒 **Only port 80 exposed** to internet  
🔒 **Strapi backend internal** (port 7200 not accessible externally)  
🔒 **Security headers** included  
🔒 **Health checks** and monitoring ready  

## Troubleshooting

```bash
# Check if services are running
docker-compose ps

# View logs
docker-compose logs -f nginx
docker-compose logs -f strapi

# Test endpoints
curl http://localhost/health        # Should return "healthy"
curl http://localhost/             # Should return your React app
curl http://localhost/api/articles # Should return JSON data
```

## Manual Setup (Alternative)

If you prefer manual setup:

1. Update `src/UniversityLanding.jsx`:
   ```javascript
   const STRAPI = import.meta.env.VITE_STRAPI_URL || "/api";
   ```

2. Copy configuration files to your project
3. Run: `docker-compose -f docker-compose-solution.yml up -d --build`

Ready to deploy securely! 🚀

## Support

If you encounter issues:
1. Check the complete solution guide: `internet-exposure-solution.md`
2. Verify all files are in the correct project directory
3. Ensure Docker and Docker Compose are installed
4. Check logs with `docker-compose logs -f`

Your eCloudWorx University will be accessible from the internet while keeping your Strapi backend completely secure!
