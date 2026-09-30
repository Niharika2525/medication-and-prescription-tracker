# Medication Tracker Backend - Complete API Test Script
# This script tests all endpoints to prove everything is working

Write-Host "========================================" -ForegroundColor Green
Write-Host "  MEDICATION TRACKER BACKEND TEST" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Test 1: Health Check
Write-Host "🔍 Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/test/health" -Method GET
    Write-Host "✅ Health Check: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health Check Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: User Registration
Write-Host "👤 Testing User Registration..." -ForegroundColor Yellow
try {
    $body = @{
        name = "Test User"
        email = "testuser@medtracker.com"
        password = "password123"
        role = "PATIENT"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" -Method POST -ContentType "application/json" -Body $body
    Write-Host "✅ Registration: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ Registration Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: User Login
Write-Host "🔑 Testing User Login..." -ForegroundColor Yellow
try {
    $body = @{
        email = "testuser@medtracker.com"
        password = "password123"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" -Method POST -ContentType "application/json" -Body $body
    Write-Host "✅ Login: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ Login Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Server Status
Write-Host "🌐 Checking Server Status..." -ForegroundColor Yellow
try {
    $process = Get-Process -Name "java" -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "✅ Backend Process Running (PID: $($process.Id))" -ForegroundColor Green
    } else {
        Write-Host "❌ Backend Process Not Found" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Process Check Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 5: Port Status
Write-Host "🔌 Checking Port 8080..." -ForegroundColor Yellow
try {
    $connection = Test-NetConnection -ComputerName localhost -Port 8080
    if ($connection.TcpTestSucceeded) {
        Write-Host "✅ Port 8080: OPEN" -ForegroundColor Green
    } else {
        Write-Host "❌ Port 8080: CLOSED" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Port Check Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  TEST COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 If all tests show ✅ GREEN, your backend is working perfectly!" -ForegroundColor Cyan
Write-Host "📱 Your React frontend can now connect to: http://localhost:8080/api" -ForegroundColor Cyan
Write-Host ""
