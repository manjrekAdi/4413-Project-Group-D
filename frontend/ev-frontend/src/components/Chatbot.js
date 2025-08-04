import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  // Predefined question suggestions
  const questionSuggestions = [
    "What electric vehicles do you have?",
    "How do I add items to cart?",
    "What is the loan calculator?",
    "How do I write a review?",
    "What is the range of electric vehicles?",
    "Are electric vehicles expensive?",
    "What are the benefits of electric vehicles?",
    "How do I compare vehicles?"
  ];

  // Predefined questions and answers for the EV e-commerce chatbot
  const chatbotKnowledge = {
    "hello": "Hello! I'm Virtual Assistant, your virtual guide for electric vehicles. How can I help you today?",
    "hi": "Hi there! I'm here to help you find the perfect electric vehicle. What would you like to know?",
    "help": "I can help you with:\n• Finding electric vehicles\n• Comparing different models\n• Understanding EV specifications\n• Shopping cart assistance\n• Loan calculations\n• General EV questions\n\nWhat would you like to know?",
    "what electric vehicles do you have": "We have a great selection of electric vehicles including:\n• Tesla Model 3 and Model Y\n• Nissan Leaf\n• Chevrolet Bolt EV\n• Ford Mustang Mach-E\n• Porsche Taycan\n\nYou can browse all vehicles on our main page!",
    "how do i add items to cart": "To add items to your cart:\n1. Browse our electric vehicles\n2. Click 'Add to Cart' on any vehicle you like\n3. View your cart by clicking the 'Cart' link in the navigation\n4. Adjust quantities or remove items as needed",
    "how do i checkout": "To checkout:\n1. Add items to your cart\n2. Go to your cart page\n3. Review your items and quantities\n4. Click 'Proceed to Checkout'\n\nNote: Checkout functionality is currently being developed!",
    "what is the loan calculator": "Our loan calculator helps you estimate monthly payments for electric vehicle financing. You can:\n• Calculate payments with different loan terms\n• Adjust interest rates\n• See total cost over time\n\nTry it out on any vehicle detail page!",
    "how do i write a review": "To write a review:\n1. Go to any electric vehicle detail page\n2. Scroll down to the reviews section\n3. Click 'Write a Review'\n4. Rate the vehicle (1-5 stars)\n5. Add your title and review content\n6. Submit your review",
    "what is the range of electric vehicles": "Electric vehicle ranges vary by model:\n• Tesla Model 3: 350 km\n• Tesla Model Y: 330 km\n• Nissan Leaf: 240 km\n• Chevrolet Bolt: 259 km\n• Ford Mustang Mach-E: 300 km\n• Porsche Taycan: 282 km\n\nYou can filter vehicles by minimum range on our main page!",
    "how long does charging take": "Charging times vary by vehicle and charger type:\n• Level 1 (home outlet): 8-12 hours\n• Level 2 (home charger): 4-8 hours\n• DC Fast Charging: 30-60 minutes\n\nCheck individual vehicle pages for specific charging times!",
    "are electric vehicles expensive": "Electric vehicles have a range of prices:\n• Entry-level EVs: $30,000-$40,000\n• Mid-range EVs: $40,000-$60,000\n• Luxury EVs: $60,000+\n\nHowever, you save money on fuel and maintenance over time. Use our loan calculator to see monthly payments!",
    "what are the benefits of electric vehicles": "Electric vehicles offer many benefits:\n• Zero emissions and environmental friendly\n• Lower fuel costs\n• Reduced maintenance (no oil changes)\n• Quiet and smooth driving\n• Instant torque and acceleration\n• Government incentives available",
    "how do i compare vehicles": "To compare vehicles:\n1. Browse our electric vehicles\n2. Use the filter options to narrow down your choices\n3. Click 'View Details' on vehicles you're interested in\n4. Use our comparison feature to see side-by-side specs\n5. Read customer reviews for real-world experiences",
    "bye": "Thank you for chatting with me! Feel free to come back if you have more questions about electric vehicles. Happy shopping! 👋",
    "goodbye": "Goodbye! I hope I helped you find what you're looking for. Don't hesitate to return if you need more assistance!",
    "thanks": "You're welcome! Is there anything else I can help you with?",
    "thank you": "You're very welcome! Let me know if you need any other assistance with electric vehicles or our platform.",
  };

  // Helper function to find the best matching response
  const findBestMatch = (userInput) => {
    const cleanInput = userInput.toLowerCase().trim();
    
    // Remove punctuation and extra spaces
    const normalizedInput = cleanInput.replace(/[?.,!]/g, '').replace(/\s+/g, ' ');
    
    // First try exact match
    if (chatbotKnowledge[normalizedInput]) {
      return chatbotKnowledge[normalizedInput];
    }
    
    // Try matching key phrases
    const keyPhrases = {
      'electric vehicles': 'what electric vehicles do you have',
      'evs': 'what electric vehicles do you have',
      'cars': 'what electric vehicles do you have',
      'vehicles': 'what electric vehicles do you have',
      'add to cart': 'how do i add items to cart',
      'cart': 'how do i add items to cart',
      'shopping': 'how do i add items to cart',
      'checkout': 'how do i checkout',
      'buy': 'how do i checkout',
      'purchase': 'how do i checkout',
      'loan': 'what is the loan calculator',
      'financing': 'what is the loan calculator',
      'payment': 'what is the loan calculator',
      'review': 'how do i write a review',
      'rating': 'how do i write a review',
      'range': 'what is the range of electric vehicles',
      'distance': 'what is the range of electric vehicles',
      'charging': 'how long does charging take',
      'charge': 'how long does charging take',
      'expensive': 'are electric vehicles expensive',
      'price': 'are electric vehicles expensive',
      'cost': 'are electric vehicles expensive',
      'benefits': 'what are the benefits of electric vehicles',
      'advantages': 'what are the benefits of electric vehicles',
      'compare': 'how do i compare vehicles',
      'comparison': 'how do i compare vehicles',
    };
    
    // Check for key phrases in the input
    for (const [phrase, responseKey] of Object.entries(keyPhrases)) {
      if (normalizedInput.includes(phrase)) {
        return chatbotKnowledge[responseKey];
      }
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(chatbotKnowledge)) {
      const keyWords = key.split(' ');
      const inputWords = normalizedInput.split(' ');
      
      // Check if most key words are present in the input
      const matchingWords = keyWords.filter(word => 
        inputWords.some(inputWord => inputWord.includes(word) || word.includes(inputWord))
      );
      
      if (matchingWords.length >= Math.ceil(keyWords.length * 0.7)) {
        return response;
      }
    }
    
    return null;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    const botResponse = findBestMatch(userMessage) || 
      "I'm sorry, I didn't understand that. Try asking about our electric vehicles, how to add items to cart, or how to use our loan calculator. Type 'help' for more options!";

    setMessages(prev => [
      ...prev,
      { text: userMessage, sender: 'user' },
      { text: botResponse, sender: 'bot' }
    ]);
    setInputValue('');
    setShowSuggestions(false); // Hide suggestions after user sends a message
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Auto-send the suggestion
    setTimeout(() => {
      const userMessage = suggestion;
      const botResponse = findBestMatch(userMessage) || 
        "I'm sorry, I didn't understand that. Try asking about our electric vehicles, how to add items to cart, or how to use our loan calculator. Type 'help' for more options!";

      setMessages(prev => [
        ...prev,
        { text: userMessage, sender: 'user' },
        { text: botResponse, sender: 'bot' }
      ]);
      setInputValue('');
      setShowSuggestions(false);
    }, 100);
  };

  const openChatbot = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([
        { 
          text: "Hello! I'm Virtual Assistant, your virtual guide for electric vehicles. How can I help you today? Click on any suggestion below or type your own question!", 
          sender: 'bot' 
        }
      ]);
      setShowSuggestions(true);
    }
  };

  const resetChat = () => {
    setMessages([
      { 
        text: "Hello! I'm Virtual Assistant, your virtual guide for electric vehicles. How can I help you today? Click on any suggestion below or type your own question!", 
        sender: 'bot' 
      }
    ]);
    setShowSuggestions(true);
    setInputValue('');
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Button */}
      <button 
        className="chatbot-toggle"
        onClick={openChatbot}
        title="Chat with Virtual Assistant"
      >
        💬 Virtual Assistant
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <h3>Virtual Assistant</h3>
            <div className="header-actions">
              <button 
                className="reset-button"
                onClick={resetChat}
                title="Start new conversation"
              >
                🔄
              </button>
              <button 
                className="close-button"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender}`}
              >
                <div className="message-content">
                  {message.text.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Question Suggestions */}
            {showSuggestions && messages.length === 1 && (
              <div className="suggestions-container">
                <div className="suggestions-label">Popular questions:</div>
                <div className="suggestions-grid">
                  {questionSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-button"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="chatbot-text-input"
            />
            <button 
              onClick={handleSendMessage}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 