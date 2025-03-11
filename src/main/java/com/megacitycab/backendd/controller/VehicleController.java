package com.megacitycab.backendd.controller;

import com.megacitycab.backendd.model.Vehicle;
import com.megacitycab.backendd.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // Add a new vehicle
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Vehicle> addVehicle(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image
    ) throws Exception {
        Vehicle vehicle = new Vehicle();
        vehicle.setName(name);
        vehicle.setCategory(category);
        vehicle.setDescription(description);

        Vehicle savedVehicle = vehicleService.addVehicle(vehicle, image);
        return ResponseEntity.ok(savedVehicle);
    }

    // Fetch all vehicles
    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    // Fetch vehicles by category
    @GetMapping(params = "category")
    public ResponseEntity<List<Vehicle>> getVehiclesByCategory(@RequestParam String category) {
        List<Vehicle> vehicles = vehicleService.getVehiclesByCategory(category);
        return ResponseEntity.ok(vehicles);
    }

    // Delete a vehicle by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable String id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
}