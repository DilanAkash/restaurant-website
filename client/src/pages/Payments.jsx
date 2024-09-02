import React, { useState, useEffect } from 'react';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Placeholder: Fetch payments from the backend API and update the state
    // fetch('http://localhost:5000/api/payments', { method: 'GET' })
    //   .then(response => response.json())
    //   .then(data => setPayments(data))
    //   .catch(error => console.error('Error fetching payments:', error));

    // For now, we'll use mock data
    setPayments([
      { id: 1, description: 'Pizza', amount: '$15', status: 'Paid' },
      { id: 2, description: 'Burger', amount: '$10', status: 'Pending' },
    ]);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payments</h2>
        <ul>
          {payments.map(payment => (
            <li key={payment.id} className="mb-4">
              <div className="mb-2">
                <strong>Description:</strong> {payment.description}
              </div>
              <div className="mb-2">
                <strong>Amount:</strong> {payment.amount}
              </div>
              <div className={`text-${payment.status === 'Paid' ? 'green' : 'yellow'}-500`}>
                {payment.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Payments;
