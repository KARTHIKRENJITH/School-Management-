# School Management System
**Overview**
This project is a School Management System developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It helps manage students, staff, books, and fees, with role-based modules for Admin, Staff, and Librarian.
Features
1. **Admin Module**
The Admin has full control over the system.
Key functionalities:
Add, edit, and delete Staff and Librarian details.
View the complete list of Staff and Librarian details

2. **Staff Module**
Staff handles student management and fee tracking.
Key functionalities:
Add students to the system.
Add and update fee details for students.
Enter library book details after students borrow books (data received from the Librarian).

3. **Librarian Module**
Librarians manage library operations and book lending.
Key functionalities:
Add books to the library system.
View student details (read-only access).
Mark book borrowing when students check out books.
Share lending details with the Staff for further updates in the student record.


**Technologies Used**
Frontend: React.js, Redux
Backend: Node.js, Express.js
Database: MongoDB
Styling: Tailwind CSS
Authentication: Secure login implemented for role-based access.
