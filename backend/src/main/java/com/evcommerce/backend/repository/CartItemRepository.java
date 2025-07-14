package com.evcommerce.backend.repository;

import com.evcommerce.backend.model.CartItem;
import com.evcommerce.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    List<CartItem> findByUser(User user);
    
    Optional<CartItem> findByUserAndEvId(User user, Long evId);
    
    void deleteByUser(User user);
    
    long countByUser(User user);
} 