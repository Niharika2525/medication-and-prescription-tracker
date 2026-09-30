# Medication Tracker Backend

A complete Spring Boot backend for the Medication and Prescription Tracker application with JWT authentication and MongoDB integration.

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security**
- **Spring Data MongoDB**
- **JWT Authentication**
- **Maven**
- **Lombok**

## Features

- **Authentication**: User registration, login, JWT token generation
- **Role-Based Access Control**: ADMIN, DOCTOR, PATIENT roles
- **Prescription Management**: Create, view, update prescriptions
- **Medication Tracking**: Track medications and schedules
- **Refill Requests**: Patients can request prescription refills
- **Admin Dashboard**: System monitoring and user management

## Project Structure

```
src/main/java/com/medtracker/
├── controller/          # REST API controllers
├── service/            # Business logic layer
├── repository/         # Data access layer
├── model/             # MongoDB entities
├── dto/               # Data transfer objects
├── security/          # JWT and security configuration
├── config/            # Application configuration
└── MedicationTrackerApplication.java
```

## Database Models

### User
- id, name, email, password (encrypted), role, createdAt

### Prescription
- id, doctorId, patientId, medicationList, dosage, instructions, createdAt, updatedAt

### Medication
- id, name, dosage, frequency, startDate, endDate, patientId, prescriptionId

### RefillRequest
- id, patientId, prescriptionId, status, requestedAt, processedAt, processedBy, notes

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Doctor Endpoints
- `GET /api/doctor/patients` - View assigned patients
- `POST /api/doctor/prescriptions` - Create prescription
- `GET /api/doctor/history` - View prescription history
- `GET /api/doctor/prescriptions` - Get all prescriptions
- `GET /api/doctor/patients/{patientId}/prescriptions` - Get patient prescriptions
- `PUT /api/doctor/prescriptions/{prescriptionId}` - Update prescription

### Patient Endpoints
- `GET /api/patient/medications` - View medications
- `GET /api/patient/prescriptions` - View prescriptions
- `POST /api/patient/refill` - Request refill
- `GET /api/patient/refill-requests` - View refill requests
- `GET /api/patient/doctors` - View doctor list
- `GET /api/patient/medication-schedule` - View medication schedule

### Admin Endpoints
- `GET /api/admin/users` - View all users
- `DELETE /api/admin/users/{userId}` - Delete user
- `POST /api/admin/doctors` - Add new doctor
- `GET /api/admin/reports` - View system reports
- `GET /api/admin/prescriptions` - View all prescriptions
- `GET /api/admin/refill-requests` - View all refill requests

## Prerequisites

- **Java 17** or higher
- **Maven 3.6** or higher
- **MongoDB** running on localhost:27017

## Setup Instructions

### 1. Clone/Setup the Project
```bash
# Navigate to the backend directory
cd "C:\Users\ashu0\Downloads\Medication and Prescription Tracker (3) (1)\backend"
```

### 2. Install Dependencies
```bash
mvn clean install
```

### 3. Start MongoDB
Make sure MongoDB is running on localhost:27017. The application will automatically create/use the `medication_tracker` database.

### 4. Run the Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## Configuration

### Application Properties
The configuration is in `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/medication_tracker

# JWT Configuration
jwt.secret=${JWT_SECRET}
jwt.expiration=86400
```

### CORS Configuration
The backend is configured to accept requests from `http://localhost:5173` (your React frontend).

## Example API Requests

### Register a New User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "PATIENT"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Prescription (Doctor)
```bash
curl -X POST http://localhost:8080/api/doctor/prescriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "patientId": "PATIENT_ID",
    "medicationList": [
      {
        "name": "Aspirin",
        "dosage": "100mg",
        "frequency": "Once daily",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31"
      }
    ],
    "dosage": "100mg daily",
    "instructions": "Take after meals"
  }'
```

### Request Refill (Patient)
```bash
curl -X POST http://localhost:8080/api/patient/refill \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "prescriptionId": "PRESCRIPTION_ID",
    "notes": "Need refill for next month"
  }'
```

## Security

- **JWT Authentication**: All protected endpoints require a valid JWT token
- **Role-Based Access**: Different endpoints are accessible based on user roles
- **Password Encryption**: Passwords are encrypted using BCrypt
- **CORS**: Configured to allow requests from the React frontend

## Default Roles

1. **PATIENT**: Can view prescriptions, request refills, manage medications
2. **DOCTOR**: Can create/update prescriptions, view patient history
3. **ADMIN**: Can manage users, view system reports, full access

## Testing

You can test the API using:
- **Postman**: Import the endpoints and test with different roles
- **curl**: Use the example requests above
- **React Frontend**: Connect to your existing React application

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running on localhost:27017
   - Check the database name in application.properties

2. **JWT Token Issues**
   - Make sure to include "Bearer " prefix before the token
   - Check token expiration (default: 24 hours)

3. **CORS Issues**
   - Verify frontend URL matches the CORS configuration
   - Check that the Authorization header is included

4. **Role Access Issues**
   - Ensure the user has the correct role assigned
   - Check that the endpoint matches the required role

## Development Notes

- The application uses Spring Boot 3.2.0 with Java 17
- MongoDB collections are automatically created
- JWT tokens expire after 24 hours (configurable)
- All passwords are encrypted using BCrypt
- The API follows RESTful conventions

## Next Steps

1. Connect your React frontend to this backend
2. Test all endpoints with different user roles
3. Add additional validation as needed
4. Consider adding email notifications for refill requests
5. Add logging and monitoring for production use
