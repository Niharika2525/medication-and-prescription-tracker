package com.medtracker.dto;

import jakarta.validation.constraints.NotBlank;

public class RefillRequestDto {
    
    @NotBlank(message = "Prescription ID is required")
    private String prescriptionId;
    
    private String notes;
    
    // Getters and Setters
    public String getPrescriptionId() {
        return prescriptionId;
    }
    
    public void setPrescriptionId(String prescriptionId) {
        this.prescriptionId = prescriptionId;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}
