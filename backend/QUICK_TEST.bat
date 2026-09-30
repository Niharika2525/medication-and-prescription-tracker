@echo off
title Backend API Test
color 0A

echo ========================================
echo   TESTING BACKEND API ENDPOINTS
echo ========================================
echo.

echo [1/4] Testing Health Check...
curl -s http://localhost:8080/api/test/health
echo.

echo [2/4] Testing User Registration...
curl -s -X POST http://localhost:8080/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@demo.com\",\"password\":\"password123\",\"role\":\"PATIENT\"}"
echo.

echo [3/4] Testing User Login...
curl -s -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@demo.com\",\"password\":\"password123\"}"
echo.

echo [4/4] Checking Server Status...
netstat -an | findstr ":8080"
echo.

echo ========================================
echo   TEST COMPLETE
echo ========================================
echo.
echo If you see responses above, your backend is working!
echo Your React frontend can connect to: http://localhost:8080/api
echo.
pause
