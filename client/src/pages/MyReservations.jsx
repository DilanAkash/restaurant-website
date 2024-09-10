import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const MyReservations = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (user) {
        console.log(user._id); // Log user ID to ensure it's being passed
        try {
          const response = await fetch(`http://localhost:5000/api/reservations/user/${user._id}`);
          const data = await response.json();
          console.log(response, data); // Log the response and data

          if (response.ok) {
            setReservations(data);
          } else {
            throw new Error(data.message || 'Unable to fetch reservations');
          }
        } catch (error) {
          console.error('Fetch error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchReservations();
  }, [user]);

  const handleCancelReservation = async (reservationId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this reservation?');
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${reservationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Reservation cancelled successfully!');
        setReservations(prevReservations => prevReservations.filter(r => r._id !== reservationId));
      } else {
        alert('Failed to cancel the reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!user) {
    return <p>Please log in to view your reservations.</p>;
  }

  return (
    <div className="container mx-auto py-16 px-4 mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">My Reservations</h1>
      {isLoading ? (
        <p className="text-center text-2xl text-gray-400">Loading your reservations...</p>
      ) : reservations.length === 0 ? (
        <p className="text-center text-2xl text-gray-400">You have no reservations.</p>
      ) : (
        reservations.map((reservation) => (
          <div
            key={reservation._id}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <p className="text-lg mb-2">Number of Guests: {reservation.numberOfGuests}</p>
            <p className="text-lg mb-2">Date: {new Date(reservation.date).toLocaleDateString()}</p>
            <p className="text-lg mb-2">Time: {reservation.time}</p>
            <p className="text-lg mb-2">Location: {reservation.location}</p>
            <p className="text-lg mb-2">Status: {reservation.status}</p>
            <button
              onClick={() => handleCancelReservation(reservation._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              aria-label={`Cancel reservation ${reservation._id}`}
            >
              Cancel Reservation
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReservations;
