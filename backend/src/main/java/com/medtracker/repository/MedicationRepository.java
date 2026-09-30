package com.medtracker.repository;

import com.medtracker.model.Medication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicationRepository extends MongoRepository<Medication, String> {
    List<Medication> findByPatientId(String patientId);
    List<Medication> findByPrescriptionId(String prescriptionId);
    List<Medication> findByPatientIdOrderByStartDateDesc(String patientId);
}
