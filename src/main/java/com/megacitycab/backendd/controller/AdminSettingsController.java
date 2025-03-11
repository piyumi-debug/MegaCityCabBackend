package com.megacitycab.backendd.controller;

import com.megacitycab.backendd.model.Setting;
import com.megacitycab.backendd.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/settings")
public class AdminSettingsController {

    @Autowired
    private SettingsRepository settingsRepository;

    // 1️⃣ Get all settings
    @GetMapping
    public ResponseEntity<Map<String, String>> getSettings() {
        List<Setting> settings = settingsRepository.findAll();
        Map<String, String> settingsMap = settings.stream()
                .collect(Collectors.toMap(Setting::getKey, Setting::getValue));
        return ResponseEntity.ok(settingsMap);
    }

    // 2️⃣ Update a setting
    @PostMapping
    public ResponseEntity<Void> updateSetting(@RequestBody Map<String, String> setting) {
        setting.forEach((key, value) -> {
            Setting dbSetting = settingsRepository.findByKey(key)
                    .orElse(new Setting(key, value));
            dbSetting.setValue(value);
            settingsRepository.save(dbSetting);
        });
        return ResponseEntity.noContent().build();
    }
}
