# Use OpenJDK 17 as the base image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make the Maven wrapper executable
RUN chmod +x mvnw

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN ./mvnw dependency:go-offline -B

# Copy the source code
COPY src src

# Copy startup script
COPY start.sh .

# Build the application
RUN ./mvnw clean install -DskipTests

# Make startup script executable
RUN chmod +x start.sh

# Expose the port the app runs on
EXPOSE 8080

# Set the command to run the application with startup script
CMD ["./start.sh"] 