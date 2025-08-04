package com.evcommerce.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import com.zaxxer.hikari.HikariDataSource;
import java.net.URI;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Bean
    @Primary
    public DataSource dataSource() {
        System.out.println("=== Database Configuration ===");
        System.out.println("URL: " + databaseUrl);
        System.out.println("Username: " + username);
        System.out.println("Password: " + (password != null ? "***" : "null"));
        System.out.println("===============================");

        HikariDataSource dataSource = new HikariDataSource();
        
        // Handle Render.com DATABASE_URL format
        if (databaseUrl.startsWith("postgresql://")) {
            // Parse the DATABASE_URL to extract components
            try {
                URI uri = new URI(databaseUrl);
                String host = uri.getHost();
                int port = uri.getPort() != -1 ? uri.getPort() : 5432;
                String path = uri.getPath();
                String dbName = path.startsWith("/") ? path.substring(1) : path;
                
                // Extract username and password from the URL
                String userInfo = uri.getUserInfo();
                String[] userPass = userInfo != null ? userInfo.split(":") : new String[]{username, password};
                
                String finalUsername = userPass.length > 0 ? userPass[0] : username;
                String finalPassword = userPass.length > 1 ? userPass[1] : password;
                
                // Construct proper JDBC URL
                String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s?sslmode=require", host, port, dbName);
                
                System.out.println("Parsed JDBC URL: " + jdbcUrl);
                System.out.println("Parsed Username: " + finalUsername);
                
                dataSource.setJdbcUrl(jdbcUrl);
                dataSource.setUsername(finalUsername);
                dataSource.setPassword(finalPassword);
            } catch (Exception e) {
                System.err.println("Error parsing DATABASE_URL: " + e.getMessage());
                // Fallback to original configuration
                dataSource.setJdbcUrl(databaseUrl);
                dataSource.setUsername(username);
                dataSource.setPassword(password);
            }
        } else {
            // Use the URL as-is (already in JDBC format)
            dataSource.setJdbcUrl(databaseUrl);
            dataSource.setUsername(username);
            dataSource.setPassword(password);
        }
        
        dataSource.setDriverClassName("org.postgresql.Driver");
        
        // Connection pool settings
        dataSource.setMaximumPoolSize(5);
        dataSource.setMinimumIdle(2);
        dataSource.setConnectionTimeout(30000);
        dataSource.setIdleTimeout(600000);
        dataSource.setMaxLifetime(1800000);
        
        // SSL settings for Render.com
        dataSource.addDataSourceProperty("sslmode", "require");
        dataSource.addDataSourceProperty("ssl", "true");
        
        return dataSource;
    }
} 