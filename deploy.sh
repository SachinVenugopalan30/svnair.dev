#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Portfolio Deployment Script${NC}"
echo "=================================="

# Check if domain is provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: Please provide your domain name${NC}"
    echo "Usage: ./deploy.sh yourdomain.com your-email@example.com"
    exit 1
fi

if [ -z "$2" ]; then
    echo -e "${RED}❌ Error: Please provide your email for Let's Encrypt${NC}"
    echo "Usage: ./deploy.sh yourdomain.com your-email@example.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo -e "${YELLOW}📝 Updating configuration files...${NC}"

# Update docker-compose.yml with actual domain and email
sed -i "s/yourdomain.com/$DOMAIN/g" docker-compose.yml
sed -i "s/your-email@example.com/$EMAIL/g" docker-compose.yml

echo -e "${YELLOW}🔧 Creating Docker network...${NC}"
docker network create traefik 2>/dev/null || echo "Network already exists"

echo -e "${YELLOW}📦 Building and starting containers...${NC}"
docker-compose down
docker-compose up --build -d

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Your portfolio should be available at:"
echo -e "${GREEN}🌐 https://$DOMAIN${NC}"
echo -e "${GREEN}📊 Traefik Dashboard: https://$DOMAIN:8080${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Point your domain's A record to this server's IP address"
echo "2. Wait a few minutes for DNS propagation"
echo "3. Let's Encrypt will automatically generate SSL certificates"
echo ""
echo -e "${YELLOW}🔍 Useful commands:${NC}"
echo "• Check logs: docker-compose logs -f"
echo "• Restart: docker-compose restart"
echo "• Stop: docker-compose down"