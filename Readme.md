# Vehicle Service Booking System

This project is a RESTful API for a vehicle service booking system. It allows users to create, update, delete, and retrieve booking information. The application is built using Node.js, Express.js, PostgreSQL, and Redis, and is containerized using Docker.

## Features

- User Registration and Login with JWT-based Authentication
- Create, Retrieve, Update, and Delete Booking Entries
- List All Bookings with Optional Filters by Date and Vehicle Type
- Rate Limiter for Improved Performance
- Docker Containerization for Consistent Deployment

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- npm or yarn
- PostgreSQL
- Docker (Optional)

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/tushar-glitch/MechQuick.git
    cd MechQuick
    ```

2. **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    PORT=3000
    DATABASE_URL=postgresql://username:password@localhost:5432/your_database
    JWT_SECRET=your_jwt_secret
    ```

4. **Set up the database:**

    Create the required tables in your PostgreSQL database:

    ```sql
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(200) NOT NULL
    );

    CREATE TABLE bookings (
      id SERIAL PRIMARY KEY,
      userID INTEGER REFERENCES users(id),
      vehicleType VARCHAR(50) NOT NULL,
      serviceType VARCHAR(50) NOT NULL,
      booking_date TIMESTAMP NOT NULL
    );
    ```

5. **Run the application:**
    ```sh
    npm start
    # or
    yarn start
    ```

### Docker

1. **Build the Docker image:**
    ```sh
    docker build -t my-nodejs-app .
    ```

2. **Run the Docker container:**
    ```sh
    docker run -p 5000:5000 my-nodejs-app
    ```

3. **Using Docker Compose:**

    Create a `docker-compose.yml` file with the following content:

    ```yaml
    version: '3.8'

    services:
      app:
        build: .
        ports:
          - "3000:3000"
        environment:
          - DATABASE_URL=postgresql://username:password@db:5432/your_database
          - JWT_SECRET=your_jwt_secret
        depends_on:
          - db

      db:
        image: postgres:latest
        environment:
          POSTGRES_USER: username
          POSTGRES_PASSWORD: password
          POSTGRES_DB: your_database
        ports:
          - "5432:5432"
    ```

    Run the containers:
    ```sh
    docker-compose up
    ```

### API Endpoints

#### 1. Register User

- **Endpoint:** `POST /api/v1/auth/register`
- **Request Body:**
  ```json
  {
    "email": "testuser@gmail.com",
    "password": "testpassword"
  }

#### 2. Login User

- **Endpoint:** `POST /api/v1/auth/login`
- **Request Body:**
  ```json
  {
    "email": "testuser@gmail.com",
    "password": "testpassword"
  }
#### 3. Create Bookings

- **Endpoint:** `POST /api/v1/bookings/create`
- **Request Body:**
  ```json
  {
  "vehicleType": "Bike",
  "serviceType": "Washing",
  "bookingDate": "2024-08-19T15:30:00Z"
  }
#### 4. Retrieve Booking

- **Endpoint:** `POST /api/v1/bookings/get/:id`

#### 5. Update Bookings

- **Endpoint:** `POST /api/v1/bookings/update/:id`
- **Request Body:**
  ```json
  {
  "vehicleType": "Bike",
  "serviceType": "Tire",
  "bookingDate": "2024-08-19T15:30:00Z"
  }
#### 6. Delete Booking

- **Endpoint:** `POST /api/v1/bookings/delete/:id`

#### 7. List Bookings

- **Endpoint:** `POST /api/v1/bookings`



