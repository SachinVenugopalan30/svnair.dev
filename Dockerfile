# Multi-stage build for Next.js project with Bun
FROM oven/bun:1 AS builder

# Set working directory
WORKDIR /app

# Set environment variables for build
ENV NODE_ENV=production

# Accept build arguments for Umami analytics
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ARG NEXT_PUBLIC_UMAMI_API_URL
ARG NEXT_PUBLIC_ANALYTICS_ENABLED

# Set them as environment variables for the build process
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_PUBLIC_UMAMI_API_URL=$NEXT_PUBLIC_UMAMI_API_URL
ENV NEXT_PUBLIC_ANALYTICS_ENABLED=$NEXT_PUBLIC_ANALYTICS_ENABLED

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies with Bun (much faster than npm)
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the project
RUN NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID \
    NEXT_PUBLIC_UMAMI_API_URL=$NEXT_PUBLIC_UMAMI_API_URL \
    NEXT_PUBLIC_ANALYTICS_ENABLED=$NEXT_PUBLIC_ANALYTICS_ENABLED \
    bun run build

# Production stage
FROM nginx:alpine

# Set environment for production
ENV NODE_ENV=production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built files from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom nginx configuration (make sure it sets correct MIME types)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
