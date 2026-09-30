package com.medtracker.dto;

public class AuthResponse {
    private String token;
    private String role;
    private String name;
    private String email;
    private String userId;
    
    public AuthResponse() {}
    
    public AuthResponse(String token, String role, String name, String email, String userId) {
        this.token = token;
        this.role = role;
        this.name = name;
        this.email = email;
        this.userId = userId;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
}
