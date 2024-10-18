const mongoose = require('mongoose');

// Define the schema for a book taken by a student
const bookTakenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bookTaken: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Create the model from the schema and name it 'Taken'
const Taken = mongoose.model('Taken', bookTakenSchema);

// Export the model
module.exports = Taken;
