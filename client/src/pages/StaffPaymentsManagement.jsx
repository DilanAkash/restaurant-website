import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';

const StaffPaymentsManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all payments
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments'); // Fetch all payments
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Failed to fetch payments');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Update payment status
  const updatePaymentStatus = async (paymentId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/payments/${paymentId}`, { status: newStatus });
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === paymentId ? { ...payment, status: newStatus } : payment
        )
      );
      alert('Payment status updated successfully!');
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update payment status');
    }
  };

  if (loading) {
    return <p>Loading payments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <DashboardLayout role="staff"> {/* Wrapping in DashboardLayout */}
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Payments Management</h1>

        {payments.length === 0 ? (
          <p className="text-center">No payments available.</p>
        ) : (
          <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Payment ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="bg-gray-700">
                  <td className="border px-4 py-2">{payment._id}</td>
                  <td className="border px-4 py-2">{payment.user?.name || 'Unknown User'}</td>
                  <td className="border px-4 py-2">Rs. {payment.amount}</td>
                  <td className="border px-4 py-2">{payment.paymentMethod}</td>
                  <td className="border px-4 py-2">{payment.status}</td>
                  <td className="border px-4 py-2">
                    {new Date(payment.date).toLocaleDateString()}{' '}
                    {new Date(payment.date).toLocaleTimeString()}
                  </td>
                  <td className="border px-4 py-2">
                    {payment.status === 'Pending' ? (
                      <button
                        onClick={() => updatePaymentStatus(payment._id, 'Paid')}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Mark as Paid
                      </button>
                    ) : (
                      <span className="text-green-500">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StaffPaymentsManagement;
