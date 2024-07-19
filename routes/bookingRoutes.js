const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {createBooking, getBooking, updateBooking, deleteBooking, listBookings} = require('../controllers/bookingController')

router.post('/create', authMiddleware, createBooking);
router.get('/get/:id', authMiddleware, getBooking);
router.put('/update/:id', authMiddleware, updateBooking);
router.delete('/delete/:id', authMiddleware, deleteBooking);
router.get('/', authMiddleware, listBookings);

module.exports = router;
