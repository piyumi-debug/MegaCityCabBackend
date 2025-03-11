package com.megacitycab.backendd.repository;

import com.megacitycab.backendd.model.PaymentSlip;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentSlipRepository extends MongoRepository<PaymentSlip, String> {
    // No additional methods are needed, MongoRepository provides basic CRUD operations
}
