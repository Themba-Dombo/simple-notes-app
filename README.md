# Simple Notes App: From `localhost` to Production

This project is a hands-on demonstration of the concepts discussed in the "Beyond `localhost`" talk. It's a simple full-stack application designed to showcase a professional development and deployment workflow.

## Core Concepts Demonstrated

1.  **CI/CD (Continuous Integration/Continuous Deployment)**
    * The `.github/workflows/main.yml` file contains a complete GitHub Actions pipeline. When code is pushed to the `main` branch, it automatically builds our Docker container and deploys it to Azure.

2.  **Docker (Containerization)**
    * The `Dockerfile` in the root directory is a multi-stage recipe that builds the React frontend, installs the Node.js backend, and combines them into a single, lightweight, and portable container. This solves the "it works on my machine" problem.

3.  **Cloud Deployment (Azure)**
    * The CI/CD pipeline is configured to deploy our container to **Azure App Service**, a platform for hosting web applications without managing the underlying servers.

4.  **Environment Variables (Secure Configuration)**
    * The backend server (`backend/src/index.js`) is written to accept a `DATABASE_URL` from the environment. This allows us to run the app with different configurations locally vs. in production without changing the code, keeping our secrets safe.

## How to Run Locally

### Without Docker (The "Old" Way)

1.  **Run the Backend:**
    ```bash
    cd backend
    npm install
    npm start
    ```
    *The backend will be running on `http://localhost:8080`.*

2.  **Run the Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    *The frontend will be running on `http://localhost:5173`.*

### With Docker (The "Production" Way)

1.  **Build the Docker image:**
    ```bash
    docker build -t simple-notes-app .
    ```

2.  **Run the Docker container:**
    ```bash
    docker run -p 8080:8080 --env-file .env simple-notes-app
    ```
    *Open your browser to `http://localhost:8080` to see the full application running, just as it would in the cloud!*