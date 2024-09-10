import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout'; 

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Fetch all reservations
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error); 
        setErrorMessage('Error fetching reservations'); 
      }
      
    };
    fetchReservations();
  }, []);

  const updateReservationStatus = async (reservationId, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/reservations/${reservationId}`, { status });
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation._id === reservationId ? { ...reservation, status: response.data.status } : reservation
        )
      );
      setMessage('Reservation status updated successfully');
    } catch {
      setErrorMessage('Error updating reservation status'); 
    }
  };

  const deleteReservation = async (reservationId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this reservation?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
      setReservations((prev) => prev.filter((reservation) => reservation._id !== reservationId));
      setMessage('Reservation deleted successfully');
    } catch {
      setErrorMessage('Error deleting reservation');
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Reservations Management</h1>

        {message && <div className="bg-green-500 text-white p-4 rounded mb-4">{message}</div>}
        {errorMessage && <div className="bg-red-500 text-white p-4 rounded mb-4">{errorMessage}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reservations.length === 0 ? (
            <p className="text-center col-span-full text-white">No reservations available.</p>
          ) : (
            reservations.map((reservation) => (
              <div key={reservation._id} className="bg-gray-800 p-6 rounded-lg shadow-md">
                <p className="text-xl font-semibold">Reservation for {reservation.numberOfGuests} guests</p>
                <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>
                <p>Time: {reservation.time}</p>
                <p>Location: {reservation.location}</p>
                <p>Status: {reservation.status}</p>

                <div className="mt-4">
                  <button
                    onClick={() => updateReservationStatus(reservation._id, 'confirmed')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateReservationStatus(reservation._id, 'cancelled')}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>

                <button
                  onClick={() => deleteReservation(reservation._id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReservationsManagement;
