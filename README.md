# EV E-Commerce Platform

## Project Overview

This is a comprehensive e-commerce platform for electric vehicles (EVs) built as part of the EECS4413 course project. The system allows customers to browse, compare, customize, and purchase electric vehicles, while administrators can monitor sales and analyze platform usage.

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: PostgreSQL
- **Build Tool**: Maven
- **Architecture**: RESTful API with MVC pattern

### Frontend
- **Framework**: React.js 18
- **Language**: JavaScript/JSX
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Build Tool**: Create React App

## Project Structure

```
ev-ecommerce/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/java/com/evcommerce/backend/
│   │   │   ├── controller/  # REST controllers
│   │   │   ├── model/       # JPA entities
│   │   │   ├── repository/  # Data access layer
│   │   │   ├── service/     # Business logic
│   │   │   └── config/      # Configuration
│   │   └── resources/
│   │       └── application.properties
│   └── pom.xml
└── frontend/               # React frontend
    └── ev-frontend/
        ├── src/
        │   ├── components/  # React components
        │   └── App.js
        └── package.json
```

## Features Implemented

- User registration and authentication
- Role-based access control (Customer/Admin)
- Browse, filter, and compare EVs
- Shopping cart management
- RESTful API
- Responsive frontend

## Installation and Setup

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher
- PostgreSQL

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd ev-ecommerce/backend
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ev-ecommerce/frontend/ev-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`.

## Database

The application uses **PostgreSQL** for persistent storage. Ensure your database is running and credentials are set in `application.properties`.

## Notes
- Build artifacts (`target/`, `build/`) and duplicate frontend directories are not part of the repository.
- For documentation and reports, see the preserved `.txt` files at the project root.

## Team Members
- Aditya Manjrekar (218673707)
- Rohanpreet Singh Otall (217260787)
- Haisam Arshad (217498163)
- Valeria Chazmava (218606764)

## Course Information
- Course: EECS4413 - Building E-Commerce Systems
- Institution: York University
- Term: Summer 2025
- Deliverable: 2 - Detailed Design and Implementation

## License
This project is created for educational purposes as part of the EECS4413 course project. 