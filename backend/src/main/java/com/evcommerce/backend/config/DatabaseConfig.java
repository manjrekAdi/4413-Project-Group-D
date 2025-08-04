package com.evcommerce.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application-prod.properties")
public class DatabaseConfig {

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    // Log the database URL for debugging
    public void logDatabaseUrl() {
        System.out.println("Database URL: " + databaseUrl);
    }
} 