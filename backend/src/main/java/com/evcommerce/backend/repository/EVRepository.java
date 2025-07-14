package com.evcommerce.backend.repository;

import com.evcommerce.backend.model.EV;
import com.evcommerce.backend.model.EV.EVCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface EVRepository extends JpaRepository<EV, Long> {
    
    List<EV> findByAvailableTrue();
    
    List<EV> findByBrand(String brand);
    
    List<EV> findByCategory(EVCategory category);
    
    List<EV> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    List<EV> findByRangeKmGreaterThanEqual(Integer minRange);
    
    @Query("SELECT e FROM EV e WHERE e.available = true AND " +
           "(:brand IS NULL OR e.brand = :brand) AND " +
           "(:category IS NULL OR e.category = :category) AND " +
           "(:minPrice IS NULL OR e.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR e.price <= :maxPrice) AND " +
           "(:minRange IS NULL OR e.rangeKm >= :minRange)")
    List<EV> findAvailableEVsWithFilters(
        @Param("brand") String brand,
        @Param("category") EVCategory category,
        @Param("minPrice") BigDecimal minPrice,
        @Param("maxPrice") BigDecimal maxPrice,
        @Param("minRange") Integer minRange
    );
    
    @Query("SELECT DISTINCT e.brand FROM EV e WHERE e.available = true")
    List<String> findDistinctBrands();
} 