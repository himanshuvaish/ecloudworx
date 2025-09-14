# 1. Rebuild your React production bundle (includes the changes)
npm run build

# 2. Stop and remove the existing nginx container
docker rm -f ecloudworx-nginx

# 3. Rebuild the Docker image (picks up the new dist/ folder)
docker build -f Dockerfile-nginx -t ecloudworx-nginx .

# 4. Run the new container
docker run -d --name ecloudworx-nginx -p 80:80 `
  --add-host host.docker.internal:host-gateway `
  ecloudworx-nginx


# Run Servio

ssh -R app.serveo.net:80:localhost:80 serveo.net