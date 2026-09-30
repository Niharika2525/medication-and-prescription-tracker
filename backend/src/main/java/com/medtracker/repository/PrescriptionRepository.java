package com.medtracker.repository;

import com.medtracker.model.Prescription;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescriptionRepository extends MongoRepository<Prescription, String> {
    List<Prescription> findByPatientId(String patientId);
    List<Prescription> findByDoctorId(String doctorId);
    List<Prescription> findByPatientIdOrderByCreatedAtDesc(String patientId);
    List<Prescription> findByDoctorIdOrderByCreatedAtDesc(String doctorId);
}
