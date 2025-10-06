# Example Environment Variables

## Backend Configuration

```bash
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=localhost

# Database Configuration (if using external DB)
DATABASE_URL=mongodb://localhost:27017/bubbles-demo
REDIS_URL=redis://localhost:6379

# API Keys
NEWS_API_KEY=your_news_api_key_here
WEATHER_API_KEY=your_weather_api_key_here

# Security
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=debug
LOG_FORMAT=combined

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Frontend Configuration

```bash
# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:5000
EXPO_PUBLIC_API_TIMEOUT=10000

# Feature Flags
EXPO_PUBLIC_ENABLE_ANALYTICS=false
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=false
EXPO_PUBLIC_DEBUG_MODE=true

# Theme Configuration
EXPO_PUBLIC_DEFAULT_THEME=light
EXPO_PUBLIC_ENABLE_DARK_MODE=true

# Performance
EXPO_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
EXPO_PUBLIC_CACHE_TIMEOUT=300000

# Development
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
REACT_NATIVE_PACKAGER_HOSTNAME=localhost
```

## Docker Environment

```bash
# Docker Compose Environment
COMPOSE_PROJECT_NAME=bubbles-demo
COMPOSE_FILE=docker-compose.yml

# Service Ports
FRONTEND_PORT=3000
BACKEND_PORT=5000
NGINX_PORT=80

# Network Configuration
NETWORK_NAME=bubbles-network
```

## Production Environment

```bash
# Backend Production
NODE_ENV=production
PORT=5000
DATABASE_URL=mongodb://your-production-db/bubbles
REDIS_URL=redis://your-production-redis

# Frontend Production
EXPO_PUBLIC_API_URL=https://api.your-domain.com
EXPO_PUBLIC_ENABLE_ANALYTICS=true
EXPO_PUBLIC_DEBUG_MODE=false

# Security (Production)
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://your-domain.com
```

## Usage Instructions

1. Copy the relevant sections to `.env` files in your project
2. Replace placeholder values with actual configuration
3. Never commit `.env` files containing sensitive information
4. Use different configurations for development, staging, and production