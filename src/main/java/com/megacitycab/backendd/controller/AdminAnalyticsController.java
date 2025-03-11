package com.megacitycab.backendd.controller;

import com.megacitycab.backendd.repository.BookingRepository;
import com.megacitycab.backendd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/analytics")
public class AdminAnalyticsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // Get detailed analytics data
    @GetMapping("/details") // Updated path to avoid conflict
    public ResponseEntity<Map<String, Object>> getAnalyticsDetails() {
        long totalUsers = userRepository.count();
        long totalBookings = bookingRepository.count();

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", totalUsers);
        analytics.put("totalBookings", totalBookings);

        return ResponseEntity.ok(analytics);
    }
}