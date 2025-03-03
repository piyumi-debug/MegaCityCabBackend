package com.megacitycab.backend.controller;

import com.megacitycab.backend.repository.BookingRepository;
import com.megacitycab.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/analytics")
public class AdminAnalyticsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // 1️⃣ Get analytics data
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        long totalUsers = userRepository.count();
        long totalBookings = bookingRepository.count();

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", totalUsers);
        analytics.put("totalBookings", totalBookings);

        return ResponseEntity.ok(analytics);
    }
}
