# eCloudWorx Help Center

This project is a simple help center application that serves an HTML page with relevant resources and support options. It is designed to be deployed on Google Cloud Run using a Docker container.

## Project Structure

- `Dockerfile`: Instructions to build the Docker image for the application.
- `help.html`: The main HTML document for the help center.
- `style.css`: Styles for the help center.
- `app.js`: JavaScript functionality for the help center.
- `README.md`: Documentation for the project.

## Setup Instructions

1. **Create a Dockerfile**: Ensure your Dockerfile is set up correctly. A basic example could look like this:

   ```dockerfile
   FROM nginx:alpine
   COPY help.html /usr/share/nginx/html/index.html
   COPY style.css /usr/share/nginx/html/
   COPY app.js /usr/share/nginx/html/
   ```

2. **Build the Docker image**: Run the following command in the terminal from the project root directory:

   ```bash
   docker build -t ecloudworx-help-center .
   ```

3. **Test the Docker image locally**: You can run the image locally to ensure it works:

   ```bash
   docker run -p 8080:80 ecloudworx-help-center
   ```

   Access it at `http://localhost:8080`.

4. **Push the Docker image to Google Container Registry**: Tag and push your image:

   ```bash
   docker tag ecloudworx-help-center gcr.io/[PROJECT-ID]/ecloudworx-help-center
   docker push gcr.io/[PROJECT-ID]/ecloudworx-help-center
   ```

5. **Deploy to Google Cloud Run**: Use the Google Cloud Console or the command line to deploy your container:

   ```bash
   gcloud run deploy ecloudworx-help-center --image gcr.io/[PROJECT-ID]/ecloudworx-help-center --platform managed
   ```

6. **Access your service**: After deployment, you will receive a URL to access your running service on Google Cloud Run.

## Usage

Once deployed, users can access the help center through the provided URL. The help center includes various resources, guides, and support options to assist users in navigating the eCloudWorx platform.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.