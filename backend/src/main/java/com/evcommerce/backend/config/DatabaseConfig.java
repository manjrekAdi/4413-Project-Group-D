package com.evcommerce.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSourceProperties dataSourceProperties() {
        DataSourceProperties properties = new DataSourceProperties();
        
        // Clean the database URL - remove spaces and ensure proper format
        String cleanedUrl = cleanDatabaseUrl(databaseUrl);
        System.out.println("Original URL: " + databaseUrl);
        System.out.println("Cleaned URL: " + cleanedUrl);
        
        properties.setUrl(cleanedUrl);
        return properties;
    }

    @Bean
    @Primary
    public DataSource dataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }
    
    private String cleanDatabaseUrl(String url) {
        if (url == null) {
            return url;
        }
        
        // Remove spaces around jdbc: prefix
        String cleaned = url.replaceAll("jdbc:\\s+", "jdbc:");
        
        // Ensure it starts with jdbc:postgresql://
        if (!cleaned.startsWith("jdbc:postgresql://")) {
            if (cleaned.startsWith("postgresql://")) {
                cleaned = "jdbc:" + cleaned;
            } else if (cleaned.startsWith("jdbc:")) {
                // Already has jdbc: but might have wrong format
                cleaned = cleaned.replaceFirst("jdbc:[^/]*://", "jdbc:postgresql://");
            }
        }
        
        return cleaned;
    }
} 