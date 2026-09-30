package com.medtracker.repository;

import com.medtracker.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    
    List<Appointment> findByDoctorId(String doctorId);
    
    List<Appointment> findByPatientId(String patientId);
    
    List<Appointment> findByDoctorIdAndStatus(String doctorId, Appointment.Status status);
    
    List<Appointment> findByPatientIdAndStatus(String patientId, Appointment.Status status);
    
    List<Appointment> findByAppointmentDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    List<Appointment> findByDoctorIdAndAppointmentDateBetween(String doctorId, LocalDateTime startDate, LocalDateTime endDate);
    
    List<Appointment> findByDoctorIdOrderByAppointmentDateAsc(String doctorId);
    
    List<Appointment> findByPatientIdOrderByAppointmentDateAsc(String patientId);
}
