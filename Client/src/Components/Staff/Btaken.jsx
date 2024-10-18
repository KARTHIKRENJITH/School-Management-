import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GlobalApi from '../GlobalApi'; // Assuming GlobalApi contains the base URL

const Btaken = () => {
  const [booksTaken, setBooksTaken] = useState([]);
  const [error, setError] = useState('');

  // Fetch taken books data
  const fetchBooksTaken = async () => {
    try {
      const response = await axios.get(`${GlobalApi.baseUrl}/api/`); // Example endpoint
      setBooksTaken(response.data);
    } catch (error) {
      console.error('Error fetching books taken:', error);
      setError('Failed to fetch the list of books taken.');
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBooksTaken();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Books Taken by Students</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {booksTaken.length > 0 ? (
        <ul className="space-y-4">
          {booksTaken.map((book, index) => (
            <li
              key={index}
              className="p-4 bg-yellow-200 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Student:</strong> {book.name}
                </p>
                <p>
                  <strong>Book Title:</strong> {book.bookTaken}
                </p>
                <p>
                  <strong>Date Taken:</strong>{' '}
                  {new Date(book.date).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-yellow-500">No books have been taken yet.</p>
      )}
    </div>
  );
};

export default Btaken;
