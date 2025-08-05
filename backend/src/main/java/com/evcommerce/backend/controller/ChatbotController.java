package com.evcommerce.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatbotController {
    
    // Simple chatbot responses - can be expanded with more sophisticated logic
    private final Map<String, String> chatbotResponses = new HashMap<>();
    
    public ChatbotController() {
        // Initialize chatbot responses
        chatbotResponses.put("hello", "Hello! I'm Virtual Assistant, your virtual guide for electric vehicles. How can I help you today?");
        chatbotResponses.put("hi", "Hi there! I'm here to help you find the perfect electric vehicle. What would you like to know?");
        chatbotResponses.put("help", "I can help you with:\n• Finding electric vehicles\n• Comparing different models\n• Understanding EV specifications\n• Shopping cart assistance\n• Loan calculations\n• General EV questions\n\nWhat would you like to know?");
        chatbotResponses.put("what electric vehicles do you have", "We have a great selection of electric vehicles including:\n• Tesla Model 3 and Model Y\n• Nissan Leaf\n• Chevrolet Bolt EV\n• Ford Mustang Mach-E\n• Porsche Taycan\n\nYou can browse all vehicles on our main page!");
        chatbotResponses.put("how do i add items to cart", "To add items to your cart:\n1. Browse our electric vehicles\n2. Click 'Add to Cart' on any vehicle you like\n3. View your cart by clicking the 'Cart' link in the navigation\n4. Adjust quantities or remove items as needed");
        chatbotResponses.put("how do i checkout", "To checkout:\n1. Add items to your cart\n2. Go to your cart page\n3. Review your items and quantities\n4. Click 'Proceed to Checkout'\n5. Fill in your customer and payment information\n6. Click 'Place Order' to complete your purchase");
        chatbotResponses.put("what is the loan calculator", "Our loan calculator helps you estimate monthly payments for electric vehicle financing. You can:\n• Calculate payments with different loan terms\n• Adjust interest rates\n• See total cost over time\n\nTry it out on any vehicle detail page!");
        chatbotResponses.put("how do i write a review", "To write a review:\n1. Go to any electric vehicle detail page\n2. Scroll down to the reviews section\n3. Click 'Write a Review'\n4. Rate the vehicle (1-5 stars)\n5. Add your title and review content\n6. Submit your review");
        chatbotResponses.put("what is the range of electric vehicles", "Electric vehicle ranges vary by model:\n• Tesla Model 3: 350 km\n• Tesla Model Y: 330 km\n• Nissan Leaf: 240 km\n• Chevrolet Bolt: 259 km\n• Ford Mustang Mach-E: 300 km\n• Porsche Taycan: 282 km\n\nYou can filter vehicles by minimum range on our main page!");
        chatbotResponses.put("how long does charging take", "Charging times vary by vehicle and charger type:\n• Level 1 (home outlet): 8-12 hours\n• Level 2 (home charger): 4-8 hours\n• DC Fast Charging: 30-60 minutes\n\nCheck individual vehicle pages for specific charging times!");
        chatbotResponses.put("are electric vehicles expensive", "Electric vehicles have a range of prices:\n• Entry-level EVs: $30,000-$40,000\n• Mid-range EVs: $40,000-$60,000\n• Luxury EVs: $60,000+\n\nHowever, you save money on fuel and maintenance over time. Use our loan calculator to see monthly payments!");
        chatbotResponses.put("what are the benefits of electric vehicles", "Electric vehicles offer many benefits:\n• Zero emissions and environmental friendly\n• Lower fuel costs\n• Reduced maintenance (no oil changes)\n• Quiet and smooth driving\n• Instant torque and acceleration\n• Government incentives available");
        chatbotResponses.put("how do i compare vehicles", "To compare vehicles:\n1. Browse our electric vehicles\n2. Use the filter options to narrow down your choices\n3. Click 'View Details' on vehicles you're interested in\n4. Use our comparison feature to see side-by-side specs\n5. Read customer reviews for real-world experiences");
        chatbotResponses.put("bye", "Thank you for chatting with me! Feel free to come back if you have more questions about electric vehicles. Happy shopping! 👋");
        chatbotResponses.put("goodbye", "Goodbye! I hope I helped you find what you're looking for. Don't hesitate to return if you need more assistance!");
        chatbotResponses.put("thanks", "You're welcome! Is there anything else I can help you with?");
        chatbotResponses.put("thank you", "You're very welcome! Let me know if you need any other assistance with electric vehicles or our platform.");
    }
    
    // Helper method to find the best matching response
    private String findBestMatch(String userInput) {
        if (userInput == null || userInput.trim().isEmpty()) {
            return null;
        }
        
        String cleanInput = userInput.toLowerCase().trim();
        
        // Remove punctuation and normalize spaces
        String normalizedInput = cleanInput.replaceAll("[?.,!]", "").replaceAll("\\s+", " ");
        
        // First try exact match
        if (chatbotResponses.containsKey(normalizedInput)) {
            return chatbotResponses.get(normalizedInput);
        }
        
        // Key phrases mapping
        Map<String, String> keyPhrases = new HashMap<>();
        keyPhrases.put("electric vehicles", "what electric vehicles do you have");
        keyPhrases.put("evs", "what electric vehicles do you have");
        keyPhrases.put("cars", "what electric vehicles do you have");
        keyPhrases.put("vehicles", "what electric vehicles do you have");
        keyPhrases.put("add to cart", "how do i add items to cart");
        keyPhrases.put("cart", "how do i add items to cart");
        keyPhrases.put("shopping", "how do i add items to cart");
        keyPhrases.put("checkout", "how do i checkout");
        keyPhrases.put("buy", "how do i checkout");
        keyPhrases.put("purchase", "how do i checkout");
        keyPhrases.put("loan", "what is the loan calculator");
        keyPhrases.put("financing", "what is the loan calculator");
        keyPhrases.put("payment", "what is the loan calculator");
        keyPhrases.put("review", "how do i write a review");
        keyPhrases.put("rating", "how do i write a review");
        keyPhrases.put("range", "what is the range of electric vehicles");
        keyPhrases.put("distance", "what is the range of electric vehicles");
        keyPhrases.put("charging", "how long does charging take");
        keyPhrases.put("charge", "how long does charging take");
        keyPhrases.put("expensive", "are electric vehicles expensive");
        keyPhrases.put("price", "are electric vehicles expensive");
        keyPhrases.put("cost", "are electric vehicles expensive");
        keyPhrases.put("benefits", "what are the benefits of electric vehicles");
        keyPhrases.put("advantages", "what are the benefits of electric vehicles");
        keyPhrases.put("compare", "how do i compare vehicles");
        keyPhrases.put("comparison", "how do i compare vehicles");
        
        // Check for key phrases in the input
        for (Map.Entry<String, String> entry : keyPhrases.entrySet()) {
            if (normalizedInput.contains(entry.getKey())) {
                return chatbotResponses.get(entry.getValue());
            }
        }
        
        // Check for partial matches
        for (Map.Entry<String, String> entry : chatbotResponses.entrySet()) {
            String key = entry.getKey();
            String[] keyWords = key.split(" ");
            String[] inputWords = normalizedInput.split(" ");
            
            // Count matching words
            int matchingWords = 0;
            for (String keyWord : keyWords) {
                for (String inputWord : inputWords) {
                    if (inputWord.contains(keyWord) || keyWord.contains(inputWord)) {
                        matchingWords++;
                        break;
                    }
                }
            }
            
            // If 70% or more words match, return this response
            if (matchingWords >= Math.ceil(keyWords.length * 0.7)) {
                return entry.getValue();
            }
        }
        
        return null;
    }
    
    @PostMapping("/message")
    public ResponseEntity<Map<String, String>> processMessage(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("response", "Please provide a message."));
        }
        
        String response = findBestMatch(userMessage);
        if (response == null) {
            response = "I'm sorry, I didn't understand that. Try asking about our electric vehicles, how to add items to cart, or how to use our loan calculator. Type 'help' for more options!";
        }
        
        return ResponseEntity.ok(Map.of("response", response));
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "Virtual Assistant is running", "version", "1.0"));
    }
} 