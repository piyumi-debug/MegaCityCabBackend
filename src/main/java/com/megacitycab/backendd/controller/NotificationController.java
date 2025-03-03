package com.megacitycab.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    // Simulate sending notifications (replace with actual notification service later)
    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody Map<String, String> notification) {
        String message = notification.get("message");
        String recipient = notification.get("recipient");

        // Simulate sending a notification
        System.out.println("Sending notification to " + recipient + ": " + message);

        return ResponseEntity.ok("Notification sent successfully");
    }
}