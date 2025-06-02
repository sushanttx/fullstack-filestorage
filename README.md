# Fullstack File Storage Application

A modern, scalable file storage application built with Spring Boot, React, and PostgreSQL, containerized with Docker. This application serves as a robust solution for managing and storing files(profile pictures for now) in a secure and organized manner. It provides a user-friendly interface for uploading, downloading, and managing files while ensuring data persistence and security. The system is designed to handle various file types and sizes, making it suitable for both personal and enterprise use cases.

## 🚀 Features

Key aspects of the application:
- **Secure Storage**: Files are stored securely in the database with proper access controls and encryption
- **User Management**: Complete user authentication and authorization system to manage file access
- **Scalable Architecture**: Built with microservices architecture, making it easy to scale and maintain
- **Cloud-Ready**: Containerized deployment makes it easy to deploy on any cloud platform
- **Real-time Updates**: Users can see their file changes in real-time
- **Cross-Platform**: Access your files from any device with a modern web browser

## 🛠 Tech Stack

### Backend
- Spring Boot
- PostgreSQL
- Docker
- Maven

### Frontend
- React
- Modern UI components
- Responsive design

### Infrastructure
- Docker & Docker Compose
- Nginx for reverse proxy
- AWS Elastic Beanstalk support

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Java JDK 17 or later
- Maven

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fullstack-filestorage
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8088
   - PostgreSQL: localhost:5432

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

- `POSTGRES_USER`: Database username (default: root)
- `POSTGRES_PASSWORD`: Database password (default: root123)
- `POSTGRES_DB`: Database name (default: customer)
- `SPRING_DATASOURCE_URL`: Database connection URL

### Ports

- Frontend: 3000
- Backend API: 8088
- PostgreSQL: 5432

## 🏗 Project Structure

```
fullstack-filestorage/
├── backend/               # Spring Boot application
│   ├── src/              # Source code
│   ├── pom.xml           # Maven configuration
│   └── Dockerfile        # Backend container configuration
├── frontend/             # Frontend applications
│   ├── react/           # React application
│   └── angular/         # Angular application (alternative)
├── docker-compose.yml    # Docker services configuration
├── nginx.conf           # Nginx configuration
└── pg_hba.conf          # PostgreSQL access configuration
```

## 🚢 Deployment

The application is configured for deployment on AWS Elastic Beanstalk using the provided `Dockerrun.aws.json` file.

## 🔐 Security

- PostgreSQL access is configured through `pg_hba.conf`
- Nginx reverse proxy for secure communication
- Environment variables for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Spring Boot team
- React team
- PostgreSQL team
- Docker team
- Amigoscode(YouTube) and team
