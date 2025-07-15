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
- PostgreSQL (must be installed and running)

**To start PostgreSQL:**
- If installed via Homebrew (macOS):
  ```sh
  brew services start postgresql
  ```
- If using Postgres.app: Open the app and click "Start Server".
- On Linux:
  ```sh
  sudo service postgresql start
  ```

### Database Setup

1. **Start PostgreSQL** and create the database and user if not already done:
   ```sh
   psql -U postgres
   CREATE DATABASE evdb;
   CREATE USER postgreuser WITH PASSWORD 'yourpassword';
   GRANT ALL PRIVILEGES ON DATABASE evdb TO postgreuser;
   ```

2. **Set your database credentials** in `ev-ecommerce/backend/src/main/resources/application.properties`:
   ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/evdb
   spring.datasource.username=postgreuser
   spring.datasource.password=yourpassword
   ```

3. **Start the backend once** to auto-create tables.

4. **Insert sample data** (EVs and users):
   - Run the following script to insert sample EVs and users:
     ```sh
     cd ev-ecommerce/db-setup
     psql -h localhost -U postgreuser -d evdb -f insert_sample_evs.sql
     ```

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

## First-Time Run Checklist

1. Clone the repository.
2. Set up PostgreSQL and create the database/user.
3. Update `application.properties` with your DB credentials.
4. Build and run the backend (`mvn spring-boot:run`).
5. Insert sample data using the provided SQL script.
6. Install frontend dependencies and start the React app.
7. Access the app at [http://localhost:3000](http://localhost:3000).

## Troubleshooting

- **Database connection errors:** Double-check your `application.properties` and ensure PostgreSQL is running. If not, start it as described above.
- **Duplicate EVs:** If you accidentally insert sample data multiple times, you can manually clean up duplicates in the database using SQL.
- **Port conflicts:** Make sure nothing else is running on ports 8080 (backend) or 3000 (frontend).

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