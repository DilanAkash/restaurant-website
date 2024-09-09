import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaCreditCard,
} from 'react-icons/fa';

const StaffOrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/all-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/update-status/${orderId}`, { status });
      setOrders(prevOrders =>
        prevOrders.map(order => (order._id === orderId ? { ...order, status } : order))
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Function to export orders to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'StaffOrders_Report.xlsx');
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <DashboardLayout role="staff">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Staff Orders Management</h1>

        <button
          onClick={exportToExcel}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Export Orders to Excel
        </button>

        <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Payment Method</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="bg-gray-700">
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.user.name} ({order.user.email})</td>
                <td className="border px-4 py-2">Rs. {order.total}</td>
                <td className="border px-4 py-2">
                  {order.paymentMethod === 'Card Payment' ? (
                    <FaCreditCard className="text-blue-500" />
                  ) : (
                    <FaMoneyBillWave className="text-green-500" />
                  )}
                  {order.paymentMethod}
                </td>
                <td className="border px-4 py-2">
                  {order.status === 'Completed' ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaClock className="text-red-500" />
                  )}
                  {order.status}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={() => updateOrderStatus(order._id, 'In Progress')}
                  >
                    In Progress
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
                    onClick={() => updateOrderStatus(order._id, 'Completed')}
                  >
                    Complete
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                    onClick={() => updateOrderStatus(order._id, 'Cancelled')}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default StaffOrdersManagement;
