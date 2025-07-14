package com.evcommerce.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Entity
@Table(name = "electric_vehicles")
public class EV {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Model name is required")
    private String model;
    
    @NotBlank(message = "Brand is required")
    private String brand;
    
    @NotBlank(message = "Description is required")
    @Column(length = 1000)
    private String description;
    
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;
    
    @NotNull(message = "Range is required")
    @Positive(message = "Range must be positive")
    private Integer rangeKm;
    
    @NotNull(message = "Battery capacity is required")
    @Positive(message = "Battery capacity must be positive")
    private Integer batteryCapacityKwh;
    
    @NotNull(message = "Charging time is required")
    @Positive(message = "Charging time must be positive")
    private Integer chargingTimeHours;
    
    private String imageUrl;
    
    @Enumerated(EnumType.STRING)
    private EVCategory category;
    
    private boolean available = true;
    
    public enum EVCategory {
        COMPACT, SEDAN, SUV, LUXURY, SPORTS
    }
    
    // Constructors
    public EV() {}
    
    public EV(String model, String brand, String description, BigDecimal price, 
              Integer rangeKm, Integer batteryCapacityKwh, Integer chargingTimeHours) {
        this.model = model;
        this.brand = brand;
        this.description = description;
        this.price = price;
        this.rangeKm = rangeKm;
        this.batteryCapacityKwh = batteryCapacityKwh;
        this.chargingTimeHours = chargingTimeHours;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getModel() {
        return model;
    }
    
    public void setModel(String model) {
        this.model = model;
    }
    
    public String getBrand() {
        return brand;
    }
    
    public void setBrand(String brand) {
        this.brand = brand;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public Integer getRangeKm() {
        return rangeKm;
    }
    
    public void setRangeKm(Integer rangeKm) {
        this.rangeKm = rangeKm;
    }
    
    public Integer getBatteryCapacityKwh() {
        return batteryCapacityKwh;
    }
    
    public void setBatteryCapacityKwh(Integer batteryCapacityKwh) {
        this.batteryCapacityKwh = batteryCapacityKwh;
    }
    
    public Integer getChargingTimeHours() {
        return chargingTimeHours;
    }
    
    public void setChargingTimeHours(Integer chargingTimeHours) {
        this.chargingTimeHours = chargingTimeHours;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public EVCategory getCategory() {
        return category;
    }
    
    public void setCategory(EVCategory category) {
        this.category = category;
    }
    
    public boolean isAvailable() {
        return available;
    }
    
    public void setAvailable(boolean available) {
        this.available = available;
    }
} 