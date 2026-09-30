@echo off
title Medication Tracker Backend - Production
color 0A
echo ========================================
echo   Starting Backend Server...
echo ========================================
echo.

REM Set Java Home
set JAVA_HOME=C:\Program Files\Java\jdk-25.0.2
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set Production Environment
set SPRING_PROFILES_ACTIVE=production
set SERVER_PORT=8080

echo Java Version:
java -version
echo.
echo Environment: %SPRING_PROFILES_ACTIVE%
echo Port: %SERVER_PORT%
echo.

REM Check MongoDB
echo Checking MongoDB...
tasklist | find "mongod" > nul
if %errorlevel% neq 0 (
    echo [WARNING] MongoDB not running!
    echo Starting MongoDB...
    if not exist "C:\data\db" mkdir "C:\data\db"
    start /B mongod --dbpath "C:\data\db" --logpath "C:\data\db\mongod.log" --quiet
    timeout /t 5 > nul
    echo MongoDB started successfully!
) else (
    echo [OK] MongoDB is running!
)
echo.

REM Build and Run
echo Building application...
call mvn clean package -DskipTests -q
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo [OK] Build successful!
echo.

echo ========================================
echo   STARTING BACKEND SERVER
echo   Access: http://localhost:%SERVER_PORT%
echo   Press Ctrl+C to stop
echo ========================================
echo.

REM Start server (this will keep running)
java -jar target\medication-tracker-backend-1.0.0.jar --server.port=%SERVER_PORT% --spring.profiles.active=%SPRING_PROFILES_ACTIVE%

echo.
echo Backend stopped.
pause
