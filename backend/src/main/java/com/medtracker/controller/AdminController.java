package com.medtracker.controller;

import com.medtracker.dto.ApiResponse;
import com.medtracker.dto.AppointmentRequest;
import com.medtracker.model.Appointment;
import com.medtracker.model.Prescription;
import com.medtracker.model.RefillRequest;
import com.medtracker.model.User;
import com.medtracker.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/test-db-public")
    public ResponseEntity<ApiResponse<String>> testDatabaseConnectionPublic() {
        try {
            // Test database connection by counting users
            long userCount = adminService.getAllUsers().size();
            String message = "Database connection successful! Users count: " + userCount;
            return ResponseEntity.ok(ApiResponse.success(message));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Database connection failed: " + e.getMessage()));
        }
    }

    @GetMapping("/test-db")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> testDatabaseConnection() {
        try {
            // Test database connection by counting users
            long userCount = adminService.getAllUsers().size();
            String message = "Database connection successful! Users count: " + userCount;
            return ResponseEntity.ok(ApiResponse.success(message));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Database connection failed: " + e.getMessage()));
        }
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        try {
            List<User> users = adminService.getAllUsers();
            return ResponseEntity.ok(ApiResponse.success(users));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable String userId) {
        try {
            adminService.deleteUser(userId);
            return ResponseEntity.ok(ApiResponse.success("User deleted successfully", "User deleted"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/doctors")
    public ResponseEntity<ApiResponse<User>> addDoctor(@RequestBody User doctor) {
        try {
            User newDoctor = adminService.addDoctor(doctor);
            return ResponseEntity.ok(ApiResponse.success("Doctor added successfully", newDoctor));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/reports")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSystemReports() {
        try {
            Map<String, Object> reports = adminService.getSystemReports();
            return ResponseEntity.ok(ApiResponse.success(reports));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/prescriptions")
    public ResponseEntity<ApiResponse<List<Prescription>>> getAllPrescriptions() {
        try {
            List<Prescription> prescriptions = adminService.getAllPrescriptions();
            return ResponseEntity.ok(ApiResponse.success(prescriptions));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/refill-requests")
    public ResponseEntity<ApiResponse<List<RefillRequest>>> getAllRefillRequests() {
        try {
            List<RefillRequest> refillRequests = adminService.getAllRefillRequests();
            return ResponseEntity.ok(ApiResponse.success(refillRequests));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/users")
    public ResponseEntity<ApiResponse<User>> addUser(@RequestBody User user) {
        try {
            User newUser = adminService.addUser(user);
            return ResponseEntity.ok(ApiResponse.success("User added successfully", newUser));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<User>> updateUser(@PathVariable String userId, @RequestBody User user) {
        try {
            User updatedUser = adminService.updateUser(userId, user);
            return ResponseEntity.ok(ApiResponse.success("User updated successfully", updatedUser));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/backup")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createBackup() {
        try {
            Map<String, Object> backup = adminService.createBackup();
            return ResponseEntity.ok(ApiResponse.success("Backup created successfully", backup));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/test-email")
    public ResponseEntity<ApiResponse<String>> testEmailConfiguration(@RequestBody Map<String, Object> emailConfig) {
        try {
            adminService.testEmailConfiguration(emailConfig);
            return ResponseEntity.ok(ApiResponse.success("Email test successful"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/settings")
    public ResponseEntity<ApiResponse<String>> updateSettings(@RequestBody Map<String, Object> settings) {
        try {
            adminService.updateSettings(settings);
            return ResponseEntity.ok(ApiResponse.success("Settings updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
