#!/bin/bash

echo "Starting EV E-Commerce Backend..."

# Check if JAR file exists
if [ ! -f "target/backend-0.0.1-SNAPSHOT.jar" ]; then
    echo "ERROR: JAR file not found!"
    ls -la target/
    exit 1
fi

echo "JAR file found, starting application..."

# Start the application with debug logging
java -Dspring.profiles.active=prod \
     -Dlogging.level.root=DEBUG \
     -Dlogging.level.com.evcommerce.backend=DEBUG \
     -Dlogging.level.org.springframework.web=DEBUG \
     -jar target/backend-0.0.1-SNAPSHOT.jar 