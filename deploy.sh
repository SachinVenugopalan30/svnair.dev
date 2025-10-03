#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Portfolio Deployment Script${NC}"
echo "=================================="

# Function to show help
show_help() {
    echo "Usage: ./deploy.sh [OPTIONS] <domain> <email>"
    echo ""
    echo "Options:"
    echo "  --prod           Use production configuration with GitHub Container Registry"
    echo "  --local          Use local build (default)"
    echo "  --help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh yourdomain.com your-email@example.com"
    echo "  ./deploy.sh --prod yourdomain.com your-email@example.com"
    echo "  ./deploy.sh --local yourdomain.com your-email@example.com"
}

# Parse arguments
PROD_MODE=false
while [[ $# -gt 0 ]]; do
    case $1 in
        --prod)
            PROD_MODE=true
            shift
            ;;
        --local)
            PROD_MODE=false
            shift
            ;;
        --help)
            show_help
            exit 0
            ;;
        -*)
            echo -e "${RED}❌ Unknown option $1${NC}"
            show_help
            exit 1
            ;;
        *)
            break
            ;;
    esac
done

# Check if domain is provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: Please provide your domain name${NC}"
    show_help
    exit 1
fi

if [ -z "$2" ]; then
    echo -e "${RED}❌ Error: Please provide your email for Let's Encrypt${NC}"
    show_help
    exit 1
fi

DOMAIN=$1
EMAIL=$2
COMPOSE_FILE="docker-compose.yml"

if [ "$PROD_MODE" = true ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
    echo -e "${BLUE}🏭 Production mode enabled${NC}"
else
    echo -e "${BLUE}🛠️  Local build mode enabled${NC}"
fi

echo -e "${YELLOW}📝 Creating environment file...${NC}"

# Create .env file
cat > .env << EOF
DOMAIN=$DOMAIN
ACME_EMAIL=$EMAIL
COMPOSE_FILE=$COMPOSE_FILE
EOF

echo -e "${YELLOW}🔧 Creating Docker network...${NC}"
docker network create traefik 2>/dev/null || echo "Network already exists"

echo -e "${YELLOW}📦 Preparing containers...${NC}"
docker-compose -f $COMPOSE_FILE down

if [ "$PROD_MODE" = true ]; then
    echo -e "${YELLOW}🐳 Pulling latest image from GitHub Container Registry...${NC}"
    docker pull ghcr.io/sachinvenugopalan30/personalblog:latest || {
        echo -e "${RED}❌ Failed to pull image. Make sure GitHub Actions has run successfully.${NC}"
        exit 1
    }
    
    # Update docker-compose.prod.yml to use the image instead of build
    sed -i 's|build: \.|image: ghcr.io/sachinvenugopalan30/personalblog:latest|g' $COMPOSE_FILE
fi

echo -e "${YELLOW}🚀 Starting containers...${NC}"
docker-compose -f $COMPOSE_FILE up -d

# Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 10

# Check if containers are running
if docker-compose -f $COMPOSE_FILE ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Deployment complete!${NC}"
    echo ""
    echo "Your portfolio should be available at:"
    echo -e "${GREEN}🌐 https://$DOMAIN${NC}"
    echo -e "${GREEN}📊 Traefik Dashboard: http://$DOMAIN:8080${NC}"
    echo ""
    echo -e "${YELLOW}📋 Next steps:${NC}"
    echo "1. Point your domain's A record to this server's IP address"
    echo "2. Wait a few minutes for DNS propagation"
    echo "3. Let's Encrypt will automatically generate SSL certificates"
    echo ""
    echo -e "${YELLOW}🔍 Useful commands:${NC}"
    echo "• Check logs: docker-compose -f $COMPOSE_FILE logs -f"
    echo "• Restart: docker-compose -f $COMPOSE_FILE restart"
    echo "• Stop: docker-compose -f $COMPOSE_FILE down"
    echo "• Update: git pull && ./deploy.sh $([[ \"$PROD_MODE\" == true ]] && echo '--prod') $DOMAIN $EMAIL"
else
    echo -e "${RED}❌ Some containers failed to start. Check logs:${NC}"
    docker-compose -f $COMPOSE_FILE logs
    exit 1
fi