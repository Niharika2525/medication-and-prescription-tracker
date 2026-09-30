package com.medtracker.repository;

import com.medtracker.model.RefillRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RefillRequestRepository extends MongoRepository<RefillRequest, String> {
    List<RefillRequest> findByPatientIdOrderByRequestedAtDesc(String patientId);
    List<RefillRequest> findByStatus(RefillRequest.RefillStatus status);
    List<RefillRequest> findByStatusOrderByRequestedAtDesc(RefillRequest.RefillStatus status);
}
