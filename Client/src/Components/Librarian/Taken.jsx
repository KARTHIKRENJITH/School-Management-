import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GlobalApi from '../GlobalApi';

const Taken = () => {
  const [booksTaken, setBooksTaken] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [dateTaken, setDateTaken] = useState('');
  const [message, setMessage] = useState('');

  const fetchBooksTaken = async () => {
    try {
      const response = await axios.get(`${GlobalApi.baseUrl}/api/`);
      setBooksTaken(response.data.books || response.data);
    } catch (error) {
      console.error('Error fetching taken books:', error);
      setMessage('Error fetching taken books.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      name: studentName,
      bookTaken: bookTitle,
      date: dateTaken || new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${GlobalApi.baseUrl}/api/taken`, newBook);
      setBooksTaken([...booksTaken, response.data]);
      setStudentName('');
      setBookTitle('');
      setDateTaken('');
      setMessage('Book added successfully!');
    } catch (error) {
      console.error('Error submitting taken book:', error);
      setMessage('Error submitting taken book.');
    }
  };

  useEffect(() => {
    fetchBooksTaken();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        Books Taken by Students
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div className="bg-yellow-200 text-black shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Book Taken</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="border border-yellow-400 bg-black text-yellow-400 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Book Title</label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="border border-yellow-400 bg-black text-yellow-400 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Date Taken</label>
              <input
                type="date"
                value={dateTaken}
                onChange={(e) => setDateTaken(e.target.value)}
                className="border border-yellow-400 bg-black text-yellow-400 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-yellow-600 w-full py-2 rounded hover:bg-yellow-300 transition duration-300"
            >
              Add Student
            </button>
          </form>
          {message && <p className="mt-4 text-yellow-300">{message}</p>}
        </div>

        {/* List Section */}
        <div className="bg-black text-yellow-400 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">List of Books Taken</h2>
          {booksTaken.length > 0 ? (
            <ul className="space-y-3">
              {booksTaken.map((book, index) => (
                <li
                  key={index}
                  className="p-4 bg-yellow-400 text-black rounded-lg shadow-md flex flex-col space-y-2"
                >
                  <h3 className="text-lg font-bold">Student: {book.name}</h3>
                  <p className="text-md">
                    <strong>Book Title:</strong> {book.bookTaken}
                  </p>
                  <p className="text-md">
                    <strong>Date Taken:</strong> {new Date(book.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-yellow-300">No books have been taken yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Taken;
