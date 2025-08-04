package com.evcommerce.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;

@RestController
@RequestMapping("/api/loan")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {
    
    @PostMapping("/calculate")
    public ResponseEntity<Map<String, Object>> calculateLoan(@RequestBody Map<String, Object> request) {
        try {
            BigDecimal loanAmount = new BigDecimal(request.get("loanAmount").toString());
            BigDecimal downPayment = new BigDecimal(request.get("downPayment").toString());
            BigDecimal interestRate = new BigDecimal(request.get("interestRate").toString());
            Integer loanTerm = Integer.parseInt(request.get("loanTerm").toString());
            
            // Validate inputs
            if (loanAmount.compareTo(BigDecimal.ZERO) <= 0 || 
                downPayment.compareTo(BigDecimal.ZERO) < 0 ||
                interestRate.compareTo(BigDecimal.ZERO) < 0 ||
                loanTerm <= 0) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid input parameters"));
            }
            
            if (downPayment.compareTo(loanAmount) > 0) {
                return ResponseEntity.badRequest().body(Map.of("error", "Down payment cannot exceed loan amount"));
            }
            
            // Calculate loan
            BigDecimal principal = loanAmount.subtract(downPayment);
            BigDecimal monthlyRate = interestRate.divide(new BigDecimal("1200"), 10, RoundingMode.HALF_UP); // Convert annual rate to monthly decimal
            BigDecimal numberOfPayments = new BigDecimal(loanTerm);
            
            // Monthly payment calculation using the loan payment formula
            BigDecimal monthlyPayment;
            if (monthlyRate.compareTo(BigDecimal.ZERO) == 0) {
                monthlyPayment = principal.divide(numberOfPayments, 2, RoundingMode.HALF_UP);
            } else {
                BigDecimal ratePlusOne = BigDecimal.ONE.add(monthlyRate);
                BigDecimal ratePlusOneToN = ratePlusOne.pow(loanTerm);
                BigDecimal numerator = principal.multiply(monthlyRate).multiply(ratePlusOneToN);
                BigDecimal denominator = ratePlusOneToN.subtract(BigDecimal.ONE);
                monthlyPayment = numerator.divide(denominator, 2, RoundingMode.HALF_UP);
            }
            
            BigDecimal totalPayment = monthlyPayment.multiply(numberOfPayments);
            BigDecimal totalInterest = totalPayment.subtract(principal);
            
            Map<String, Object> response = Map.of(
                "monthlyPayment", monthlyPayment,
                "totalPayment", totalPayment,
                "totalInterest", totalInterest,
                "principal", principal,
                "loanTerm", loanTerm
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid request format"));
        }
    }
    
    @GetMapping("/rates")
    public ResponseEntity<Map<String, Object>> getCurrentRates() {
        // This could be connected to a real financial API in production
        Map<String, Object> rates = Map.of(
            "excellent", 3.5,
            "good", 4.5,
            "fair", 6.0,
            "poor", 8.5
        );
        
        return ResponseEntity.ok(Map.of("rates", rates));
    }
} 