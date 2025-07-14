package com.evcommerce.backend.controller;

import com.evcommerce.backend.model.EV;
import com.evcommerce.backend.service.EVService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EVController.class)
public class EVControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EVService evService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllEVs() throws Exception {
        EV ev1 = new EV("Model 3", "Tesla", "Electric sedan", new BigDecimal("45000"), 350, 75, 8);
        EV ev2 = new EV("Leaf", "Nissan", "Electric hatchback", new BigDecimal("32000"), 240, 62, 7);
        
        when(evService.getAllEVs()).thenReturn(Arrays.asList(ev1, ev2));

        mockMvc.perform(get("/api/evs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].model").value("Model 3"))
                .andExpect(jsonPath("$[0].brand").value("Tesla"))
                .andExpect(jsonPath("$[1].model").value("Leaf"))
                .andExpect(jsonPath("$[1].brand").value("Nissan"));
    }

    @Test
    public void testGetEVById() throws Exception {
        EV ev = new EV("Model 3", "Tesla", "Electric sedan", new BigDecimal("45000"), 350, 75, 8);
        ev.setId(1L);
        
        when(evService.getEVById(1L)).thenReturn(Optional.of(ev));

        mockMvc.perform(get("/api/evs/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.model").value("Model 3"))
                .andExpect(jsonPath("$.brand").value("Tesla"))
                .andExpect(jsonPath("$.price").value(45000));
    }

    @Test
    public void testGetEVByIdNotFound() throws Exception {
        when(evService.getEVById(999L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/evs/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testCreateEV() throws Exception {
        EV ev = new EV("New Model", "New Brand", "New electric vehicle", new BigDecimal("50000"), 400, 80, 10);
        ev.setId(1L);
        
        when(evService.createEV(any(EV.class))).thenReturn(ev);

        mockMvc.perform(post("/api/evs")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ev)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.model").value("New Model"))
                .andExpect(jsonPath("$.brand").value("New Brand"));
    }

    @Test
    public void testUpdateEV() throws Exception {
        EV ev = new EV("Updated Model", "Updated Brand", "Updated description", new BigDecimal("55000"), 450, 85, 12);
        ev.setId(1L);
        
        when(evService.updateEV(1L, any(EV.class))).thenReturn(ev);

        mockMvc.perform(put("/api/evs/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ev)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.model").value("Updated Model"));
    }

    @Test
    public void testUpdateEVNotFound() throws Exception {
        EV ev = new EV("Updated Model", "Updated Brand", "Updated description", new BigDecimal("55000"), 450, 85, 12);
        
        when(evService.updateEV(999L, any(EV.class)))
                .thenThrow(new RuntimeException("EV not found"));

        mockMvc.perform(put("/api/evs/999")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ev)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("EV not found"));
    }

    @Test
    public void testDeleteEV() throws Exception {
        mockMvc.perform(delete("/api/evs/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("EV deleted successfully"));
    }

    @Test
    public void testGetEVsByBrand() throws Exception {
        EV ev1 = new EV("Model 3", "Tesla", "Electric sedan", new BigDecimal("45000"), 350, 75, 8);
        EV ev2 = new EV("Model Y", "Tesla", "Electric SUV", new BigDecimal("55000"), 330, 75, 8);
        
        when(evService.getEVsByBrand("Tesla")).thenReturn(Arrays.asList(ev1, ev2));

        mockMvc.perform(get("/api/evs/brand/Tesla"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].brand").value("Tesla"))
                .andExpect(jsonPath("$[1].brand").value("Tesla"));
    }

    @Test
    public void testGetEVsByCategory() throws Exception {
        EV ev = new EV("Model 3", "Tesla", "Electric sedan", new BigDecimal("45000"), 350, 75, 8);
        ev.setCategory(EV.EVCategory.SEDAN);
        
        when(evService.getEVsByCategory(EV.EVCategory.SEDAN)).thenReturn(Arrays.asList(ev));

        mockMvc.perform(get("/api/evs/category/SEDAN"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].category").value("SEDAN"));
    }

    @Test
    public void testGetEVsByPriceRange() throws Exception {
        EV ev = new EV("Model 3", "Tesla", "Electric sedan", new BigDecimal("45000"), 350, 75, 8);
        
        when(evService.getEVsByPriceRange(new BigDecimal("40000"), new BigDecimal("50000")))
                .thenReturn(Arrays.asList(ev));

        mockMvc.perform(get("/api/evs/price-range")
                .param("minPrice", "40000")
                .param("maxPrice", "50000"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].price").value(45000));
    }

    @Test
    public void testGetEVsByMinRange() throws Exception {
        EV ev = new EV("Model 3", "Tesla", "Electric sedan", new BigDecimal("45000"), 350, 75, 8);
        
        when(evService.getEVsByMinRange(300)).thenReturn(Arrays.asList(ev));

        mockMvc.perform(get("/api/evs/range/300"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].rangeKm").value(350));
    }

    @Test
    public void testGetEVsWithFilters() throws Exception {
        EV ev = new EV("Model 3", "Tesla", "Electric sedan", new BigDecimal("45000"), 350, 75, 8);
        ev.setCategory(EV.EVCategory.SEDAN);
        
        when(evService.getEVsWithFilters("Tesla", EV.EVCategory.SEDAN, new BigDecimal("40000"), new BigDecimal("50000"), 300))
                .thenReturn(Arrays.asList(ev));

        mockMvc.perform(get("/api/evs/filter")
                .param("brand", "Tesla")
                .param("category", "SEDAN")
                .param("minPrice", "40000")
                .param("maxPrice", "50000")
                .param("minRange", "300"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].brand").value("Tesla"));
    }

    @Test
    public void testGetAllBrands() throws Exception {
        when(evService.getAllBrands()).thenReturn(Arrays.asList("Tesla", "Nissan", "Chevrolet"));

        mockMvc.perform(get("/api/evs/brands"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").value("Tesla"))
                .andExpect(jsonPath("$[1]").value("Nissan"))
                .andExpect(jsonPath("$[2]").value("Chevrolet"));
    }

    @Test
    public void testCompareEVs() throws Exception {
        EV ev1 = new EV("Model 3", "Tesla", "Electric sedan", new BigDecimal("45000"), 350, 75, 8);
        EV ev2 = new EV("Leaf", "Nissan", "Electric hatchback", new BigDecimal("32000"), 240, 62, 7);
        ev1.setId(1L);
        ev2.setId(2L);
        
        when(evService.compareEVs(Arrays.asList(1L, 2L))).thenReturn(Arrays.asList(ev1, ev2));

        mockMvc.perform(post("/api/evs/compare")
                .contentType(MediaType.APPLICATION_JSON)
                .content("[1, 2]"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].model").value("Model 3"))
                .andExpect(jsonPath("$[1].model").value("Leaf"));
    }
} 