import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import DashboardLayout from '../layouts/DashboardLayout'; // Importing the layout

const Reports = () => {
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reservations data
    const fetchReservations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reservations'); // API endpoint for reservations
        setReservations(res.data);
      } catch (error) {
        console.error('Error fetching reservations', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch users data (you can fetch any other data here)
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users'); // API endpoint for users
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchReservations();
    fetchUsers();
  }, []);

  // Function to export reservations to Excel
  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <DashboardLayout role="admin"> {/* Wrapping in DashboardLayout */}
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Reports</h1>

        <div className="grid grid-cols-1 gap-4">
          {/* Reservations Export Button */}
          <button
            onClick={() => exportToExcel(reservations, 'Reservations_Report')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Export Reservations to Excel
          </button>

          {/* Users Export Button */}
          <button
            onClick={() => exportToExcel(users, 'Users_Report')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Export Users to Excel
          </button>
        </div>

        {/* Optionally, you can display the data on the page as well */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reservations Data</h2>
          <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Guests</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id} className="bg-gray-700">
                  <td className="border px-4 py-2">{new Date(reservation.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{reservation.time}</td>
                  <td className="border px-4 py-2">{reservation.numberOfGuests}</td>
                  <td className="border px-4 py-2">{reservation.location}</td>
                  <td className="border px-4 py-2">{reservation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
