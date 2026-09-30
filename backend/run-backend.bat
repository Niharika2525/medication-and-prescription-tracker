@echo off
echo ========================================
echo   Medication Tracker Backend
echo   Production Startup Script
echo ========================================
echo.

REM Set Java Home
set JAVA_HOME=C:\Program Files\Java\jdk-25.0.2
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set Environment Variables
set SPRING_PROFILES_ACTIVE=production
set SERVER_PORT=8080

echo Java Home: %JAVA_HOME%
echo Profile: %SPRING_PROFILES_ACTIVE%
echo Port: %SERVER_PORT%
echo.

REM Check if MongoDB is running
tasklist | find "mongod" > nul
if %errorlevel% neq 0 (
    echo MongoDB is not running. Starting MongoDB...
    if not exist "C:\data\db" mkdir "C:\data\db"
    start /B mongod --dbpath "C:\data\db" --logpath "C:\data\db\mongod.log"
    echo Waiting for MongoDB to start...
    timeout /t 10 > nul
)

REM Clean and Build
echo Cleaning and building project...
call mvn clean package -DskipTests
if %errorlevel% neq 0 (
    echo BUILD FAILED!
    pause
    exit /b 1
)

echo Build successful!
echo.

REM Start Application
echo Starting Medication Tracker Backend...
echo Server will be available at: http://localhost:%SERVER_PORT%
echo Press Ctrl+C to stop the server
echo.

java -jar target\medication-tracker-backend-1.0.0.jar --server.port=%SERVER_PORT% --spring.profiles.active=%SPRING_PROFILES_ACTIVE%

echo.
echo Backend stopped.
pause
