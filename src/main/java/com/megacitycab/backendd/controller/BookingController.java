package com.megacitycab.backendd.controller;

import com.megacitycab.backendd.model.Booking;
import com.megacitycab.backendd.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // Create a new booking
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setStatus("Pending");
        return bookingRepository.save(booking);
    }

    // Get all bookings (for admin dashboard)
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }


    // Get only new bookings (for notifications)
    @GetMapping("/new")
    public List<Booking> getNewBookings() {
        return bookingRepository.findByStatus("Pending"); // Fetch only pending bookings
    }

    // Get booking details by ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable String id) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(booking);
    }

    // Update booking status (Accept/Decline) & Mark as Read
    @PutMapping("/{id}")
    public ResponseEntity<String> updateBookingStatus(@PathVariable String id, @RequestParam String status) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        }
        booking.setStatus(status);
        bookingRepository.save(booking);
        return ResponseEntity.ok("Booking status updated to " + status);
    }
}
