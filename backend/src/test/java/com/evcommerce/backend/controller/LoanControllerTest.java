package com.evcommerce.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LoanController.class)
public class LoanControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCalculateLoan_Success() throws Exception {
        Map<String, Object> request = Map.of(
            "loanAmount", 50000,
            "downPayment", 10000,
            "interestRate", 5.0,
            "loanTerm", 60
        );

        mockMvc.perform(post("/api/loan/calculate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.monthlyPayment").exists())
                .andExpect(jsonPath("$.totalPayment").exists())
                .andExpect(jsonPath("$.totalInterest").exists())
                .andExpect(jsonPath("$.principal").value(40000));
    }

    @Test
    public void testCalculateLoan_InvalidInput() throws Exception {
        Map<String, Object> request = Map.of(
            "loanAmount", -1000,
            "downPayment", 10000,
            "interestRate", 5.0,
            "loanTerm", 60
        );

        mockMvc.perform(post("/api/loan/calculate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").exists());
    }

    @Test
    public void testCalculateLoan_DownPaymentExceedsLoan() throws Exception {
        Map<String, Object> request = Map.of(
            "loanAmount", 50000,
            "downPayment", 60000,
            "interestRate", 5.0,
            "loanTerm", 60
        );

        mockMvc.perform(post("/api/loan/calculate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Down payment cannot exceed loan amount"));
    }

    @Test
    public void testGetCurrentRates() throws Exception {
        mockMvc.perform(get("/api/loan/rates"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rates.excellent").value(3.5))
                .andExpect(jsonPath("$.rates.good").value(4.5))
                .andExpect(jsonPath("$.rates.fair").value(6.0))
                .andExpect(jsonPath("$.rates.poor").value(8.5));
    }
} 