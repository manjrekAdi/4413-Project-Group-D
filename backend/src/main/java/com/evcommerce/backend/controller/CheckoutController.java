package com.evcommerce.backend.controller;

import com.evcommerce.backend.model.CheckoutRequest;
import com.evcommerce.backend.model.Order;
import com.evcommerce.backend.service.OrderService;
import com.evcommerce.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = {"http://localhost:3000", "https://four413-project-group-d-7.onrender.com", "https://ev-frontend.onrender.com", "https://four413-project-group-d-6.onrender.com"})
public class CheckoutController {
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private CartService cartService;
    
    @PostMapping("/{userId}")
    public ResponseEntity<?> processCheckout(
            @PathVariable Long userId,
            @Valid @RequestBody CheckoutRequest checkoutRequest) {
        try {
            // Validate cart is not empty
            if (cartService.getCartItemCount(userId) == 0) {
                return ResponseEntity.badRequest().body(Map.of("error", "Cart is empty"));
            }
            
            // Create order
            Order order = orderService.createOrder(userId, checkoutRequest);
            
            // Return success response with order details
            Map<String, Object> response = Map.of(
                "message", "Order placed successfully!",
                "orderId", order.getId(),
                "orderNumber", "ORD-" + String.format("%06d", order.getId()),
                "totalAmount", order.getTotalAmount(),
                "status", order.getStatus(),
                "orderDate", order.getOrderDate(),
                "customerName", checkoutRequest.getName(),
                "customerEmail", checkoutRequest.getEmail()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{userId}/orders")
    public ResponseEntity<?> getUserOrders(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(orderService.getOrdersByUser(userId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Long orderId) {
        try {
            return orderService.getOrderById(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/order/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> request) {
        try {
            String statusStr = request.get("status");
            Order.OrderStatus status = Order.OrderStatus.valueOf(statusStr.toUpperCase());
            
            Order updatedOrder = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 