package com.medtracker.service;

import com.medtracker.dto.AppointmentRequest;
import com.medtracker.dto.RefillRequestDto;
import com.medtracker.model.Appointment;
import com.medtracker.model.Medication;
import com.medtracker.model.Prescription;
import com.medtracker.model.RefillRequest;
import com.medtracker.model.User;
import com.medtracker.repository.AppointmentRepository;
import com.medtracker.repository.MedicationRepository;
import com.medtracker.repository.PrescriptionRepository;
import com.medtracker.repository.RefillRequestRepository;
import com.medtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private RefillRequestRepository refillRequestRepository;

    @Autowired
    private UserRepository userRepository;

    // Create appointment for patient
    public Appointment createAppointment(AppointmentRequest request, String patientId) {
        Appointment appointment = new Appointment();
        appointment.setPatientId(patientId);
        appointment.setDoctorId(request.getDoctorId());
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setReason(request.getReason());
        appointment.setStatus(Appointment.Status.SCHEDULED.toString());
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());

        return appointmentRepository.save(appointment);
    }

    // Get patient appointments
    public List<Appointment> getPatientAppointments(String patientId) {
        return appointmentRepository.findByPatientIdOrderByAppointmentDateAsc(patientId);
    }

    public List<Medication> getMedications(String patientId) {
        return medicationRepository.findByPatientIdOrderByStartDateDesc(patientId);
    }

    public List<Prescription> getPrescriptions(String patientId) {
        return prescriptionRepository.findByPatientIdOrderByCreatedAtDesc(patientId);
    }

    public RefillRequest requestRefill(String patientId, RefillRequestDto request) {
        Prescription prescription = prescriptionRepository.findById(request.getPrescriptionId())
            .orElseThrow(() -> new RuntimeException("Prescription not found"));

        if (!prescription.getPatientId().equals(patientId)) {
            throw new RuntimeException("Not authorized to request refill for this prescription");
        }

        RefillRequest refillRequest = new RefillRequest();
        refillRequest.setPatientId(patientId);
        refillRequest.setPrescriptionId(request.getPrescriptionId());
        refillRequest.setStatus(RefillRequest.RefillStatus.PENDING);
        refillRequest.setRequestedAt(LocalDateTime.now());
        refillRequest.setNotes(request.getNotes());

        return refillRequestRepository.save(refillRequest);
    }

    public List<RefillRequest> getRefillRequests(String patientId) {
        return refillRequestRepository.findByPatientIdOrderByRequestedAtDesc(patientId);
    }

    public List<User> getDoctors() {
        return userRepository.findAll().stream()
            .filter(user -> user.getRole() == User.Role.DOCTOR)
            .collect(Collectors.toList());
    }

    public List<Medication> getMedicationSchedule(String patientId) {
        return medicationRepository.findByPatientIdOrderByStartDateDesc(patientId);
    }
}
