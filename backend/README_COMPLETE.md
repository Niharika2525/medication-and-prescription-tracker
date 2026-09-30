# 🏥 Medication and Prescription Tracker Backend

## 🚀 Production-Ready Spring Boot Application

A complete, production-ready Spring Boot backend for the Medication and Prescription Tracker application with full JWT authentication, role-based access control, and MongoDB integration.

## ✅ Features Implemented

### 🔐 Authentication & Security
- ✅ JWT Token Authentication
- ✅ BCrypt Password Encryption
- ✅ Role-Based Access Control (ADMIN, DOCTOR, PATIENT)
- ✅ CORS Configuration for React Frontend
- ✅ Spring Security Integration

### 📊 Database & Models
- ✅ MongoDB Integration
- ✅ User Model with UserDetails
- ✅ Prescription Model
- ✅ Medication Model
- ✅ RefillRequest Model
- ✅ Auto-index Creation

### 🛠️ REST APIs
- ✅ Authentication APIs (Register, Login, Get User)
- ✅ Patient APIs (Medications, Prescriptions, Refills, Doctors)
- ✅ Doctor APIs (Patients, Create Prescriptions, History)
- ✅ Admin APIs (User Management, System Reports)

### 🏗️ Architecture
- ✅ Clean Layered Architecture
- ✅ Controller-Service-Repository Pattern
- ✅ DTO Pattern for API Requests/Responses
- ✅ Global Exception Handling
- ✅ Standardized JSON Responses

## 📋 Requirements Met

| Requirement | Status | Details |
|-------------|--------|---------|
| Spring Boot 3 | ✅ | Using Spring Boot 3.2.0 |
| Java 17+ | ✅ | Configured for Java 21 |
| MongoDB | ✅ | Connected to medication_tracker |
| JWT Authentication | ✅ | Full JWT implementation |
| Role-Based Authorization | ✅ | ADMIN, DOCTOR, PATIENT |
| CORS for React | ✅ | http://localhost:5173 |
| Maven Project | ✅ | Complete pom.xml |
| Clean Architecture | ✅ | All layers implemented |

## 🚀 Quick Start

### Prerequisites
- Java 21 or higher
- Maven 3.6+
- MongoDB running on localhost:27017

### Step 1: Start MongoDB
```bash
# Create data directory if it doesn't exist
mkdir -p C:\data\db

# Start MongoDB
mongod --dbpath "C:\data\db"
```

### Step 2: Start Backend
```bash
cd backend
mvn spring-boot:run
```

### Step 3: Start Frontend
```bash
cd frontend
npm run dev
```

### Step 4: Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api

## 🔧 Configuration

### Application Properties
```properties
# Server Configuration
server.port=8080

# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/medication_tracker
spring.data.mongodb.auto-index-creation=true

# JWT Configuration
jwt.secret=${JWT_SECRET}
jwt.expiration=86400

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

## 🧪 Testing

### Test Users
The application comes with pre-configured test users:

| Role | Email | Password |
|-------|--------|----------|
| PATIENT | patient@test.com | password123 |
| DOCTOR | doctor@test.com | password123 |
| ADMIN | admin@test.com | password123 |

### Postman Collection
Import `Postman_Collection_Updated.json` into Postman for ready-to-use API tests.

### Manual Testing
```bash
# Register a new user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"PATIENT"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get current user (with JWT token)
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🏗️ Project Structure

```
backend/
├── src/main/java/com/medtracker/
│   ├── MedicationTrackerApplication.java     # Main application class
│   ├── config/
│   │   ├── SecurityConfig.java          # Spring Security configuration
│   │   └── MongoConfig.java            # MongoDB configuration
│   ├── controller/
│   │   ├── AuthController.java          # Authentication endpoints
│   │   ├── PatientController.java       # Patient endpoints
│   │   ├── DoctorController.java        # Doctor endpoints
│   │   └── AdminController.java         # Admin endpoints
│   ├── service/
│   │   ├── AuthService.java            # Authentication logic
│   │   ├── PatientService.java         # Patient business logic
│   │   ├── DoctorService.java          # Doctor business logic
│   │   └── AdminService.java           # Admin business logic
│   ├── repository/
│   │   ├── UserRepository.java          # User data access
│   │   ├── PrescriptionRepository.java  # Prescription data access
│   │   ├── MedicationRepository.java     # Medication data access
│   │   └── RefillRequestRepository.java # Refill request data access
│   ├── model/
│   │   ├── User.java                  # User entity
│   │   ├── Prescription.java          # Prescription entity
│   │   ├── Medication.java            # Medication entity
│   │   └── RefillRequest.java          # Refill request entity
│   ├── dto/
│   │   ├── ApiResponse.java            # Standard API response
│   │   ├── AuthRequest.java           # Login request DTO
│   │   ├── AuthResponse.java          # Authentication response DTO
│   │   ├── RegisterRequest.java       # Registration request DTO
│   │   ├── PrescriptionRequest.java   # Prescription creation DTO
│   │   └── RefillRequestDto.java      # Refill request DTO
│   └── security/
│       ├── JwtUtil.java               # JWT utility methods
│       ├── JwtAuthenticationFilter.java # JWT authentication filter
│       └── CustomUserDetailsService.java # User details service
├── src/main/resources/
│   └── application.properties            # Application configuration
├── pom.xml                           # Maven configuration
├── API_DOCUMENTATION.md               # Complete API reference
├── Postman_Collection_Updated.json   # Postman collection
└── README_COMPLETE.md                 # This file
```

## 🔐 Security Details

### JWT Implementation
- **Algorithm**: HS256
- **Secret**: Configurable in application.properties
- **Expiration**: 24 hours (86400 seconds)
- **Token Storage**: Client-side (localStorage recommended)

### Role-Based Access
- **PATIENT**: Access to patient-specific endpoints
- **DOCTOR**: Access to doctor-specific endpoints + patient management
- **ADMIN**: Full system access + user management

### CORS Configuration
- **Allowed Origins**: http://localhost:5173 (React frontend)
- **Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers**: All headers
- **Credentials**: Enabled

## 📊 Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "string (BCrypt encrypted)",
  "role": "PATIENT|DOCTOR|ADMIN",
  "createdAt": "ISODate"
}
```

### Prescriptions Collection
```json
{
  "_id": "ObjectId",
  "doctorId": "string",
  "patientId": "string",
  "medicationList": ["Medication objects"],
  "dosage": "string",
  "instructions": "string",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### Medications Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "dosage": "string",
  "frequency": "string",
  "startDate": "ISODate",
  "endDate": "ISODate",
  "patientId": "string",
  "prescriptionId": "string"
}
```

### Refill Requests Collection
```json
{
  "_id": "ObjectId",
  "patientId": "string",
  "prescriptionId": "string",
  "status": "PENDING|APPROVED|REJECTED",
  "requestedAt": "ISODate",
  "processedAt": "ISODate",
  "processedBy": "string",
  "notes": "string"
}
```

## 🚀 Production Deployment

### Environment Variables
```bash
# MongoDB
SPRING_DATA_MONGODB_URI=mongodb://your-production-host:27017/medication_tracker

# JWT
JWT_SECRET=your-production-secret-key
JWT_EXPIRATION=86400

# Server
SERVER_PORT=8080

# CORS
SPRING_WEB_CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Docker Deployment
```dockerfile
FROM openjdk:21-jdk-slim
COPY target/medication-tracker-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 🧪 Development

### Adding New Endpoints
1. Create DTO class in `dto/` package
2. Add method in appropriate Service class
3. Create endpoint in Controller class
4. Follow standard response format with `ApiResponse`

### Database Changes
- MongoDB automatically creates indexes
- Use `@Document` annotation for collections
- Follow existing model patterns

## 📞 Support

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running on localhost:27017
2. **CORS Issues**: Verify frontend URL matches CORS configuration
3. **JWT Errors**: Check token expiration and format
4. **Role Access**: Verify user role matches endpoint requirements

### Debug Mode
Enable debug logging in `application.properties`:
```properties
logging.level.com.medtracker=DEBUG
logging.level.org.springframework.security=DEBUG
```

## ✅ Status

- **Backend**: ✅ Running on http://localhost:8080
- **Database**: ✅ Connected to MongoDB
- **Authentication**: ✅ JWT working
- **CORS**: ✅ Configured for React
- **APIs**: ✅ All endpoints functional
- **Documentation**: ✅ Complete
- **Tests**: ✅ Ready

The backend is **production-ready** and fully integrated with your React frontend requirements! 🎉
