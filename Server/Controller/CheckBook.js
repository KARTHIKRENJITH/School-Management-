const Taken = require('../Model/Taken'); 

// Add a new book taken record
const addTakenRecord = async (req, res) => {
  const { name, bookTaken, date } = req.body;

  try {
    const newTaken = new Taken({ name, bookTaken, date });
    await newTaken.save();
    return res.status(201).json({ message: 'Book taken record added successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding record.', error });
  }
};

// Get all taken records
const getTakenRecords = async (req, res) => {
  try {
    const takenRecords = await Taken.find(); // Retrieve all records from the database
    return res.status(200).json(takenRecords); // Send the records back as a JSON response
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching records.', error });
  }
};

module.exports = { addTakenRecord, getTakenRecords };
