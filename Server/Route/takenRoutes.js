const express = require('express');
const router = express.Router();
const CheckBook = require('../controller/CheckBook'); // Ensure this path is correct

// Define your routes
router.post('/taken', CheckBook.addTakenRecord);
router.get('/', CheckBook.getTakenRecords); // Example route to add a taken record

module.exports = router;
