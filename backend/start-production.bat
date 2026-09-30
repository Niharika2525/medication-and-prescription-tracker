@echo off
echo Starting Medication Tracker Backend in Production Mode...
echo.

REM Set Java Home
set JAVA_HOME=C:\Program Files\Java\jdk-25.0.2

REM Set Production Profile
set SPRING_PROFILES_ACTIVE=production

REM Set Memory
set JAVA_OPTS=-Xms512m -Xmx1024m

echo Java Home: %JAVA_HOME%
echo Profile: %SPRING_PROFILES_ACTIVE%
echo Java Options: %JAVA_OPTS%
echo.

REM Check if MongoDB is running
netstat -an | findstr ":27017" > nul
if %errorlevel% neq 0 (
    echo MongoDB is not running. Starting MongoDB...
    mkdir C:\data\db 2>nul
    start /B mongod --dbpath "C:\data\db"
    timeout /t 5
)

echo Starting Spring Boot Application...
echo.

REM Start the application
cd /d "%~dp0"
mvn spring-boot:run

pause
