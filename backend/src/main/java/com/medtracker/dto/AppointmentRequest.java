package com.medtracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AppointmentRequest {
    
    @NotBlank(message = "Doctor ID is required")
    private String doctorId;
    
    @NotBlank(message = "Reason is required")
    private String reason;
    
    @NotNull(message = "Appointment date is required")
    private LocalDateTime appointmentDate;
    
    @NotBlank(message = "Appointment time is required")
    private String appointmentTime;
    
    // Getters and Setters
    public String getDoctorId() {
        return doctorId;
    }
    
    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }
    
    public String getReason() {
        return reason;
    }
    
    public void setReason(String reason) {
        this.reason = reason;
    }
    
    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }
    
    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }
    
    public String getAppointmentTime() {
        return appointmentTime;
    }
    
    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
}
