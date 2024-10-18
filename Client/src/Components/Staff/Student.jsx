import React, { useEffect, useState } from 'react';
import GlobalApi from '../GlobalApi';


const Student = () => {
  const [students, setStudents] = useState([]); // State to hold fetched student data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error

  useEffect(() => {
    // Fetch student data
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${GlobalApi.baseUrl}/student/get`); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudents(data); // Update the state with fetched data
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchStudents(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div className="container max-w-6xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        {/* Page Heading */}
        <div className="flex justify-center mb-6">
          <h1 className="text-2xl font-bold text-black">Student Information</h1>
        </div>

        {/* Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-yellow-100 border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-black">{student.name}</h2>
              <p className="text-black"><strong>Std:</strong> {student.std}</p>
              <p className="text-black"><strong>Gender:</strong> {student.gender}</p>
              <p className="text-black"><strong>Book Name:</strong> {student.bookname}</p>
              <p className="text-black"><strong>Section:</strong> {student.section}</p>
              <p className="text-black"><strong>Purchase Date:</strong> {student.purchasedate}</p>
              <p className="text-black"><strong>Return Date:</strong> {student.returndate}</p>
              <p className={`text-lg font-semibold ${student.fees < 1 ? 'text-red-500' : 'text-black'}`}>
                <strong>Fees:</strong> {student.fees}
              </p>
              <p className="text-black"><strong>Remarks:</strong> {student.remarks}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Student;
