import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../Redux/librarySlice';
import { FaBookOpen, FaPenNib, FaLayerGroup, FaWarehouse, FaCalendarAlt, FaStickyNote } from 'react-icons/fa';

const Book = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.library);

  // Fetch books when the component mounts
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
              <div className="flex flex-col items-center">
                <FaBookOpen className="text-4xl text-blue-500 mb-2" />
                <h2 className="text-lg font-semibold mb-1">{book.bookname}</h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaPenNib />
                  <p>Author: {book.author}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaLayerGroup />
                  <p>Edition: {book.edition}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaWarehouse />
                  <p>Quantity: {book.quantity}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaCalendarAlt />
                  <p>Date: {book.date}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaStickyNote />
                  <p>Remarks: {book.remarks}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default Book;
