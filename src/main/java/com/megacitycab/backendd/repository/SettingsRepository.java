package com.megacitycab.backendd.repository;

import com.megacitycab.backendd.model.Setting;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SettingsRepository extends MongoRepository<Setting, String> {
    Optional<Setting> findByKey(String key);
}
