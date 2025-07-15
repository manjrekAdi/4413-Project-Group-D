package com.evcommerce.backend.config;

import com.evcommerce.backend.model.EV;
import com.evcommerce.backend.model.User;
import com.evcommerce.backend.repository.EVRepository;
import com.evcommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private EVRepository evRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Initialize sample users (always create if they don't exist)
        if (userRepository.count() == 0) {
            User admin = new User("admin", "admin@evcommerce.com", "admin123");
            admin.setRole(User.UserRole.ADMIN);
            userRepository.save(admin);
            
            User customer = new User("customer", "customer@evcommerce.com", "customer123");
            userRepository.save(customer);
            
            System.out.println("Sample users created");
        }
        
        // Initialize sample EVs (always create if they don't exist)
        if (evRepository.count() == 0) {
            // Tesla Model 3
            EV teslaModel3 = new EV(
                "Model 3", "Tesla", 
                "The Tesla Model 3 is an electric compact sedan with advanced autopilot capabilities.",
                new BigDecimal("45000"), 350, 75, 8
            );
            teslaModel3.setCategory(EV.EVCategory.SEDAN);
            teslaModel3.setImageUrl("https://example.com/tesla-model-3.jpg");
            evRepository.save(teslaModel3);
            
            // Tesla Model Y
            EV teslaModelY = new EV(
                "Model Y", "Tesla",
                "The Tesla Model Y is a compact electric SUV with spacious interior and excellent range.",
                new BigDecimal("55000"), 330, 75, 8
            );
            teslaModelY.setCategory(EV.EVCategory.SUV);
            teslaModelY.setImageUrl("https://example.com/tesla-model-y.jpg");
            evRepository.save(teslaModelY);
            
            // Nissan Leaf
            EV nissanLeaf = new EV(
                "Leaf", "Nissan",
                "The Nissan Leaf is a reliable electric hatchback perfect for daily commuting.",
                new BigDecimal("32000"), 240, 62, 7
            );
            nissanLeaf.setCategory(EV.EVCategory.COMPACT);
            nissanLeaf.setImageUrl("https://example.com/nissan-leaf.jpg");
            evRepository.save(nissanLeaf);
            
            // Chevrolet Bolt
            EV chevyBolt = new EV(
                "Bolt EV", "Chevrolet",
                "The Chevrolet Bolt EV offers impressive range in a compact package.",
                new BigDecimal("35000"), 259, 66, 9
            );
            chevyBolt.setCategory(EV.EVCategory.COMPACT);
            chevyBolt.setImageUrl("https://example.com/chevrolet-bolt.jpg");
            evRepository.save(chevyBolt);
            
            // Ford Mustang Mach-E
            EV fordMachE = new EV(
                "Mustang Mach-E", "Ford",
                "The Ford Mustang Mach-E combines iconic styling with electric performance.",
                new BigDecimal("48000"), 300, 68, 10
            );
            fordMachE.setCategory(EV.EVCategory.SUV);
            fordMachE.setImageUrl("https://example.com/ford-mach-e.jpg");
            evRepository.save(fordMachE);
            
            // Porsche Taycan
            EV porscheTaycan = new EV(
                "Taycan", "Porsche",
                "The Porsche Taycan is a high-performance electric sports car.",
                new BigDecimal("85000"), 282, 93, 9
            );
            porscheTaycan.setCategory(EV.EVCategory.SPORTS);
            porscheTaycan.setImageUrl("https://example.com/porsche-taycan.jpg");
            evRepository.save(porscheTaycan);
            
            System.out.println("Sample EVs created");
        }
    }
} 