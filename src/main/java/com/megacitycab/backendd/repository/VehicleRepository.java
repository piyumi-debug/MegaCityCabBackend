package com.megacitycab.backendd.repository;

import com.megacitycab.backendd.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends MongoRepository<Vehicle, String> {
    List<Vehicle> findByCategoryIgnoreCase(String category); // Query to find vehicles by category
}