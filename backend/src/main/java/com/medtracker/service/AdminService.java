package com.medtracker.service;

import com.medtracker.model.Prescription;
import com.medtracker.model.RefillRequest;
import com.medtracker.model.User;
import com.medtracker.repository.PrescriptionRepository;
import com.medtracker.repository.RefillRequestRepository;
import com.medtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private RefillRequestRepository refillRequestRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(userId);
    }

    public User addDoctor(User doctor) {
        doctor.setRole(User.Role.DOCTOR);
        return userRepository.save(doctor);
    }

    public Map<String, Object> getSystemReports() {
        Map<String, Object> reports = new HashMap<>();
        
        List<User> allUsers = userRepository.findAll();
        long totalUsers = allUsers.size();
        long totalDoctors = allUsers.stream()
            .filter(user -> user.getRole() == User.Role.DOCTOR)
            .count();
        long totalPatients = allUsers.stream()
            .filter(user -> user.getRole() == User.Role.PATIENT)
            .count();
        long totalAdmins = allUsers.stream()
            .filter(user -> user.getRole() == User.Role.ADMIN)
            .count();

        List<Prescription> allPrescriptions = prescriptionRepository.findAll();
        long totalPrescriptions = allPrescriptions.size();

        List<RefillRequest> allRefillRequests = refillRequestRepository.findAll();
        long totalRefillRequests = allRefillRequests.size();
        long pendingRefillRequests = allRefillRequests.stream()
            .filter(request -> request.getStatus() == RefillRequest.RefillStatus.PENDING)
            .count();
        long approvedRefillRequests = allRefillRequests.stream()
            .filter(request -> request.getStatus() == RefillRequest.RefillStatus.APPROVED)
            .count();
        long rejectedRefillRequests = allRefillRequests.stream()
            .filter(request -> request.getStatus() == RefillRequest.RefillStatus.REJECTED)
            .count();

        reports.put("totalUsers", totalUsers);
        reports.put("totalDoctors", totalDoctors);
        reports.put("totalPatients", totalPatients);
        reports.put("totalAdmins", totalAdmins);
        reports.put("totalPrescriptions", totalPrescriptions);
        reports.put("totalRefillRequests", totalRefillRequests);
        reports.put("pendingRefillRequests", pendingRefillRequests);
        reports.put("approvedRefillRequests", approvedRefillRequests);
        reports.put("rejectedRefillRequests", rejectedRefillRequests);

        return reports;
    }

    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    public List<RefillRequest> getAllRefillRequests() {
        return refillRequestRepository.findAll();
    }

    public User addUser(User user) {
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User updateUser(String userId, User user) {
        User existingUser = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setRole(user.getRole());
        existingUser.setPhone(user.getPhone());
        existingUser.setSpecialty(user.getSpecialty());
        existingUser.setStatus(user.getStatus());
        
        return userRepository.save(existingUser);
    }

    public Map<String, Object> createBackup() {
        Map<String, Object> backup = new HashMap<>();
        
        List<User> allUsers = userRepository.findAll();
        List<Prescription> allPrescriptions = prescriptionRepository.findAll();
        List<RefillRequest> allRefillRequests = refillRequestRepository.findAll();
        
        backup.put("backupDate", LocalDateTime.now().toString());
        backup.put("users", allUsers);
        backup.put("prescriptions", allPrescriptions);
        backup.put("refillRequests", allRefillRequests);
        backup.put("totalUsers", allUsers.size());
        backup.put("totalPrescriptions", allPrescriptions.size());
        backup.put("totalRefillRequests", allRefillRequests.size());
        
        return backup;
    }

    public void testEmailConfiguration(Map<String, Object> emailConfig) {
        // In a real implementation, this would test the SMTP configuration
        // For now, we'll just simulate a successful test
        String smtpHost = (String) emailConfig.get("smtpHost");
        String smtpPort = (String) emailConfig.get("smtpPort");
        String smtpUsername = (String) emailConfig.get("smtpUsername");
        
        if (smtpHost == null || smtpHost.trim().isEmpty()) {
            throw new RuntimeException("SMTP Host is required");
        }
        
        // Log the test attempt (in real implementation, would send test email)
        System.out.println("Testing email configuration:");
        System.out.println("SMTP Host: " + smtpHost);
        System.out.println("SMTP Port: " + smtpPort);
        System.out.println("SMTP Username: " + smtpUsername);
    }

    public void updateSettings(Map<String, Object> settings) {
        // In a real implementation, this would update system settings
        // For now, we'll just log the settings update
        System.out.println("Updating system settings:");
        settings.forEach((key, value) -> {
            System.out.println(key + ": " + value);
        });
    }
}
