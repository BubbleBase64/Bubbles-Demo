# Bubbles News - System Architecture

## Overview

Bubbles follows a **modular service-oriented architecture** designed to support AI-driven news processing, bias detection, and cross-platform delivery. The system is built for scalability, maintainability, and real-time content processing.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   Web Client    │  Mobile (iOS)   │    Mobile (Android)         │
│   React.js      │  React Native   │    React Native             │
│   TailwindCSS   │     Expo        │        Expo                 │
└─────────────────┴─────────────────┴─────────────────────────────┘
                           │
                    ┌─────────────┐
                    │   Cloudflare │
                    │     Pages    │
                    │  (CDN + SSL) │
                    └─────────────┘
                           │
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY                                │
├─────────────────────────────────────────────────────────────────┤
│                 Node.js + Express                               │
│              Hosted on Railway                                  │
│         CORS, Rate Limiting, Authentication                     │
└─────────────────────────────────────────────────────────────────┘
```
   - Full-screen components
   - Screen-specific logic
   - Navigation handlers

4. **Context Layer** (`contexts/`)
   - Global state management
   - Theme configuration
   - Shared data providers

## Data Flow

1. **News Fetching**:
   ```
   External API → Worker → Model → Route → Frontend
   ```

2. **User Interaction**:
   ```
   Frontend → Route → Model → Database/Memory
   ```

3. **Real-time Updates**:
   ```
   Worker → Model → WebSocket/Polling → Frontend
   ```

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Data Storage**: In-memory (demo)

### Frontend
- **Framework**: React Native
- **Language**: TypeScript
- **Navigation**: React Navigation
- **Styling**: StyleSheet + CSS (web)
- **Build Tool**: Expo

### Development Tools
- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Jest
- **Bundling**: Expo/Metro