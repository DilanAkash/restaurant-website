import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import DashboardLayout from '../layouts/DashboardLayout'; 

const Reports = () => {
  const [reservations, setReservations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [queries, setQueries] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reservations data
    const fetchReservations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reservations');
        setReservations(res.data);
      } catch (error) {
        console.error('Error fetching reservations', error);
      }
    };

    // Fetch payments data
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/payments');
        setPayments(res.data);
      } catch (error) {
        console.error('Error fetching payments', error);
      }
    };

    // Fetch queries data
    const fetchQueries = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/messages'); 
        setQueries(res.data);
      } catch (error) {
        console.error('Error fetching queries', error);
      }
    };

    // Fetch users data
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users'); 
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    // Fetch all data in parallel
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchReservations(), fetchPayments(), fetchQueries(), fetchUsers()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to export data to Excel
  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold text-gray-400">Loading data...</p>
      </div>
    );
  }

  return (
    <DashboardLayout role="admin"> {/* Wrapping in DashboardLayout */}
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-10">Reports Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Reservations Export Button */}
          <button
            onClick={() => exportToExcel(reservations, 'Reservations_Report')}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105"
          >
            Export Reservations to Excel
          </button>

          {/* Payments Export Button */}
          <button
            onClick={() => exportToExcel(payments, 'Payments_Report')}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105"
          >
            Export Payments to Excel
          </button>

          {/* Queries Export Button */}
          <button
            onClick={() => exportToExcel(queries, 'Queries_Report')}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105"
          >
            Export Queries to Excel
          </button>

          {/* Users Export Button */}
          <button
            onClick={() => exportToExcel(users, 'Users_Report')}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105"
          >
            Export Users to Excel
          </button>
        </div>

        {/* Data Tables for each report */}

        {/* Reservations Data Table */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Reservations Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg table-auto">
              <thead>
                <tr className="bg-gray-700 text-yellow-500">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Guests</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr key={reservation._id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                    <td className="border px-4 py-3">
                      {new Date(reservation.date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-3">{reservation.time}</td>
                    <td className="border px-4 py-3">{reservation.numberOfGuests}</td>
                    <td className="border px-4 py-3">{reservation.location}</td>
                    <td className={`border px-4 py-3 ${reservation.status === 'confirmed' ? 'text-green-400' : 'text-red-400'}`}>
                      {reservation.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payments Data Table */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Payments Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg table-auto">
              <thead>
                <tr className="bg-gray-700 text-purple-500">
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                    <td className="border px-4 py-3">${payment.amount}</td>
                    <td className="border px-4 py-3">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="border px-4 py-3">{payment.paymentMethod}</td>
                    <td className={`border px-4 py-3 ${payment.status === 'Paid' ? 'text-green-400' : 'text-red-400'}`}>
                      {payment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Queries Data Table */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-red-400 mb-6">Customer Queries</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg table-auto">
              <thead>
                <tr className="bg-gray-700 text-red-500">
                  <th className="px-4 py-3">Query ID</th>
                  <th className="px-4 py-3">Customer Name</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((query, index) => (
                  <tr key={query._id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                    <td className="border px-4 py-3">{query._id}</td>
                    <td className="border px-4 py-3">{query.customerName}</td>
                    <td className="border px-4 py-3">{query.message}</td>
                    <td className="border px-4 py-3">{new Date(query.date).toLocaleDateString()}</td>
                    <td className="border px-4 py-3">{query.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Activity Data Table */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-green-400 mb-6">User Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg table-auto">
              <thead>
                <tr className="bg-gray-700 text-green-500">
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                    <td className="border px-4 py-3">{user._id}</td>
                    <td className="border px-4 py-3">{user.action}</td>
                    <td className="border px-4 py-3">{new Date(user.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
