import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalApi from '../GlobalApi';

const ManageUsers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const getEmployees = async () => {
    try {
      const response = await axios.get(`${GlobalApi.baseUrl}/staff/get`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email address is invalid';
    if (!formData.password && !isEditing) newErrors.password = 'Password is required';
    else if (formData.password.length < 6 && !isEditing)
      newErrors.password = 'Password must be at least 6 characters long';
    return newErrors;
  };

  const handleAddUser = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEditing) {
        const response = await axios.put(
          `${GlobalApi.baseUrl}/staff/edit/${editingUserId}`,
          formData
        );
        setUsers(users.map(user => (user._id === editingUserId ? response.data : user)));
        setIsEditing(false);
        setEditingUserId(null);
      } else {
        const response = await axios.post(
          `${GlobalApi.baseUrl}/staff/create`,
          formData,
          { headers: { 'Content-Type': 'application/json' } }
        );
        setUsers([...users, response.data]);
      }
      setFormData({ name: '', email: '', password: '', role: '' });
      setErrors({});
    } catch (error) {
      console.error('Error saving user:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditUser = (user) => {
    setFormData({ name: user.name, email: user.email, password: '', role: user.role });
    setIsEditing(true);
    setEditingUserId(user._id);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${GlobalApi.baseUrl}/staff/delete/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Workers Management</h1>
         
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 py-20">

          {/* Form Section */}
          <div className="bg-yellow-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-black mb-4">
              {isEditing ? 'Edit User' : 'Add User'}
            </h2>
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border p-2 rounded w-full"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border p-2 rounded w-full"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="border p-2 rounded w-full"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Role</option>
                <option value="staff">Staff</option>
                <option value="worker">worker</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>
            <button
              onClick={handleAddUser}
              className="bg-black text-yellow-400 mt-4 p-2 w-full rounded hover:bg-gray-800"
            >
              {isEditing ? 'Update User' : 'Add User'}
            </button>
          </div>

          {/* User List Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-black mb-4">Existing Users</h2>
            <table className="table-auto w-full">
              <thead className="bg-yellow-200">
                <tr>
                  <th className="px-2 py-1 text-left">Name</th>
                  <th className="px-2 py-1 text-left">Email</th>
                  <th className="px-2 py-1 text-left">Role</th>
                  <th className="px-2 py-1 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-2">No users available</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="border-t">
                      <td className="px-2 py-1">{user.name}</td>
                      <td className="px-2 py-1">{user.email}</td>
                      <td className="px-2 py-1">{user.role}</td>
                      <td className="px-2 py-1">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="bg-yellow-500 text-black px-2 py-1 rounded mr-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
};

export default ManageUsers;
