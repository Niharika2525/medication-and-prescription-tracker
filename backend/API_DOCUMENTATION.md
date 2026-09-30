# Medication Tracker Backend API Documentation

## 🚀 Server Status
- **Backend URL**: http://localhost:8080
- **Frontend URL**: http://localhost:5173
- **Database**: MongoDB (medication_tracker)
- **Status**: ✅ RUNNING

## 🔐 Authentication

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "PATIENT" // PATIENT, DOCTOR, ADMIN
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {JWT_TOKEN}
```

## 👥 Patient APIs (Requires PATIENT role)

### Get Medications
```http
GET /api/patient/medications
Authorization: Bearer {JWT_TOKEN}
```

### Get Prescriptions
```http
GET /api/patient/prescriptions
Authorization: Bearer {JWT_TOKEN}
```

### Request Refill
```http
POST /api/patient/refills
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

{
  "prescriptionId": "64a1b2c3d4e5f67890",
  "notes": "Need refill for monthly supply"
}
```

### Get Refill Requests
```http
GET /api/patient/refills
Authorization: Bearer {JWT_TOKEN}
```

### Get Doctors List
```http
GET /api/patient/doctors
Authorization: Bearer {JWT_TOKEN}
```

### Get Medication Schedule
```http
GET /api/patient/schedule
Authorization: Bearer {JWT_TOKEN}
```

## 👨‍⚕️ Doctor APIs (Requires DOCTOR role)

### Get Patients
```http
GET /api/doctor/patients
Authorization: Bearer {JWT_TOKEN}
```

### Create Prescription
```http
POST /api/doctor/prescriptions
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

{
  "patientId": "64a1b2c3d4e5f67890",
  "medicationList": [
    {
      "name": "Aspirin",
      "dosage": "500mg",
      "frequency": "Once daily",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    }
  ],
  "dosage": "As directed",
  "instructions": "Take with food"
}
```

### Get Prescription History
```http
GET /api/doctor/history
Authorization: Bearer {JWT_TOKEN}
```

### Get Patient Prescriptions
```http
GET /api/doctor/prescriptions/{patientId}
Authorization: Bearer {JWT_TOKEN}
```

## 👑 Admin APIs (Requires ADMIN role)

### Get All Users
```http
GET /api/admin/users
Authorization: Bearer {JWT_TOKEN}
```

### Delete User
```http
DELETE /api/admin/users/{userId}
Authorization: Bearer {JWT_TOKEN}
```

### Get All Prescriptions
```http
GET /api/admin/prescriptions
Authorization: Bearer {JWT_TOKEN}
```

### Get All Refill Requests
```http
GET /api/admin/refills
Authorization: Bearer {JWT_TOKEN}
```

## 📊 Response Format

All APIs return standardized JSON responses:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## 🔒 Security

### JWT Token
- **Algorithm**: HS256
- **Expiration**: 24 hours (86400 seconds)
- **Header**: `Authorization: Bearer {token}`

### Role-Based Access
- `PATIENT`: Can access patient APIs
- `DOCTOR`: Can access doctor APIs  
- `ADMIN`: Can access admin APIs

## 🌐 CORS Configuration

Frontend at `http://localhost:5173` is already configured for CORS with:
- Allowed origins: http://localhost:5173
- Allowed methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed headers: *
- Credentials: enabled

## 📝 Frontend Integration Guide

### 1. Axios Configuration
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add JWT token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 2. Authentication Flow
```javascript
// Register
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  localStorage.setItem('token', response.data.data.token);
  return response.data;
};

// Login
const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  localStorage.setItem('token', response.data.data.token);
  return response.data;
};

// Get current user
const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data.data;
};
```

### 3. Protected Routes
```javascript
// Get patient medications
const getMedications = async () => {
  const response = await api.get('/patient/medications');
  return response.data.data;
};

// Create prescription (Doctor)
const createPrescription = async (prescriptionData) => {
  const response = await api.post('/doctor/prescriptions', prescriptionData);
  return response.data.data;
};
```

## 🚀 Quick Start

1. **Start MongoDB**: `mongod --dbpath "C:\data\db"`
2. **Start Backend**: `mvn spring-boot:run`
3. **Start Frontend**: `npm run dev` (in your React project)
4. **Access Application**: http://localhost:5173

## ✅ Test Data

### Test Users Created:
- **Patient**: patient@test.com / password123
- **Doctor**: doctor@test.com / password123  
- **Admin**: admin@test.com / password123

All APIs are fully functional and ready for frontend integration!
