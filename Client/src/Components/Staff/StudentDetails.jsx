import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, addStudent, updateStudent, deleteStudent } from "../../Redux/studentSlice";

const StudentDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    std: "",
    gender: "",
    bookname: "",
    section: "",
    purchasedate: "",
    returndate: "",
    fees: "",
    date: "",
    remarks: "",
    isActive: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddUser = async () => {
    try {
      if (isEditing) {
        await dispatch(updateStudent({ id: editingUserId, studentData: formData }));
      } else {
        await dispatch(addStudent(formData));
      }
      resetForm();
      closeForm();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEditUser = (user) => {
    setFormData({ ...user });
    setEditingUserId(user._id);
    setIsEditing(true);
    openForm();
  };

  const handleDeleteUser = async (id) => {
    try {
      await dispatch(deleteStudent(id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      std: "",
      gender: "",
      bookname: "",
      section: "",
      purchasedate: "",
      returndate: "",
      fees: "",
      date: "",
      remarks: "",
      isActive: false,
    });
    setIsEditing(false);
    setEditingUserId(null);
  };

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen text-gray-100">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Student Upload Page
      </h1>

      {/* Trigger Button */}
      <button
        onClick={openForm}
        className="bg-yellow-400 text-black p-3 rounded hover:bg-yellow-300"
      >
        {isEditing ? "Edit Student" : "Add Student"}
      </button>

      {/* Pop-up Form */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-gray-800 text-gray-100 shadow-lg transform ${
          isFormOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-300">
            {isEditing ? "Edit Student" : "Add Student"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).map((key) =>
              key === "isActive" ? null : (
                <div key={key}>
                  <label className="block font-semibold mb-1 text-yellow-300">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  {key === "gender" ? (
                    <select
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className="border border-yellow-400 p-2 rounded w-full bg-gray-700 text-gray-100"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  ) : (
                    <input
                      type={
                        key === "fees"
                          ? "number"
                          : ["purchasedate", "returndate", "date"].includes(key)
                          ? "date"
                          : "text"
                      }
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                      className="border border-yellow-400 p-2 rounded w-full bg-gray-700 text-gray-100"
                    />
                  )}
                </div>
              )
            )}

            {/* Toggle Button */}
            <div className="flex items-center mt-4">
              <label className="font-semibold mr-2 text-yellow-300">Active</label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-6 w-6 text-yellow-400 rounded focus:ring-yellow-300"
              />
            </div>
          </div>

          <button
            onClick={handleAddUser}
            className="bg-yellow-400 text-black mt-4 p-2 rounded hover:bg-yellow-300 w-full"
          >
            {isEditing ? "Update Student" : "Add Student"}
          </button>

          <button
            onClick={closeForm}
            className="bg-red-500 text-white mt-2 p-2 rounded hover:bg-red-600 w-full"
          >
            Close
          </button>
        </div>
      </div>

      {/* Student Cards Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-yellow-300">Existing Students</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : users.length === 0 ? (
          <p>No students available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-700 text-gray-100 p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                <p><strong>Class (STD):</strong> {user.std}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Book Name:</strong> {user.bookname}</p>
                <p><strong>Section:</strong> {user.section}</p>
                <p><strong>Purchase Date:</strong> {user.purchasedate}</p>
                <p><strong>Return Date:</strong> {user.returndate}</p>
                <p><strong>Fees:</strong> ₹{user.fees}</p>
                <p><strong>Remarks:</strong> {user.remarks}</p>
                <p><strong>Active:</strong> {user.isActive ? "Yes" : "No"}</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-yellow-400 text-black py-1 px-3 rounded hover:bg-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
