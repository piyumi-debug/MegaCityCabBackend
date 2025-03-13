package com.megacitycab.backendd.service;

import com.megacitycab.backendd.model.Vehicle;
import com.megacitycab.backendd.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    private static final String UPLOAD_DIR = "uploads/";

    // Save a new vehicle
    public Vehicle addVehicle(Vehicle vehicle, MultipartFile imageFile) throws IOException {
        if (!imageFile.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, imageFile.getBytes());

            vehicle.setImage("/uploads/" + fileName); // Save the relative path to the database
        }
        return vehicleRepository.save(vehicle);
    }

    // Fetch all vehicles
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // Fetch vehicles by category
    public List<Vehicle> getVehiclesByCategory(String category) {
        return vehicleRepository.findByCategoryIgnoreCase(category);
    }

    // Delete vehicle by ID
    public boolean deleteVehicle(String id) {
        Optional<Vehicle> vehicleOptional = vehicleRepository.findById(id);

        if (vehicleOptional.isPresent()) {
            vehicleRepository.delete(vehicleOptional.get());
            return true; // Vehicle deleted
        }
        return false; // Vehicle not found
    }
}
