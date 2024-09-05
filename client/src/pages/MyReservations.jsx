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
    return <p>Please log in to view your reservations.</p>;
  }

  return (
    <div>
      <h1>My Reservations</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <ul>
          {reservations.map(reservation => (
            <li key={reservation._id}>
              Reservation for {reservation.numberOfGuests} on {new Date(reservation.date).toLocaleDateString()} at {reservation.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReservations;
