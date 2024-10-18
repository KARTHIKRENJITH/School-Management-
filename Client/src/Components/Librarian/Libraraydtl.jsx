import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, addBook, editBook, deleteBook } from "../../Redux/librarySlice";
import { FaEdit, FaTrash } from "react-icons/fa";

const Library = () => {
  const [bookData, setBookData] = useState({
    bookname: "",
    author: "",
    edition: "",
    quantity: "",
    date: "",
    remarks: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.library);

  useEffect(() => {
    dispatch(fetchBooks()); // Fetch books when component mounts
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSaveBook = async () => {
    if (isEditing) {
      await dispatch(editBook({ id: editingBookId, bookData }));
    } else {
      await dispatch(addBook(bookData));
    }
    resetForm();
    setIsFormOpen(false); // Close form after saving
  };

  const handleEditBook = (book) => {
    setBookData({ ...book });
    setEditingBookId(book._id);
    setIsEditing(true);
    setIsFormOpen(true); // Open form for editing
  };

  const handleDeleteBook = async (id) => {
    await dispatch(deleteBook(id));
  };

  const resetForm = () => {
    setBookData({
      bookname: "",
      author: "",
      edition: "",
      quantity: "",
      date: "",
      remarks: "",
    });
    setIsEditing(false);
    setEditingBookId(null);
  };

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">Library Management</h1>

      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-yellow-400 text-black p-3 rounded hover:bg-yellow-300 mb-4"
      >
        {isEditing ? "Edit Book" : "Add New Book"}
      </button>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 text-gray-100 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-300">
              {isEditing ? "Edit Book" : "Add New Book"}
            </h2>

            {Object.keys(bookData).map((key) => (
              <div key={key} className="mb-4">
                <label className="block font-semibold mb-1 text-yellow-300">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={
                    key === "quantity" ? "number" : key === "date" ? "date" : "text"
                  }
                  name={key}
                  value={bookData[key]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  className="border border-yellow-400 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
              </div>
            ))}

            <button
              onClick={handleSaveBook}
              className="bg-yellow-400 text-black mt-4 p-2 rounded hover:bg-yellow-300 w-full"
            >
              {isEditing ? "Update Book" : "Add Book"}
            </button>

            <button
              onClick={() => setIsFormOpen(false)}
              className="bg-red-500 text-white mt-2 p-2 rounded hover:bg-red-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Book List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-gray-700 text-gray-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{book.bookname}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Edition:</strong> {book.edition}</p>
              <p><strong>Quantity:</strong> {book.quantity}</p>
              <p><strong>Date:</strong> {book.date}</p>
              <p><strong>Remarks:</strong> {book.remarks}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditBook(book)}
                  className="bg-yellow-400 text-black py-1 px-3 rounded hover:bg-yellow-300"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteBook(book._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
