package com.megacitycab.backendd.controller;

import com.megacitycab.backendd.model.Booking;
import com.megacitycab.backendd.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin/bookings")
public class AdminBookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public ResponseEntity<?> getAllPendingBookings() {
        return ResponseEntity.ok(bookingRepository.findByStatus("pending"));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateBookingStatus(
            @PathVariable String id,
            @RequestParam String status) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    booking.setStatus(status);
                    bookingRepository.save(booking);
                    return ResponseEntity.ok("Booking status updated successfully");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found"));
    }
}