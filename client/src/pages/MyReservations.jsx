import React, { useState, useEffect } from 'react';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Placeholder: Fetch reservations from the backend API and update the state
    // fetch('http://localhost:5000/api/reservations', { method: 'GET' })
    //   .then(response => response.json())
    //   .then(data => setReservations(data))
    //   .catch(error => console.error('Error fetching reservations:', error));

    // For now, we'll use mock data
    setReservations([
      { id: 1, date: '2024-09-15', time: '7:00 PM', status: 'Confirmed' },
      { id: 2, date: '2024-09-18', time: '8:00 PM', status: 'Pending' },
    ]);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
        <ul>
          {reservations.map(reservation => (
            <li key={reservation.id} className="mb-2">
              <div className="flex justify-between">
                <span>{reservation.date} at {reservation.time}</span>
                <span className={`text-${reservation.status === 'Confirmed' ? 'green' : 'yellow'}-500`}>
                  {reservation.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyReservations;
