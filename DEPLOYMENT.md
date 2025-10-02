# Portfolio Deployment Guide

This guide will help you deploy your Astro portfolio website with automatic HTTPS using Docker and Traefik.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed on your server
- A registered domain name
- Server with a public IP address

### 1. Domain Setup
Point your domain's A record to your server's IP address:
```
Type: A
Name: @ (or your subdomain)
Value: YOUR_SERVER_IP
TTL: 300 (or default)
```

### 2. Deploy with One Command
```bash
# Make the script executable
chmod +x deploy.sh

# Deploy (replace with your actual domain and email)
./deploy.sh yourdomain.com your-email@example.com
```

### 3. Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# 1. Update docker-compose.yml
# Replace 'yourdomain.com' with your actual domain
# Replace 'your-email@example.com' with your email

# 2. Create Docker network
docker network create traefik

# 3. Start services
docker-compose up --build -d
```

## 📁 Files Overview

- `Dockerfile` - Multi-stage build for optimized production image
- `nginx.conf` - Nginx configuration with security headers and caching
- `docker-compose.yml` - Docker Compose with Traefik reverse proxy
- `deploy.sh` - Automated deployment script
- `.dockerignore` - Excludes unnecessary files from Docker build

## 🔧 Configuration Details

### Traefik Features
- Automatic SSL certificates via Let's Encrypt
- HTTP to HTTPS redirect
- Docker service discovery
- Dashboard available at `:8080`

### Nginx Optimizations
- Gzip compression
- Static asset caching (1 year)
- Security headers
- SPA routing support
- Health check endpoint

## 🔍 Monitoring & Maintenance

### Check Status
```bash
# View all containers
docker-compose ps

# Check logs
docker-compose logs -f

# Check specific service logs
docker-compose logs -f portfolio
docker-compose logs -f traefik
```

### Update Deployment
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose up --build -d
```

### SSL Certificate Renewal
Let's Encrypt certificates auto-renew. Check status:
```bash
# Check certificate info
docker-compose exec traefik cat /letsencrypt/acme.json
```

## 🛠️ Troubleshooting

### Domain Not Resolving
1. Verify DNS A record points to correct IP
2. Wait for DNS propagation (up to 24 hours)
3. Test with `nslookup yourdomain.com`

### SSL Certificate Issues
1. Ensure port 80 and 443 are open
2. Check Traefik logs: `docker-compose logs traefik`
3. Verify email in docker-compose.yml is valid

### Container Issues
```bash
# Restart all services
docker-compose restart

# Force rebuild
docker-compose down
docker-compose up --build -d --force-recreate
```

## 🔒 Security Considerations

- Traefik dashboard is exposed on port 8080 (consider restricting access)
- Regular security updates recommended
- Monitor logs for suspicious activity
- Consider adding fail2ban for additional protection

## 📊 Performance

- Nginx serves static files efficiently
- Gzip compression reduces bandwidth
- Browser caching improves load times
- Health checks ensure reliability

## 🌐 Custom Domain Setup Examples

### Cloudflare
1. Add A record: `@` → `YOUR_SERVER_IP`
2. Set SSL/TLS mode to "Full"
3. Enable "Always Use HTTPS"

### Namecheap
1. Go to Advanced DNS
2. Add A record: `@` → `YOUR_SERVER_IP`
3. Remove default parking page records

### GoDaddy
1. Go to DNS Management
2. Edit A record: `@` → `YOUR_SERVER_IP`
3. Save and wait for propagation

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Docker and Traefik logs
3. Ensure firewall allows ports 80 and 443
4. Verify domain DNS configuration