package com.evcommerce.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ChatbotController.class)
public class ChatbotControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testProcessMessage() throws Exception {
        Map<String, String> request = Map.of("message", "hello");

        mockMvc.perform(post("/api/chatbot/message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response").exists());
    }

    @Test
    public void testProcessMessageWithHelp() throws Exception {
        Map<String, String> request = Map.of("message", "help");

        mockMvc.perform(post("/api/chatbot/message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response").exists());
    }

    @Test
    public void testProcessMessageWithUnknownInput() throws Exception {
        Map<String, String> request = Map.of("message", "unknown message");

        mockMvc.perform(post("/api/chatbot/message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response").exists());
    }

    @Test
    public void testProcessMessageWithEmptyMessage() throws Exception {
        Map<String, String> request = Map.of("message", "");

        mockMvc.perform(post("/api/chatbot/message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testHealthCheck() throws Exception {
        mockMvc.perform(get("/api/chatbot/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("Virtual Assistant is running"))
                .andExpect(jsonPath("$.version").value("1.0"));
    }
} 