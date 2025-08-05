package com.evcommerce.backend.controller;

import com.evcommerce.backend.model.CheckoutRequest;
import com.evcommerce.backend.model.Order;
import com.evcommerce.backend.service.OrderService;
import com.evcommerce.backend.service.CartService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CheckoutController.class)
public class CheckoutControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @MockBean
    private CartService cartService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testProcessCheckout() throws Exception {
        // Mock cart service
        when(cartService.getCartItemCount(1L)).thenReturn(2L);
        
        // Mock order service
        Order mockOrder = new Order();
        mockOrder.setId(1L);
        mockOrder.setTotalAmount(new BigDecimal("50000.00"));
        mockOrder.setStatus(Order.OrderStatus.CONFIRMED);
        mockOrder.setOrderDate(LocalDateTime.now());
        
        when(orderService.createOrder(eq(1L), any(CheckoutRequest.class))).thenReturn(mockOrder);
        
        // Create checkout request
        CheckoutRequest checkoutRequest = new CheckoutRequest(
            "John Doe",
            "john@example.com",
            "1234567890123456",
            "12/25",
            "123",
            "123 Main St, City, State 12345"
        );
        
        mockMvc.perform(post("/api/checkout/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(checkoutRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Order placed successfully!"))
                .andExpect(jsonPath("$.orderId").value(1))
                .andExpect(jsonPath("$.customerName").value("John Doe"))
                .andExpect(jsonPath("$.customerEmail").value("john@example.com"));
    }

    @Test
    public void testProcessCheckoutEmptyCart() throws Exception {
        // Mock empty cart
        when(cartService.getCartItemCount(1L)).thenReturn(0L);
        
        CheckoutRequest checkoutRequest = new CheckoutRequest(
            "John Doe",
            "john@example.com",
            "1234567890123456",
            "12/25",
            "123",
            "123 Main St, City, State 12345"
        );
        
        mockMvc.perform(post("/api/checkout/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(checkoutRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Cart is empty"));
    }

    @Test
    public void testProcessCheckoutInvalidRequest() throws Exception {
        // Mock cart service
        when(cartService.getCartItemCount(1L)).thenReturn(2L);
        
        // Create invalid checkout request (missing required fields)
        CheckoutRequest checkoutRequest = new CheckoutRequest();
        checkoutRequest.setName("John");
        // Missing email, credit card, etc.
        
        mockMvc.perform(post("/api/checkout/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(checkoutRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetUserOrders() throws Exception {
        mockMvc.perform(get("/api/checkout/1/orders"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetOrderById() throws Exception {
        Order mockOrder = new Order();
        mockOrder.setId(1L);
        mockOrder.setTotalAmount(new BigDecimal("50000.00"));
        
        when(orderService.getOrderById(1L)).thenReturn(java.util.Optional.of(mockOrder));
        
        mockMvc.perform(get("/api/checkout/order/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.totalAmount").value(50000.00));
    }

    @Test
    public void testUpdateOrderStatus() throws Exception {
        Order mockOrder = new Order();
        mockOrder.setId(1L);
        mockOrder.setStatus(Order.OrderStatus.SHIPPED);
        
        when(orderService.updateOrderStatus(1L, Order.OrderStatus.SHIPPED)).thenReturn(mockOrder);
        
        Map<String, String> request = Map.of("status", "SHIPPED");
        
        mockMvc.perform(put("/api/checkout/order/1/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SHIPPED"));
    }
} 