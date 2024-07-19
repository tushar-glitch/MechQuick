const client = require('../db')
exports.createBooking = async (req, res) => {
  const { vehicleType, serviceType, bookingDate } = req.body;
  try {
    const query = 'INSERT INTO bookings (userID, vehicleType, serviceType, booking_date) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [req.user, vehicleType, serviceType, bookingDate];
    const result = await client.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM bookings WHERE id = $1';
    const result = await client.query(query, [id]);
    if (result.rows.length) {
      res.status(200).json(result.rows[0]);
    }
    else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { vehicleType, bookingDate, serviceType } = req.body;
  try {
    const query = 'UPDATE bookings SET booking_date = $1, serviceType = $2, vehicleType = $3 WHERE id = $4 RETURNING *';
    const values = [bookingDate, serviceType, vehicleType, id];
    const result =
      await client.query(query, values);
    if (result.rows.length) {
      res.status(200).json(result.rows[0]);
    }
    else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM bookings WHERE id = $1 RETURNING *';
    const result = await client.query(query, [id]);
    if (result.rows.length) {
      res.status(200).json({ message: 'Booking deleted' });
    }
    else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listBookings = async (req, res) => {
  const { date, vehicleType } = req.query;
  const filter = {};
  if (date) filter.bookingDate = date;
  if (vehicleType) filter.vehicleType = vehicleType;

  try {
    let query = 'SELECT * FROM bookings';
    let values = [];
    if (Object.keys(filter).length) {
      query += ' WHERE ';
      const keys = Object.keys(filter);
      keys.forEach((key, index) => {
        query += `${key} = $${index + 1}`;
        if (index !== keys.length - 1) query += ' AND ';
        values.push(filter[key]);
      });
    }
    const result = await client.query(query, values);
    const bookings = result.rows;
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
