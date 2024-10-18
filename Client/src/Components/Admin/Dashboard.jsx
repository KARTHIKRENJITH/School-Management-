import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import Home from "./Home";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const Dashboard = () => {
 
  // Attendance Chart Data
  const attendanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Total Staff",
        data: [250, 200, 300, 280, 260, 320],
        backgroundColor: "#ffd60a", // Yellow color for present
      },
      {
        label: "Total Librarians",
        data: [50, 70, 80, 60, 90, 60],
        backgroundColor: "#1a1a1a", // Black color for absent
      },
    ],
  };

  // Gender Distribution Doughnut Chart Data
  const genderData = {
    labels: ["Boys", "Girls"],
    datasets: [
      {
        data: [1500, 1000],
        backgroundColor: ["#ffd60a", "#1a1a1a"], // Yellow and black theme
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-center text-5xl font-extrabold text-yellow-500 mb-12">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Gender Distribution Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-black text-center mb-4">
            Total Students by Gender
          </h2>
          <Doughnut data={genderData} />
          <p className="text-center mt-4 text-2xl font-bold text-black">2500</p>
        </div>

        {/* Attendance Chart Card */}
        <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-black">Worker</h2>
            <select className="border rounded px-2 py-1 bg-white text-black">
              <option>This week</option>
              <option>This month</option>
            </select>
          </div>
          <Bar data={attendanceData} options={{ responsive: true }} />
        </div>

        {/* Event Calendar Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-black text-center mb-4">
            Event Calendar
          </h2>
          <div className="text-center">
            <p className="text-2xl font-bold text-black">July 2023</p>
            <div className="grid grid-cols-7 gap-2 mt-4">
              {Array.from({ length: 31 }, (_, i) => (
                <button
                  key={i}
                  className={`p-3 rounded ${
                    i + 1 === 20
                      ? "bg-yellow-500 text-black"
                      : "hover:bg-yellow-500 hover:text-black"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
