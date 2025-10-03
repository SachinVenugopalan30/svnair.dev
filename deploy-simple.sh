#!/bin/bash

# Simple deployment script for Docker-only setup
# Usage: ./deploy-simple.sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Simple Portfolio Deployment${NC}"
echo "================================"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo -e "${YELLOW}Please create a .env file with the following variables:${NC}"
    echo "DOMAIN=yourdomain.com"
    echo "ACME_EMAIL=your-email@example.com"
    echo ""
    echo "You can copy from .env.example:"
    echo "cp .env.example .env"
    exit 1
fi

# Load environment variables from .env file
set -a  # automatically export all variables
source .env
set +a

# Validate required environment variables
if [ -z "$DOMAIN" ]; then
    echo -e "${RED}❌ Error: DOMAIN not set in .env file${NC}"
    exit 1
fi

if [ -z "$ACME_EMAIL" ]; then
    echo -e "${RED}❌ Error: ACME_EMAIL not set in .env file${NC}"
    exit 1
fi

echo -e "${BLUE}📝 Using domain: $DOMAIN${NC}"
echo -e "${BLUE}📧 Using email: $ACME_EMAIL${NC}"

echo -e "${YELLOW}📝 Using existing .env configuration...${NC}"

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
    echo "• Update: git pull && ./deploy-simple.sh"
else
    echo -e "${RED}❌ Some containers failed to start!${NC}"
    echo "Checking logs..."
    docker-compose -f docker-compose.simple.yml logs
fi
