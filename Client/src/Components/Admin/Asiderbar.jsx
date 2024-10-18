import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { FaChartBar, FaInbox, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

const Home = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate(); // Initialize navigate
  const { isAuthenticated, token } = useSelector((state) => state.auth); // Select authentication state

  
  useEffect(() => {
    if (!token || !isAuthenticated) {
      navigate('/'); 
    }
  }, [token, isAuthenticated, navigate]);
  // Logout function
  const handleLogout = () => {
    // Clear any token or session data (if using localStorage or context)
    localStorage.removeItem("token"); 
    alert("You have been logged out.");
    
    // Redirect to login page
    navigate("/");
  };

  // Menu items definition
  const Menus = [
    { title: "Dashboard", icon: <FaChartBar />, path: "/dashboard" },
    { title: "Workers Management", icon: <FaInbox />, path: "/staffdetails" },
    { title: "Book List", icon: <FaInbox />, path: "/library" },
    { title: "Student Information", icon: <FaUserAlt />, path: `/student`, gap: true },
    {
      title: "Logout",
      icon: <FaSignOutAlt />,
      onClick: handleLogout, // Attach logout function
    },
  ];

  return (
    <div className="flex bg-black min-h-screen">
      <div className={` ${open ? "w-72" : "w-20"} bg-black min-h-screen p-5 pt-8 relative duration-300`}>
        {/* Toggle button */}
        <img
          src={
            open
              ? "https://img.icons8.com/material-outlined/24/ffff00/circled-left.png"
              : "https://img.icons8.com/material-outlined/24/ffff00/circled-right.png"
          }
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-black border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
          alt="Toggle"
          aria-label="Toggle sidebar"
        />

        {/* Logo Section */}
        <div className="flex gap-x-4 items-center">
          <h1 className={`text-yellow-400 origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
            ADMIN
          </h1>
        </div>

        {/* Menu List */}
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer text-yellow-400 text-sm items-center gap-x-4 
              ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-yellow-500"}`}
              onClick={menu.onClick ? menu.onClick : null} // Handle onClick if present
            >
              <span className="text-xl transition-transform duration-200 hover:scale-110">{menu.icon}</span>

              {/* Handle navigation with Link */}
              {menu.path ? (
                <Link to={menu.path}>
                  <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
                </Link>
              ) : (
                <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
