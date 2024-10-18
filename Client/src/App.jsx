import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Pages/Login';
import Dashboard from './Components/Admin/Dashboard';
import StaffDetails from './Components/Admin/StaffDetails'
import Sb from './Components/Staff/Sb'; // Staff Sidebar
import StudentDetails from './Components/Staff/StudentDetails';
import SDashboard from './Components/Staff/SDashboard';
import Student from './Components/Staff/Student
import Book from './Components/Admin/Book'
import SideBar from './Components/Librarian/SideBar';
import DashboardLibrian from "./Components/Librarian/DashboardLibrian";
import Library from './Components/Librarian/Libraray';
import Taken from './Components/Librarian/Taken';
import Btaken from './Components/Staff/Btaken';
import Asider from './Components/Admin/Asider';
// Reusable Layout Component
const Layout1 = ({ children }) => (
  <div className="flex">
    <Home /> {/* Admin Sidebar */}
    <div className="flex-grow">{children}</div>
  </div>
);

const Layout2 = ({ children }) => (
  <div className="flex">
    <Sb /> {/* Staff Sidebar */}
    <div className="flex-grow">{children}</div>
  </div>
);

const Layout3 = ({ children }) => (
  <div className="flex">
    <SideBar /> {/* Librarian Sidebar */}
    <div className="flex-grow">{children}</div>
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Admin */}
      <Route path="/dashboard" element={<Layout1><Dashboard /></Layout1>} />
      <Route path="/staffdetails" element={<Layout1><StaffDetails /></Layout1>} />
      <Route path="/student" element={<Layout1><Student /></Layout1>} />
      <Route path="/library" element={<Layout1><Book /></Layout1>} />

      {/* Staff */}
      <Route path="/staffdashboard" element={<Layout2><SDashboard /></Layout2>} />
      <Route path="/studentdetails" element={<Layout2><StudentDetails /></Layout2>} />
      <Route path='/btaken' element={<Layout2><Btaken/></Layout2>} />
      <Route path="/booklibrary" element={<Layout2><Book /></Layout2>} />

      {/* Librarian */}
      <Route path="/DashboardLibrian" element={<Layout3><DashboardLibrian /></Layout3>} />
      <Route path="/lb" element={<Layout3><Library /></Layout3>} />
      <Route path="/student-details" element={<Layout3><Student /></Layout3>} />
      <Route path="/taken" element={<Layout3><Taken /></Layout3>} />
    </Routes>
  );
};

export default App;

