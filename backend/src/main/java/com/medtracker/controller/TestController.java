package com.medtracker.controller;

import com.medtracker.dto.ApiResponse;
import com.medtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Backend is working! Server is up and running.");
    }
    
    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Medication Tracker Backend API - Working!");
    }
    
    @GetMapping("/db")
    public ResponseEntity<ApiResponse<String>> testDatabase() {
        try {
            // Simple test - just check if we can create a response
            String message = "Database endpoint accessible! MongoDB should be connecting to: medication_tracker_project";
            return ResponseEntity.ok(ApiResponse.success(message));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Database endpoint failed: " + e.getMessage()));
        }
    }
}
