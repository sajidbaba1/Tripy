package com.tripy.backend.controllers;

import com.tripy.backend.models.UserEntity;
import com.tripy.backend.models.Role;
import com.tripy.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserEntity signUpRequest) {
        
        // 1. Validation Check: Does the email already exist?
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // 2. We will hash the password later via Spring Security.
        // For now, prepare the base model.
        UserEntity user = new UserEntity();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword()); // TO-DO: Encode Password
        
        // Default assigned role is Customer unless specified via Admin Portal
        user.setRole(Role.CUSTOMER);

        // 3. Save to PostgreSQL database
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
