package com.evcommerce.backend.service;

import com.evcommerce.backend.model.*;
import com.evcommerce.backend.repository.OrderRepository;
import com.evcommerce.backend.repository.CartItemRepository;
import com.evcommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CartService cartService;
    
    @Transactional
    public Order createOrder(Long userId, CheckoutRequest checkoutRequest) {
        // Get user
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Get cart items
        List<CartItem> cartItems = cartService.getCartItems(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        // Calculate total
        BigDecimal totalAmount = cartService.getCartTotal(userId);
        
        // Create order
        Order order = new Order(user, totalAmount);
        order.setShippingAddress(checkoutRequest.getBillingAddress());
        order.setPaymentMethod("Credit Card");
        order.setStatus(Order.OrderStatus.CONFIRMED);
        
        // Create order items from cart items
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem(order, cartItem.getEv(), cartItem.getQuantity(), cartItem.getPrice());
            order.getOrderItems().add(orderItem);
        }
        
        // Save order
        Order savedOrder = orderRepository.save(order);
        
        // Clear cart after successful order creation
        cartService.clearCart(userId);
        
        return savedOrder;
    }
    
    public List<Order> getOrdersByUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserOrderByOrderDateDesc(user);
    }
    
    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }
    
    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }
} 