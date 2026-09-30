package com.medtracker.controller;

import com.medtracker.dto.ApiResponse;
import com.medtracker.dto.AppointmentRequest;
import com.medtracker.dto.RefillRequestDto;
import com.medtracker.model.Appointment;
import com.medtracker.model.Medication;
import com.medtracker.model.Prescription;
import com.medtracker.model.RefillRequest;
import com.medtracker.model.User;
import com.medtracker.service.AuthService;
import com.medtracker.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
@PreAuthorize("hasRole('PATIENT')")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private AuthService authService;

    @GetMapping("/medications")
    public ResponseEntity<ApiResponse<List<Medication>>> getMedications() {
        try {
            User currentPatient = authService.getCurrentUser();
            List<Medication> medications = patientService.getMedications(currentPatient.getId());
            return ResponseEntity.ok(ApiResponse.success(medications));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/prescriptions")
    public ResponseEntity<ApiResponse<List<Prescription>>> getPrescriptions() {
        try {
            User currentPatient = authService.getCurrentUser();
            List<Prescription> prescriptions = patientService.getPrescriptions(currentPatient.getId());
            return ResponseEntity.ok(ApiResponse.success(prescriptions));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/refill")
    public ResponseEntity<ApiResponse<RefillRequest>> requestRefill(@Valid @RequestBody RefillRequestDto request) {
        try {
            User currentPatient = authService.getCurrentUser();
            RefillRequest refillRequest = patientService.requestRefill(currentPatient.getId(), request);
            return ResponseEntity.ok(ApiResponse.success("Refill request submitted successfully", refillRequest));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/refill-requests")
    public ResponseEntity<ApiResponse<List<RefillRequest>>> getRefillRequests() {
        try {
            User currentPatient = authService.getCurrentUser();
            List<RefillRequest> refillRequests = patientService.getRefillRequests(currentPatient.getId());
            return ResponseEntity.ok(ApiResponse.success(refillRequests));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/doctors")
    public ResponseEntity<ApiResponse<List<User>>> getDoctors() {
        try {
            List<User> doctors = patientService.getDoctors();
            return ResponseEntity.ok(ApiResponse.success(doctors));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/appointments")
    public ResponseEntity<ApiResponse<Appointment>> createAppointment(@Valid @RequestBody AppointmentRequest request) {
        try {
            User currentPatient = authService.getCurrentUser();
            Appointment appointment = patientService.createAppointment(request, currentPatient.getId());
            return ResponseEntity.ok(ApiResponse.success("Appointment scheduled successfully", appointment));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/appointments")
    public ResponseEntity<ApiResponse<List<Appointment>>> getAppointments() {
        try {
            User currentPatient = authService.getCurrentUser();
            List<Appointment> appointments = patientService.getPatientAppointments(currentPatient.getId());
            return ResponseEntity.ok(ApiResponse.success(appointments));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/medication-schedule")
    public ResponseEntity<ApiResponse<List<Medication>>> getMedicationSchedule() {
        try {
            User currentPatient = authService.getCurrentUser();
            List<Medication> schedule = patientService.getMedicationSchedule(currentPatient.getId());
            return ResponseEntity.ok(ApiResponse.success(schedule));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
