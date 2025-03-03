package com.megacitycab.backend.controller;

import com.megacitycab.backend.model.Booking;
import com.megacitycab.backend.repository.BookingRepository;
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

    // Update booking status
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<Booking> updateBookingStatus(
            @PathVariable String bookingId,
            @RequestParam String status) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Booking booking = bookingOptional.get();
        booking.setStatus(status);
        Booking updatedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(updatedBooking);
    }

    // Confirm a booking
    @PutMapping("/{id}/confirm")
    public ResponseEntity<String> confirmBooking(@PathVariable String id) {
        Optional<Booking> bookingOptional = bookingRepository.findById(id);
        if (bookingOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        }
        Booking booking = bookingOptional.get();
        booking.setStatus("confirmed");
        bookingRepository.save(booking);
        return ResponseEntity.ok("Booking confirmed successfully");
    }

    // Decline a booking
    @PutMapping("/{id}/decline")
    public ResponseEntity<String> declineBooking(@PathVariable String id) {
        Optional<Booking> bookingOptional = bookingRepository.findById(id);
        if (bookingOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        }
        Booking booking = bookingOptional.get();
        booking.setStatus("declined");
        bookingRepository.save(booking);
        return ResponseEntity.ok("Booking declined successfully");
    }
}
