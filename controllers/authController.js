const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = require('../db')
require('dotenv').config();


exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Save the user in db
  const query = 'INSERT INTO users (email, password) VALUES ($1, $2) returning *';
  const values = [email, hashedPassword];
  await client.query(query, values)
    .then(() => {
      res.status(201).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await client.query(query, [email]);
  const user = result.rows[0];
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.status(200).json({ token });
};
