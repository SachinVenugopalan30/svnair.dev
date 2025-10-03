#!/bin/bash

# Simple deployment script for Docker-only setup
# Usage: ./deploy-simple.sh yourdomain.com your-email@example.com

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Simple Portfolio Deployment${NC}"
echo "================================"

# Check if domain is provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: Please provide your domain name${NC}"
    echo "Usage: ./deploy-simple.sh yourdomain.com your-email@example.com"
    exit 1
fi

if [ -z "$2" ]; then
    echo -e "${RED}❌ Error: Please provide your email for Let's Encrypt${NC}"
    echo "Usage: ./deploy-simple.sh yourdomain.com your-email@example.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo -e "${BLUE}📝 Using domain: $DOMAIN${NC}"
echo -e "${BLUE}📧 Using email: $EMAIL${NC}"

# Create .env file
echo -e "${YELLOW}📝 Creating environment configuration...${NC}"
cat > .env << EOF
DOMAIN=$DOMAIN
ACME_EMAIL=$EMAIL
EOF

echo -e "${YELLOW}🔧 Creating Docker network...${NC}"
docker network create traefik 2>/dev/null || echo "Network 'traefik' already exists"

echo -e "${YELLOW}🛑 Stopping any existing containers...${NC}"
docker-compose -f docker-compose.simple.yml down 2>/dev/null || true

echo -e "${YELLOW}🏗️  Building and starting containers...${NC}"
docker-compose -f docker-compose.simple.yml up --build -d

# Wait for services to start
echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 15

# Check container status
if docker-compose -f docker-compose.simple.yml ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
    echo ""
    echo -e "${GREEN}🌐 Your website: https://$DOMAIN${NC}"
    echo -e "${GREEN}📊 Traefik Dashboard: http://$DOMAIN:8080${NC}"
    echo ""
    echo -e "${YELLOW}📋 Important Notes:${NC}"
    echo "1. Make sure your domain's A record points to this server's IP"
    echo "2. SSL certificate will be generated automatically (may take a few minutes)"
    echo "3. If you see 'backend error', wait a minute for SSL setup to complete"
    echo ""
    echo -e "${YELLOW}🔍 Useful Commands:${NC}"
    echo "• Check status: docker-compose -f docker-compose.simple.yml ps"
    echo "• View logs: docker-compose -f docker-compose.simple.yml logs -f"
    echo "• Restart: docker-compose -f docker-compose.simple.yml restart"
    echo "• Stop: docker-compose -f docker-compose.simple.yml down"
    echo "• Update: git pull && ./deploy-simple.sh $DOMAIN $EMAIL"
else
    echo -e "${RED}❌ Some containers failed to start!${NC}"
    echo "Checking logs..."
    docker-compose -f docker-compose.simple.yml logs
fi
