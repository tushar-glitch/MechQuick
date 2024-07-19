const express = require('express');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const client = require('./db')

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 5000;

client.query("", (err, result) => {
    if (result) console.log(result.rows);
    else console.log(err);
})

app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// create table users (id serial primary key, email varchar(50), password varchar(50))
// create table bookings (id serial primary key, userID integer not null references users(id) on delete cascade, vehicleType varchar(50) not null, serviceType varchar(50) not null, booking_date timestamp not null)
// Develop a simple RESTful API for a vehicle service booking system. This system should allow users to create, update, delete, and retrieve booking information.

// Requirements:
//     API Endpoints:
//         Create Booking: Allow users to create a new booking entry. Required details include user ID, vehicle type, service type, and booking date.
//         Retrieve Booking: Fetch details of a specific booking using the booking ID.
//         Update Booking: Allow users to update an existing booking (e.g., change the booking date or service type).
//         Delete Booking: Allow users to delete a booking.
//         List Bookings: Retrieve a list of all bookings, with optional filters by date and vehicle type.

//     Database:
//         Use any SQL or NoSQL database to store booking data.
//         Ensure the schema/design appropriately supports the operations required by the API.

//     Authentication:
//         Implement simple JWT (JSON Web Tokens) based authentication to secure the API.
//     Bonus (Optional):
//         Implement rate limiting on the API to prevent abuse.
//         Containerize the application using Docker for easy deployment.
// Submission Guidelines:
//     Provide a GitHub repository link containing the code, database schema, and a README with setup instructions and documentation.