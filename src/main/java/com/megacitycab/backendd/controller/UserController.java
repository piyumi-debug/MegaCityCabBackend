package com.megacitycab.backendd.controller;

import com.megacitycab.backendd.model.User;
import com.megacitycab.backendd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User loginRequest) {
        System.out.println("Attempting login with username: " + loginRequest.getUsername());

        // Find user by username
        User user = userRepository.findByUsername(loginRequest.getUsername().trim().toLowerCase());
        if (user == null) {
            System.out.println("User not found in database");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid username or password"));
        }

        // Log stored hashed password for debugging (for development purposes only)
        System.out.println("Stored hashed password: " + user.getPassword());
        System.out.println("Provided password: " + loginRequest.getPassword());

        // Check password matches
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            System.out.println("Password does not match");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid username or password"));
        }

        System.out.println("Login successful for user: " + user.getUsername());

        // Successful login, return response
        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "role", user.getRole()
        ));
    }

    // Admin: Get all users
    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // Admin: Delete user
    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    // Profile Management: Change user password
    @PutMapping("/users/password/{id}")
    public ResponseEntity<String> changePassword(@PathVariable String id, @RequestBody Map<String, String> request) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(request.get("newPassword"))); // Hash the new password
        userRepository.save(user);
        return ResponseEntity.ok("Password changed successfully");
    }
}
