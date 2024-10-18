import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Dummy data for the charts
const dummyData = [
  { name: 'Jan', fees: 4000 },
  { name: 'Feb', fees: 3000 },
  { name: 'Mar', fees: 5000 },
  { name: 'Apr', fees: 4500 },
  { name: 'May', fees: 6000 },
  { name: 'Jun', fees: 4800 },
  { name: 'Jul', fees: 5200 },
];

// Dummy data for school events
const eventCards = [
  { title: 'Science Fair', date: 'October 20, 2024', description: 'Showcase of science projects by students.' },
  { title: 'Parent-Teacher Meeting', date: 'October 25, 2024', description: 'Discuss progress and areas of improvement.' },
  { title: 'Annual Sports Day', date: 'November 10, 2024', description: 'Exciting sports competitions and activities.' },
];

const SDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fees Overview Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="font-bold text-lg mb-4">Fees Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="fees" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* School Events Section */}
      <div className="mt-6">
        <h2 className="font-bold text-lg mb-4">Upcoming School Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventCards.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-md">{event.title}</h3>
              <p className="text-gray-500 text-sm">{event.date}</p>
              <p className="text-gray-600 mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SDashboard;
