# Checkout Functionality

## Overview
The checkout system allows users to complete their purchase by entering customer information and payment details. The system creates orders from cart items and provides order confirmation.

## Features

### Customer Information Collection
- Full name (required)
- Email address (required)
- Phone number (optional)
- Billing address (required)

### Payment Information
- Credit card number (16 digits, auto-formatted)
- Expiry date (MM/YY format)
- CVV (3-4 digits)

### Order Processing
- Validates cart is not empty
- Creates order with confirmed status
- Converts cart items to order items
- Clears cart after successful order
- Returns order confirmation with details

## API Endpoints

### Process Checkout
```
POST /api/checkout/{userId}
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "creditCardNumber": "1234567890123456",
  "expiryDate": "12/25",
  "cvv": "123",
  "billingAddress": "123 Main St, City, State 12345",
  "phoneNumber": "555-123-4567"
}
```

**Response:**
```json
{
  "message": "Order placed successfully!",
  "orderId": 1,
  "orderNumber": "ORD-000001",
  "totalAmount": 50000.00,
  "status": "CONFIRMED",
  "orderDate": "2025-01-15T10:30:00",
  "customerName": "John Doe",
  "customerEmail": "john@example.com"
}
```

### Get User Orders
```
GET /api/checkout/{userId}/orders
```

### Get Order by ID
```
GET /api/checkout/order/{orderId}
```

### Update Order Status
```
PUT /api/checkout/order/{orderId}/status
```

**Request Body:**
```json
{
  "status": "SHIPPED"
}
```

## Frontend Features

### Checkout Form
- Responsive design with modern styling
- Real-time form validation
- Credit card number formatting (1234 5678 9012 3456)
- Expiry date formatting (MM/YY)
- Input validation with error messages

### Order Summary
- Displays cart items with quantities and prices
- Shows subtotal, tax (13%), and total
- Sticky positioning for better UX

### Order Confirmation
- Success page with order details
- Order number, customer info, and total
- Links to continue shopping or view cart

## Validation Rules

### Required Fields
- Name: 2-100 characters
- Email: Valid email format
- Credit card: 16 digits
- Expiry date: MM/YY format
- CVV: 3-4 digits
- Billing address: Required

### Error Handling
- Empty cart validation
- Form validation with specific error messages
- API error handling with user-friendly messages

## Database Schema

### Order Table
- `id`: Primary key
- `user_id`: Foreign key to users table
- `total_amount`: Order total
- `status`: Order status (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)
- `order_date`: Timestamp
- `shipping_address`: Customer address
- `payment_method`: Payment method used

### OrderItem Table
- `id`: Primary key
- `order_id`: Foreign key to orders table
- `ev_id`: Foreign key to electric_vehicles table
- `quantity`: Item quantity
- `price`: Item price at time of purchase

## Security Considerations

### Payment Information
- Credit card data is validated but not stored
- In production, integrate with secure payment gateways
- Implement PCI DSS compliance for payment processing

### Order Security
- Orders are tied to authenticated users
- Order status can only be updated by authorized users
- Transaction rollback on errors

## Testing

### Backend Tests
- CheckoutControllerTest covers all endpoints
- Validates empty cart scenarios
- Tests form validation
- Verifies order creation and status updates

### Frontend Testing
- Form validation testing
- API integration testing
- User experience testing

## Usage Flow

1. **Add Items to Cart**: Users browse EVs and add items to cart
2. **View Cart**: Review items, quantities, and total
3. **Proceed to Checkout**: Click "Proceed to Checkout" button
4. **Fill Form**: Enter customer and payment information
5. **Validate**: Form validates all required fields
6. **Process Order**: Submit form to create order
7. **Confirmation**: Display order confirmation with details
8. **Clear Cart**: Cart is automatically cleared after successful order

## Future Enhancements

### Payment Integration
- Stripe/PayPal integration
- Multiple payment methods
- Secure payment processing

### Order Management
- Order tracking
- Email notifications
- Order history page
- Invoice generation

### Enhanced Security
- JWT authentication
- Payment tokenization
- Fraud detection
- Address verification

### User Experience
- Save payment methods
- Address book
- Order status updates
- Mobile-responsive design 