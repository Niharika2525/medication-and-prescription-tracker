package com.medtracker.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "refill_requests")
public class RefillRequest {
    
    @Id
    private String id;
    
    private String patientId;
    
    private String prescriptionId;
    
    private RefillStatus status;
    
    private LocalDateTime requestedAt;
    
    private LocalDateTime processedAt;
    
    private String processedBy;
    
    private String notes;
    
    public enum RefillStatus {
        PENDING, APPROVED, REJECTED
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getPatientId() {
        return patientId;
    }
    
    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }
    
    public String getPrescriptionId() {
        return prescriptionId;
    }
    
    public void setPrescriptionId(String prescriptionId) {
        this.prescriptionId = prescriptionId;
    }
    
    public RefillStatus getStatus() {
        return status;
    }
    
    public void setStatus(RefillStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getRequestedAt() {
        return requestedAt;
    }
    
    public void setRequestedAt(LocalDateTime requestedAt) {
        this.requestedAt = requestedAt;
    }
    
    public LocalDateTime getProcessedAt() {
        return processedAt;
    }
    
    public void setProcessedAt(LocalDateTime processedAt) {
        this.processedAt = processedAt;
    }
    
    public String getProcessedBy() {
        return processedBy;
    }
    
    public void setProcessedBy(String processedBy) {
        this.processedBy = processedBy;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}
