package com.medtracker.service;

import com.medtracker.dto.AppointmentRequest;
import com.medtracker.dto.PrescriptionRequest;
import com.medtracker.model.Appointment;
import com.medtracker.model.Medication;
import com.medtracker.model.Prescription;
import com.medtracker.model.User;
import com.medtracker.repository.AppointmentRepository;
import com.medtracker.repository.MedicationRepository;
import com.medtracker.repository.PrescriptionRepository;
import com.medtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private UserRepository userRepository;

    // Get all registered doctors
    public List<User> getAllDoctors() {
        return userRepository.findByRole(User.Role.DOCTOR);
    }

    // Get appointments for a specific doctor
    public List<Appointment> getDoctorAppointments(String doctorId) {
        return appointmentRepository.findByDoctorIdOrderByAppointmentDateAsc(doctorId);
    }

    // Get all patients assigned to this doctor
    public List<User> getAssignedPatients(String doctorId) {
        List<Prescription> prescriptions = prescriptionRepository.findByDoctorId(doctorId);
        return prescriptions.stream()
            .map(prescription -> userRepository.findById(prescription.getPatientId()).orElse(null))
            .filter(patient -> patient != null)
            .distinct()
            .collect(Collectors.toList());
    }

    // Create appointment from patient request
    public Appointment createAppointment(AppointmentRequest request, String patientId) {
        User doctor = userRepository.findById(request.getDoctorId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        User patient = userRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found"));

        Appointment appointment = new Appointment();
        appointment.setPatientId(patientId);
        appointment.setPatientName(patient.getName());
        appointment.setDoctorId(request.getDoctorId());
        appointment.setDoctorName(doctor.getName());
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setReason(request.getReason());
        appointment.setStatus(Appointment.Status.SCHEDULED.toString());
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());

        return appointmentRepository.save(appointment);
    }

    // Get appointments for a patient
    public List<Appointment> getPatientAppointments(String patientId) {
        return appointmentRepository.findByPatientIdOrderByAppointmentDateAsc(patientId);
    }

    public Prescription createPrescription(String doctorId, PrescriptionRequest request) {
        User patient = userRepository.findById(request.getPatientId())
            .orElseThrow(() -> new RuntimeException("Patient not found"));

        Prescription prescription = new Prescription();
        prescription.setDoctorId(doctorId);
        prescription.setPatientId(request.getPatientId());
        prescription.setMedicationList(request.getMedicationList());
        prescription.setDosage(request.getDosage());
        prescription.setInstructions(request.getInstructions());
        prescription.setCreatedAt(LocalDateTime.now());
        prescription.setUpdatedAt(LocalDateTime.now());

        prescription = prescriptionRepository.save(prescription);

        for (Medication medication : request.getMedicationList()) {
            medication.setPatientId(request.getPatientId());
            medication.setPrescriptionId(prescription.getId());
            medicationRepository.save(medication);
        }

        return prescription;
    }

    public List<Prescription> getPrescriptionHistory(String doctorId) {
        return prescriptionRepository.findByDoctorIdOrderByCreatedAtDesc(doctorId);
    }

    public List<Prescription> getPatientPrescriptions(String doctorId, String patientId) {
        return prescriptionRepository.findByPatientIdOrderByCreatedAtDesc(patientId).stream()
            .filter(prescription -> prescription.getDoctorId().equals(doctorId))
            .collect(Collectors.toList());
    }

    public Prescription updatePrescription(String doctorId, String prescriptionId, PrescriptionRequest request) {
        Prescription prescription = prescriptionRepository.findById(prescriptionId)
            .orElseThrow(() -> new RuntimeException("Prescription not found"));

        if (!prescription.getDoctorId().equals(doctorId)) {
            throw new RuntimeException("Not authorized to update this prescription");
        }

        prescription.setMedicationList(request.getMedicationList());
        prescription.setDosage(request.getDosage());
        prescription.setInstructions(request.getInstructions());
        prescription.setUpdatedAt(LocalDateTime.now());

        return prescriptionRepository.save(prescription);
    }

    // Mark medication as completed
    public Medication markMedicationCompleted(String doctorId, String medicationId) {
        Medication medication = medicationRepository.findById(medicationId)
            .orElseThrow(() -> new RuntimeException("Medication not found"));

        // Verify this medication belongs to a patient of this doctor
        Prescription prescription = prescriptionRepository.findById(medication.getPrescriptionId())
            .orElseThrow(() -> new RuntimeException("Prescription not found"));

        if (!prescription.getDoctorId().equals(doctorId)) {
            throw new RuntimeException("Not authorized to update this medication");
        }

        medication.setCompleted(true);
        medication.setCompletedAt(LocalDateTime.now());
        return medicationRepository.save(medication);
    }
}
