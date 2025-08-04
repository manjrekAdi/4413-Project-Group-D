# EV E-Commerce Platform - Virtual Assistant Feature

## Overview
The Virtual Assistant chatbot is a simple, rule-based chatbot that helps customers with common questions about electric vehicles and the e-commerce platform. It appears as a floating chat button on all pages of the application.

## Features

### Frontend Virtual Assistant
- **Floating Chat Button**: Appears in the bottom-right corner of all pages
- **Modal Chat Interface**: Opens a chat window when clicked
- **Predefined Q&A**: Handles common customer questions
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Messaging**: Instant responses to user queries

### Backend API
- **RESTful Endpoints**: `/api/chatbot/message` for processing messages
- **Health Check**: `/api/chatbot/health` for monitoring
- **Extensible Design**: Easy to add new responses and logic

## How to Use

### For Customers
1. **Access the Virtual Assistant**: Click the "💬 Virtual Assistant" button in the bottom-right corner
2. **Ask Questions**: Type your question and press Enter or click Send
3. **Get Help**: The virtual assistant can help with:
   - Finding electric vehicles
   - Understanding EV specifications
   - Shopping cart assistance
   - Loan calculator information
   - Writing reviews
   - General EV questions

### Sample Questions
- "hello" or "hi"
- "help" - See all available options
- "what electric vehicles do you have"
- "how do i add items to cart"
- "what is the loan calculator"
- "how do i write a review"
- "what is the range of electric vehicles"
- "are electric vehicles expensive"
- "what are the benefits of electric vehicles"
- "bye" or "goodbye"

## Technical Implementation

### Frontend Components
- `Chatbot.js` - Main virtual assistant component
- `Chatbot.css` - Styling for the virtual assistant interface
- Integrated into `App.js` for global availability

### Backend Components
- `ChatbotController.java` - REST API endpoints
- `ChatbotControllerTest.java` - Unit tests

### Key Features
- **State Management**: Uses React hooks for chat state
- **Auto-scroll**: Messages automatically scroll to bottom
- **Error Handling**: Graceful handling of unknown inputs
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: Keyboard navigation support

## Customization

### Adding New Responses
1. **Frontend**: Add new Q&A pairs to the `chatbotKnowledge` object in `Chatbot.js`
2. **Backend**: Add new responses to the `chatbotResponses` map in `ChatbotController.java`

### Styling
- Modify `Chatbot.css` to change the appearance
- The virtual assistant uses a modern gradient design with smooth animations
- Colors and styling can be easily customized

### Expanding Functionality
The virtual assistant is designed to be easily expandable:
- Add more sophisticated NLP processing
- Integrate with external APIs
- Add user authentication for personalized responses
- Implement conversation history
- Add typing indicators and animations

## Testing

### Frontend Testing
- Manual testing of all chat interactions
- Responsive design testing on different screen sizes
- Accessibility testing with keyboard navigation

### Backend Testing
- Unit tests for all controller endpoints
- Test coverage for various input scenarios
- Health check endpoint testing

## Future Enhancements

1. **Natural Language Processing**: Integrate with NLP services for better understanding
2. **Machine Learning**: Implement ML-based response generation
3. **Multi-language Support**: Add support for multiple languages
4. **Voice Integration**: Add voice input/output capabilities
5. **Integration with Product Data**: Real-time product information and availability
6. **User Context**: Remember user preferences and previous interactions
7. **Analytics**: Track common questions and improve responses

## Files Created/Modified

### New Files
- `frontend/ev-frontend/src/components/Chatbot.js`
- `frontend/ev-frontend/src/components/Chatbot.css`
- `backend/src/main/java/com/evcommerce/backend/controller/ChatbotController.java`
- `backend/src/test/java/com/evcommerce/backend/controller/ChatbotControllerTest.java`
- `CHATBOT_README.md`

### Modified Files
- `frontend/ev-frontend/src/App.js` - Added virtual assistant component

## Demo Instructions

1. Start the backend: `cd backend && mvn spring-boot:run`
2. Start the frontend: `cd frontend/ev-frontend && npm start`
3. Open the application in your browser
4. Click the "💬 Virtual Assistant" button in the bottom-right corner
5. Try asking questions like "help", "what electric vehicles do you have", etc.

The virtual assistant is now fully functional and ready for the EECS 4413 project demo! 