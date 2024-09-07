import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

const Payments = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:5000/api/payments/user/${user._id}`);
          if (response.ok) {
            const data = await response.json();
            setPayments(data);
          } else {
            console.error('Failed to fetch payments');
          }
        } catch (error) {
          console.error('Error fetching payments:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPayments();
  }, [user]);

  if (!user) {
    return <p className="text-center text-2xl">Please log in to view your payments.</p>;
  }

  return (
    <div className="container mx-auto py-16 px-4 mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">My Payments</h1>
      {loading ? (
        <p className="text-center text-2xl text-gray-400">Loading your payments...</p>
      ) : payments.length === 0 ? (
        <p className="text-center text-2xl text-gray-400">You have no payments yet.</p>
      ) : (
        payments.map((payment) => (
          <div
            key={payment._id}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-4">
              Payment ID: <span className="text-yellow-500">{payment._id}</span>
            </h2>
            <p className="text-lg mb-2 flex items-center">
              {payment.paymentMethod === 'Card Payment' ? (
                <FaCreditCard className="mr-2 text-blue-500" />
              ) : (
                <FaMoneyBillWave className="mr-2 text-green-500" />
              )}
              Amount: <span className="font-bold text-yellow-500 ml-2">Rs. {payment.amount}</span>
            </p>
            <p className="text-lg mb-4">
              Status: <span className="text-yellow-500">{payment.status}</span>
            </p>
            <p className="text-lg mb-4">
              Date: <span className="text-yellow-500">{new Date(payment.date).toLocaleString()}</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Payments;
