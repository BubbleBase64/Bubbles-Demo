# Development Guide

## Getting Started

### Environment Setup

1. **Node.js**: Install Node.js v16 or higher
2. **Package Manager**: Use npm or yarn
3. **Mobile Development**: Install Expo CLI for React Native development

### Project Architecture

#### Backend (Node.js)
- **Framework**: Express.js
- **Architecture**: MVC pattern
- **Database**: In-memory (demo purposes)
- **Background Jobs**: Worker threads for news fetching

#### Frontend (React Native)
- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: React Context
- **Styling**: StyleSheet and platform-specific styles
- **Cross-platform**: Supports Web, iOS, and Android

### Development Workflow

1. **Feature Development**:
   - Create feature branch from `main`
   - Implement changes in respective folders
   - Test on multiple platforms
   - Submit pull request

2. **Code Style**:
   - Follow ESLint configurations
   - Use TypeScript for type safety
   - Consistent component structure

3. **Testing**:
   - Unit tests for business logic
   - Integration tests for API endpoints
   - Manual testing on target platforms

### Available Scripts

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with hot reload
npm test           # Run tests
npm run lint       # Lint code
```

#### Frontend
```bash
npm start          # Start Expo development server
npm run web        # Start web development server
npm run android    # Start Android development
npm run ios        # Start iOS development
npm test           # Run tests
npm run lint       # Lint code
```

### Environment Variables

Create `.env` files in respective directories:

#### Backend (.env)
```
PORT=3000
NODE_ENV=development
API_KEY=your_news_api_key
```

#### Frontend (.env)
```
EXPO_API_URL=http://localhost:3000/api
```

### Debugging

- **Backend**: Use VS Code debugger or console.log
- **Frontend**: Use React Native Debugger or Expo dev tools
- **Mobile**: Use device logs and Expo client

### Performance Considerations

- Optimize API responses
- Implement proper caching
- Use React.memo for expensive components
- Lazy load images and content