# Test Script for Medication Tracker API

Write-Host "=== Testing Medication Tracker API ===" -ForegroundColor Green

# Test 1: Register a Doctor
Write-Host "1. Registering a Doctor..." -ForegroundColor Yellow
$doctorResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" -Method POST -ContentType "application/json" -Body '{"name":"Dr. Smith","email":"doctor@test.com","password":"password123","role":"DOCTOR"}' | ConvertFrom-Json
Write-Host "   Status: $($doctorResponse.success)" -ForegroundColor Green
$doctorToken = $doctorResponse.data.token

# Test 2: Register an Admin
Write-Host "2. Registering an Admin..." -ForegroundColor Yellow
$adminResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" -Method POST -ContentType "application/json" -Body '{"name":"Admin User","email":"admin@test.com","password":"password123","role":"ADMIN"}' | ConvertFrom-Json
Write-Host "   Status: $($adminResponse.success)" -ForegroundColor Green
$adminToken = $adminResponse.data.token

# Test 3: Login as Patient
Write-Host "3. Logging in as Patient..." -ForegroundColor Yellow
$loginResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"patient@test.com","password":"password123"}' | ConvertFrom-Json
Write-Host "   Status: $($loginResponse.success)" -ForegroundColor Green
$patientToken = $loginResponse.data.token

# Test 4: Get current user (Patient)
Write-Host "4. Getting current patient info..." -ForegroundColor Yellow
$headers = @{
    "Authorization" = "Bearer $patientToken"
    "Content-Type" = "application/json"
}
try {
    $userResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/me" -Method GET -Headers $headers | ConvertFrom-Json
    Write-Host "   Status: Success - User: $($userResponse.data.email)" -ForegroundColor Green
} catch {
    Write-Host "   Status: Failed - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Get patient medications
Write-Host "5. Getting patient medications..." -ForegroundColor Yellow
try {
    $medsResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/patient/medications" -Method GET -Headers $headers | ConvertFrom-Json
    Write-Host "   Status: Success - Found $($medsResponse.data.Count) medications" -ForegroundColor Green
} catch {
    Write-Host "   Status: Failed - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Get doctors list
Write-Host "6. Getting doctors list..." -ForegroundColor Yellow
try {
    $doctorsResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/patient/doctors" -Method GET -Headers $headers | ConvertFrom-Json
    Write-Host "   Status: Success - Found $($doctorsResponse.data.Count) doctors" -ForegroundColor Green
} catch {
    Write-Host "   Status: Failed - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "=== API Test Complete ===" -ForegroundColor Green
