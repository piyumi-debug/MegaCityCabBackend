package com.megacitycab.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    // Simulated vehicle photo URLs (replace with database later)
    @GetMapping("/vehicles")
    public ResponseEntity<List<String>> getVehiclePhotos() {
        List<String> vehiclePhotos = List.of(
                "https://example.com/images/car1.jpg",
                "https://example.com/images/car2.jpg",
                "https://example.com/images/car3.jpg"
        );
        return ResponseEntity.ok(vehiclePhotos);
    }
}
