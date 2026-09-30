package com.medtracker.controller;

import com.medtracker.dto.ApiResponse;
import com.medtracker.dto.AppointmentRequest;
import com.medtracker.dto.PrescriptionRequest;
import com.medtracker.model.Appointment;
import com.medtracker.model.Prescription;
import com.medtracker.model.User;
import com.medtracker.service.AuthService;
import com.medtracker.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor")
@PreAuthorize("hasRole('DOCTOR')")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AuthService authService;

    @GetMapping("/patients")
    public ResponseEntity<ApiResponse<List<User>>> getAssignedPatients() {
        try {
            User currentDoctor = authService.getCurrentUser();
            List<User> patients = doctorService.getAssignedPatients(currentDoctor.getId());
            return ResponseEntity.ok(ApiResponse.success(patients));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/prescriptions")
    public ResponseEntity<ApiResponse<Prescription>> createPrescription(@Valid @RequestBody PrescriptionRequest request) {
        try {
            User currentDoctor = authService.getCurrentUser();
            Prescription prescription = doctorService.createPrescription(currentDoctor.getId(), request);
            return ResponseEntity.ok(ApiResponse.success("Prescription created successfully", prescription));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<Prescription>>> getPrescriptionHistory() {
        try {
            User currentDoctor = authService.getCurrentUser();
            List<Prescription> prescriptions = doctorService.getPrescriptionHistory(currentDoctor.getId());
            return ResponseEntity.ok(ApiResponse.success(prescriptions));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/prescriptions")
    public ResponseEntity<ApiResponse<List<Prescription>>> getPrescriptions() {
        try {
            User currentDoctor = authService.getCurrentUser();
            List<Prescription> prescriptions = doctorService.getPrescriptionHistory(currentDoctor.getId());
            return ResponseEntity.ok(ApiResponse.success(prescriptions));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/patients/{patientId}/prescriptions")
    public ResponseEntity<ApiResponse<List<Prescription>>> getPatientPrescriptions(@PathVariable String patientId) {
        try {
            User currentDoctor = authService.getCurrentUser();
            List<Prescription> prescriptions = doctorService.getPatientPrescriptions(currentDoctor.getId(), patientId);
            return ResponseEntity.ok(ApiResponse.success(prescriptions));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/appointments")
    public ResponseEntity<ApiResponse<List<Appointment>>> getDoctorAppointments() {
        try {
            User currentDoctor = authService.getCurrentUser();
            List<Appointment> appointments = doctorService.getDoctorAppointments(currentDoctor.getId());
            return ResponseEntity.ok(ApiResponse.success(appointments));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/medications/{medicationId}/complete")
    public ResponseEntity<ApiResponse<String>> markMedicationCompleted(@PathVariable String medicationId) {
        try {
            User currentDoctor = authService.getCurrentUser();
            doctorService.markMedicationCompleted(currentDoctor.getId(), medicationId);
            return ResponseEntity.ok(ApiResponse.success("Medication marked as completed successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/doctors")
    public ResponseEntity<ApiResponse<List<User>>> getAllDoctors() {
        try {
            List<User> doctors = doctorService.getAllDoctors();
            return ResponseEntity.ok(ApiResponse.success(doctors));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/prescriptions/{prescriptionId}")
    public ResponseEntity<ApiResponse<Prescription>> updatePrescription(
            @PathVariable String prescriptionId,
            @Valid @RequestBody PrescriptionRequest request) {
        try {
            User currentDoctor = authService.getCurrentUser();
            Prescription prescription = doctorService.updatePrescription(currentDoctor.getId(), prescriptionId, request);
            return ResponseEntity.ok(ApiResponse.success("Prescription updated successfully", prescription));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
