package com.megacitycab.backendd.controller;

import com.megacitycab.backendd.model.PaymentSlip;
import com.megacitycab.backendd.repository.PaymentSlipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/payments")
public class PaymentSlipController {

    @Autowired
    private PaymentSlipRepository paymentSlipRepository;

    // Upload Payment Slip
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPaymentSlip(@RequestParam("file") MultipartFile file) {
        try {
            // Generate unique file name based on the current timestamp
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String uploadDir = "uploads/";

            // Create the upload directory if it doesn't exist
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Define the path to store the file
            Path filePath = Paths.get(uploadDir + fileName);
            Files.write(filePath, file.getBytes());

            // Create a new PaymentSlip object
            PaymentSlip paymentSlip = new PaymentSlip();
            paymentSlip.setFileName(fileName);
            paymentSlip.setFilePath(filePath.toString());
            //paymentSlip.setFileUrl("http://localhost:8082/" + uploadDir + fileName); // File URL for frontend
            paymentSlip.setUploadDate(LocalDate.now().format(DateTimeFormatter.ISO_DATE));

            // Save the payment slip object to MongoDB
            paymentSlipRepository.save(paymentSlip);

            return ResponseEntity.ok("Payment Slip uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while uploading the payment slip.");
        }
    }

    // Fetch all Payment Slips (For Admin Dashboard)
    @GetMapping("/slips")
    public ResponseEntity<?> getPaymentSlips() {
        return ResponseEntity.ok(paymentSlipRepository.findAll());
    }
}
