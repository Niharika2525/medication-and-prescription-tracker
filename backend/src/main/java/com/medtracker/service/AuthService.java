package com.medtracker.service;

import com.medtracker.dto.AuthRequest;
import com.medtracker.dto.AuthResponse;
import com.medtracker.dto.RegisterRequest;
import com.medtracker.model.User;
import com.medtracker.repository.UserRepository;
import com.medtracker.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse login(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        
        return new AuthResponse(
            token,
            user.getRole().name(),
            user.getName(),
            user.getEmail(),
            user.getId()
        );
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole());
        user.setPhone(registerRequest.getPhone());
        user.setSpecialty(registerRequest.getSpecialty());
        user.setStatus("Active");
        user.setCreatedAt(java.time.LocalDateTime.now());

        user = userRepository.save(user);
        
        // Don't generate token on registration - user should login separately
        // Return response without token to force login flow
        return new AuthResponse(
            null, // No token on registration
            user.getRole().name(),
            user.getName(),
            user.getEmail(),
            user.getId()
        );
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            return (User) authentication.getPrincipal();
        }
        throw new RuntimeException("User not authenticated");
    }
}
