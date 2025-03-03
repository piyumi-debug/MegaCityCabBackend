package com.megacitycab.backend.controller;

import com.megacitycab.backend.model.Booking;
import com.megacitycab.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // Add a new booking
    @PostMapping
    public ResponseEntity<String> addBooking(@RequestBody Booking booking) {
        try {
            System.out.println("Received booking data: " + booking);
            booking.setStatus("pending"); // Set default status to "pending"
            bookingRepository.save(booking);
            return ResponseEntity.ok("Booking added successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to add booking");
        }
    }

    // Get all bookings
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }

    // Update booking status
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateBookingStatus(
            @PathVariable String id,
            @RequestParam String status) {
        Optional<Booking> bookingOptional = bookingRepository.findById(id);
        if (bookingOptional.isEmpty()) {
            return ResponseEntity.status(404).body("Booking not found");
        }
        Booking booking = bookingOptional.get();
        booking.setStatus(status);
        bookingRepository.save(booking);
        return ResponseEntity.ok("Booking status updated successfully");
    }
}