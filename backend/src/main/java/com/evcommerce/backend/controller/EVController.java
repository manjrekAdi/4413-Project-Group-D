package com.evcommerce.backend.controller;

import com.evcommerce.backend.model.EV;
import com.evcommerce.backend.model.EV.EVCategory;
import com.evcommerce.backend.service.EVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/evs")
@CrossOrigin(origins = {"http://localhost:3000", "https://ev-frontend.onrender.com", "https://four413-project-group-d-6.onrender.com"})
public class EVController {
    
    @Autowired
    private EVService evService;
    
    @GetMapping
    public ResponseEntity<List<EV>> getAllEVs() {
        return ResponseEntity.ok(evService.getAllEVs());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EV> getEVById(@PathVariable Long id) {
        return evService.getEVById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<EV> createEV(@Valid @RequestBody EV ev) {
        return ResponseEntity.ok(evService.createEV(ev));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEV(@PathVariable Long id, @Valid @RequestBody EV evDetails) {
        try {
            EV updatedEV = evService.updateEV(id, evDetails);
            return ResponseEntity.ok(updatedEV);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEV(@PathVariable Long id) {
        try {
            evService.deleteEV(id);
            return ResponseEntity.ok(Map.of("message", "EV deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<EV>> getEVsByBrand(@PathVariable String brand) {
        return ResponseEntity.ok(evService.getEVsByBrand(brand));
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<EV>> getEVsByCategory(@PathVariable EVCategory category) {
        return ResponseEntity.ok(evService.getEVsByCategory(category));
    }
    
    @GetMapping("/price-range")
    public ResponseEntity<List<EV>> getEVsByPriceRange(
            @RequestParam BigDecimal minPrice,
            @RequestParam BigDecimal maxPrice) {
        return ResponseEntity.ok(evService.getEVsByPriceRange(minPrice, maxPrice));
    }
    
    @GetMapping("/range/{minRange}")
    public ResponseEntity<List<EV>> getEVsByMinRange(@PathVariable Integer minRange) {
        return ResponseEntity.ok(evService.getEVsByMinRange(minRange));
    }
    
    @GetMapping("/filter")
    public ResponseEntity<List<EV>> getEVsWithFilters(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) EVCategory category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minRange) {
        return ResponseEntity.ok(evService.getEVsWithFilters(brand, category, minPrice, maxPrice, minRange));
    }
    
    @GetMapping("/brands")
    public ResponseEntity<List<String>> getAllBrands() {
        return ResponseEntity.ok(evService.getAllBrands());
    }
    
    @PostMapping("/compare")
    public ResponseEntity<List<EV>> compareEVs(@RequestBody List<Long> evIds) {
        return ResponseEntity.ok(evService.compareEVs(evIds));
    }
} 