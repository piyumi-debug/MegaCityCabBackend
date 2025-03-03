package com.megacitycab.backend.repository;

import com.megacitycab.backend.model.Setting;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SettingsRepository extends MongoRepository<Setting, String> {
    Optional<Setting> findByKey(String key);
}
