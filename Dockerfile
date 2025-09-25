# Stage 1: Build the React Frontend
# We use a specific Node version for consistency
FROM node:20-alpine AS build-stage

WORKDIR /app/notes-app

# Copy package files and install dependencies
COPY notes-app/package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY notes-app/ ./

# Build the production-ready static files
RUN npm run build

# Stage 2: Setup the Node.js Backend & Combine
# Use the same base image for consistency
FROM node:20-alpine AS production-stage

WORKDIR /app/backend

# Copy package files and install ONLY production dependencies
COPY backend/package*.json ./
RUN npm install --omit=dev

# Copy the backend source code
COPY backend/ ./

# **The Magic Step**: Copy the built frontend from the previous stage
# into a 'public' directory that Express can serve.
COPY --from=build-stage /app/notes-app/dist ./public

# Tell Docker what port the container will run on
EXPOSE 8080

# The command to start the server when the container starts
CMD [ "node", "src/index.js" ]