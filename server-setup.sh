#!/bin/bash

# Simple server setup script for Docker deployment
# Run this on your server

echo "🐳 Installing Docker and Docker Compose..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add current user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create project directory
sudo mkdir -p /opt/PersonalBlog
sudo chown $USER:$USER /opt/PersonalBlog

echo "✅ Docker installation complete!"
echo "Please log out and back in for Docker permissions to take effect."
echo ""
echo "Next steps:"
echo "1. Clone your repository to /opt/PersonalBlog"
echo "2. Run the deploy script"
