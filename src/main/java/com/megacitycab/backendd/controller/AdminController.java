package com.megacitycab.backend.controller;

import com.megacitycab.backend.model.User;
import com.megacitycab.backend.repository.BookingRepository;
import com.megacitycab.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    //Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Delete a user by ID
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get analytics data
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", userRepository.count());
        analytics.put("totalBookings", bookingRepository.count());
        return ResponseEntity.ok(analytics);
    }

    // System Settings: Update application settings
    @PostMapping("/settings")
    public ResponseEntity<String> updateSettings(@RequestBody Map<String, String> settings) {
        // Simulate saving settings (replace with database later)
        settings.forEach((key, value) -> {
            System.out.println("Setting updated: " + key + " = " + value);
        });
        return ResponseEntity.ok("Settings updated successfully");
    }

    // Notifications: Send a notification to users
    @PostMapping("/notifications")
    public ResponseEntity<String> sendNotification(@RequestBody Map<String, String> notification) {
        String recipient = notification.get("recipient");
        String message = notification.get("message");

        // Simulate sending a notification
        System.out.println("Sending notification to " + recipient + ": " + message);

        return ResponseEntity.ok("Notification sent successfully");
    }
}