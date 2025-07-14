package com.evcommerce.backend.service;

import com.evcommerce.backend.model.EV;
import com.evcommerce.backend.model.EV.EVCategory;
import com.evcommerce.backend.repository.EVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class EVService {
    
    @Autowired
    private EVRepository evRepository;
    
    public List<EV> getAllEVs() {
        return evRepository.findByAvailableTrue();
    }
    
    public Optional<EV> getEVById(Long id) {
        return evRepository.findById(id);
    }
    
    public EV createEV(EV ev) {
        return evRepository.save(ev);
    }
    
    public EV updateEV(Long id, EV evDetails) {
        EV ev = evRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("EV not found"));
        
        ev.setModel(evDetails.getModel());
        ev.setBrand(evDetails.getBrand());
        ev.setDescription(evDetails.getDescription());
        ev.setPrice(evDetails.getPrice());
        ev.setRangeKm(evDetails.getRangeKm());
        ev.setBatteryCapacityKwh(evDetails.getBatteryCapacityKwh());
        ev.setChargingTimeHours(evDetails.getChargingTimeHours());
        ev.setImageUrl(evDetails.getImageUrl());
        ev.setCategory(evDetails.getCategory());
        ev.setAvailable(evDetails.isAvailable());
        
        return evRepository.save(ev);
    }
    
    public void deleteEV(Long id) {
        EV ev = evRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("EV not found"));
        evRepository.delete(ev);
    }
    
    public List<EV> getEVsByBrand(String brand) {
        return evRepository.findByBrand(brand);
    }
    
    public List<EV> getEVsByCategory(EVCategory category) {
        return evRepository.findByCategory(category);
    }
    
    public List<EV> getEVsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return evRepository.findByPriceBetween(minPrice, maxPrice);
    }
    
    public List<EV> getEVsByMinRange(Integer minRange) {
        return evRepository.findByRangeKmGreaterThanEqual(minRange);
    }
    
    public List<EV> getEVsWithFilters(String brand, EVCategory category, 
                                     BigDecimal minPrice, BigDecimal maxPrice, Integer minRange) {
        return evRepository.findAvailableEVsWithFilters(brand, category, minPrice, maxPrice, minRange);
    }
    
    public List<String> getAllBrands() {
        return evRepository.findDistinctBrands();
    }
    
    public List<EV> compareEVs(List<Long> evIds) {
        return evRepository.findAllById(evIds);
    }
} 