@echo off
REM Development setup script for Bubbles Demo (Windows)
REM This script sets up the development environment

echo 🚀 Setting up Bubbles Demo development environment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    exit /b 1
)

REM Get Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version %NODE_VERSION% detected

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)

REM Check if Expo CLI is installed
expo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔧 Installing Expo CLI globally...
    call npm install -g @expo/cli
)

cd ..

REM Create environment files if they don't exist
if not exist "backend\.env" (
    echo 📝 Creating backend .env file...
    (
        echo PORT=3000
        echo NODE_ENV=development
        echo API_KEY=demo_api_key
    ) > backend\.env
)

if not exist "frontend\.env" (
    echo 📝 Creating frontend .env file...
    (
        echo EXPO_API_URL=http://localhost:3000/api
    ) > frontend\.env
)

echo 🎉 Development environment setup complete!
echo.
echo To start the application:
echo 1. Start backend: cd backend ^&^& npm start
echo 2. Start frontend: cd frontend ^&^& npm start
echo.
echo For mobile development: cd frontend ^&^& expo start

pause