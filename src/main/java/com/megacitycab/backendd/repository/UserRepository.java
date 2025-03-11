package com.megacitycab.backendd.repository;

import com.megacitycab.backendd.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username); // Find user by username
}