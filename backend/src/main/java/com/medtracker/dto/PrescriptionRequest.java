package com.medtracker.dto;

import com.medtracker.model.Medication;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class PrescriptionRequest {
    
    @NotNull(message = "Patient ID is required")
    private String patientId;
    
    @NotEmpty(message = "Medication list cannot be empty")
    private List<Medication> medicationList;
    
    @NotBlank(message = "Dosage is required")
    private String dosage;
    
    @NotBlank(message = "Instructions are required")
    private String instructions;
    
    // Getters and Setters
    public String getPatientId() {
        return patientId;
    }
    
    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }
    
    public List<Medication> getMedicationList() {
        return medicationList;
    }
    
    public void setMedicationList(List<Medication> medicationList) {
        this.medicationList = medicationList;
    }
    
    public String getDosage() {
        return dosage;
    }
    
    public void setDosage(String dosage) {
        this.dosage = dosage;
    }
    
    public String getInstructions() {
        return instructions;
    }
    
    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
}
