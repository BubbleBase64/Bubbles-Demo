#!/bin/bash

# Development setup script for Bubbles Demo
# This script sets up the development environment

set -e

echo "🚀 Setting up Bubbles Demo development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="16.0.0"

if ! npx semver -r ">=$REQUIRED_VERSION" "$NODE_VERSION" &> /dev/null; then
    echo -e "${RED}❌ Node.js version $NODE_VERSION is too old. Please install v16 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version $NODE_VERSION is compatible${NC}"

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo -e "${YELLOW}🔧 Installing Expo CLI globally...${NC}"
    npm install -g @expo/cli
fi

cd ..

# Create environment files if they don't exist
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}📝 Creating backend .env file...${NC}"
    cat > backend/.env << EOF
PORT=3000
NODE_ENV=development
API_KEY=demo_api_key
EOF
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}📝 Creating frontend .env file...${NC}"
    cat > frontend/.env << EOF
EXPO_API_URL=http://localhost:3000/api
EOF
fi

echo -e "${GREEN}🎉 Development environment setup complete!${NC}"
echo ""
echo "To start the application:"
echo "1. Start backend: cd backend && npm start"
echo "2. Start frontend: cd frontend && npm start"
echo ""
echo "For mobile development: cd frontend && expo start"