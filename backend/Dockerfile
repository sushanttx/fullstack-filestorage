# Use a base image with JDK 17
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built Spring Boot JAR file into the container
COPY target/*.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
