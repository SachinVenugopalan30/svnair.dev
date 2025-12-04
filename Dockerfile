# Multi-stage build for Astro project with Bun
FROM oven/bun:1 AS builder

# Set working directory
WORKDIR /app

# Set environment variables for build
ENV NODE_ENV=production

# Accept build arguments for Umami analytics
ARG PUBLIC_UMAMI_WEBSITE_ID
ARG PUBLIC_UMAMI_API_URL
ARG PUBLIC_ANALYTICS_ENABLED

# Set them as environment variables for the build process
ENV PUBLIC_UMAMI_WEBSITE_ID=$PUBLIC_UMAMI_WEBSITE_ID
ENV PUBLIC_UMAMI_API_URL=$PUBLIC_UMAMI_API_URL
ENV PUBLIC_ANALYTICS_ENABLED=$PUBLIC_ANALYTICS_ENABLED

# Copy package files (package.json and bun.lockb)
COPY package.json bun.lockb* ./

# Install dependencies with Bun (much faster than npm)
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Debug: Show environment variables during build
RUN echo "=== Build Environment ===" && \
    echo "PUBLIC_UMAMI_WEBSITE_ID: $PUBLIC_UMAMI_WEBSITE_ID" && \
    echo "PUBLIC_UMAMI_API_URL: $PUBLIC_UMAMI_API_URL" && \
    echo "PUBLIC_ANALYTICS_ENABLED: $PUBLIC_ANALYTICS_ENABLED"

# Build the project with Bun (Astro build will include analytics env vars)
# Export env vars inline with the build command to ensure Astro sees them
RUN PUBLIC_UMAMI_WEBSITE_ID=$PUBLIC_UMAMI_WEBSITE_ID \
    PUBLIC_UMAMI_API_URL=$PUBLIC_UMAMI_API_URL \
    PUBLIC_ANALYTICS_ENABLED=$PUBLIC_ANALYTICS_ENABLED \
    bun run build

# Debug: List the build output
RUN echo "=== Build Output ===" && ls -la dist/

# Production stage
FROM nginx:alpine

# Set environment for production
ENV NODE_ENV=production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration (make sure it sets correct MIME types)
COPY nginx.conf /etc/nginx/nginx.conf

# Ensure Nginx serves JS files with correct MIME type
RUN echo 'default_type application/octet-stream;' > /etc/nginx/conf.d/mime.types

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
