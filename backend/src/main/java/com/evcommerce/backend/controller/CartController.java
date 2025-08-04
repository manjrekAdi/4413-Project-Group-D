package com.evcommerce.backend.controller;

import com.evcommerce.backend.model.CartItem;
import com.evcommerce.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://localhost:3000", "https://ev-frontend.onrender.com", "https://four413-project-group-d-6.onrender.com"})
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable Long userId) {
        try {
            List<CartItem> cartItems = cartService.getCartItems(userId);
            return ResponseEntity.ok(cartItems);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{userId}/add")
    public ResponseEntity<?> addToCart(
            @PathVariable Long userId,
            @RequestBody Map<String, Object> request) {
        try {
            Long evId = Long.valueOf(request.get("evId").toString());
            Integer quantity = Integer.valueOf(request.get("quantity").toString());
            
            CartItem cartItem = cartService.addToCart(userId, evId, quantity);
            return ResponseEntity.ok(cartItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{cartItemId}/quantity")
    public ResponseEntity<?> updateQuantity(
            @PathVariable Long cartItemId,
            @RequestBody Map<String, Integer> request) {
        try {
            Integer quantity = request.get("quantity");
            CartItem updatedItem = cartService.updateCartItemQuantity(cartItemId, quantity);
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long cartItemId) {
        try {
            cartService.removeFromCart(cartItemId);
            return ResponseEntity.ok(Map.of("message", "Item removed from cart"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
        try {
            cartService.clearCart(userId);
            return ResponseEntity.ok(Map.of("message", "Cart cleared successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{userId}/total")
    public ResponseEntity<Map<String, BigDecimal>> getCartTotal(@PathVariable Long userId) {
        try {
            BigDecimal total = cartService.getCartTotal(userId);
            return ResponseEntity.ok(Map.of("total", total));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{userId}/count")
    public ResponseEntity<Map<String, Long>> getCartItemCount(@PathVariable Long userId) {
        try {
            long count = cartService.getCartItemCount(userId);
            return ResponseEntity.ok(Map.of("count", count));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 