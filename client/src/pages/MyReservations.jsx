import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const MyReservations = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:5000/api/reservations/user/${user._id}`);
          const data = await response.json();
          if (response.ok) {
            setReservations(data);
          } else {
            throw new Error(data.message || "Unable to fetch reservations");
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchReservations();
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p>Please log in to view your reservations.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold text-center">My Reservations</h1>
      {isLoading ? (
        <div className="text-center mt-4">
          <p>Loading...</p>
        </div>
      ) : reservations.length === 0 ? (
        <div className="text-center mt-4">
          <p>No reservations found.</p>
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {reservations.map(reservation => (
            <li key={reservation._id} className="bg-gray-800 p-4 rounded-lg">
              Reservation for {reservation.numberOfGuests} guests on {new Date(reservation.date).toLocaleDateString()} at {reservation.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReservations;
