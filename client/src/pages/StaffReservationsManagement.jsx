import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout'; // Importing the layout

const StaffReservationsManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all reservations
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations'); // Fetch all reservations
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('Failed to fetch reservations');
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Update reservation status
  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/reservations/${reservationId}`, { status: newStatus });
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === reservationId ? { ...reservation, status: newStatus } : reservation
        )
      );
      alert('Reservation status updated successfully!');
    } catch (error) {
      console.error('Error updating reservation status:', error);
      alert('Failed to update reservation status');
    }
  };

  // Cancel reservation
  const cancelReservation = async (reservationId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this reservation?');
    if (!confirmCancel) return;

    try {
      await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
      setReservations((prevReservations) => prevReservations.filter((reservation) => reservation._id !== reservationId));
      alert('Reservation cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert('Failed to cancel reservation');
    }
  };

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <DashboardLayout role="staff"> {/* Wrapping in DashboardLayout */}
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Reservations Management</h1>

        {reservations.length === 0 ? (
          <p className="text-center">No reservations available.</p>
        ) : (
          <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Reservation ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Guests</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id} className="bg-gray-700">
                  <td className="border px-4 py-2">{reservation._id}</td>
                  <td className="border px-4 py-2">{reservation.userId?.name || 'Unknown User'}</td>
                  <td className="border px-4 py-2">{new Date(reservation.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{reservation.time}</td>
                  <td className="border px-4 py-2">{reservation.numberOfGuests}</td>
                  <td className="border px-4 py-2">{reservation.location}</td>
                  <td className="border px-4 py-2">{reservation.status}</td>
                  <td className="border px-4 py-2">
                    {reservation.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateReservationStatus(reservation._id, 'confirmed')}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => cancelReservation(reservation._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {reservation.status === 'confirmed' && <span className="text-green-500">Confirmed</span>}
                    {reservation.status === 'cancelled' && <span className="text-red-500">Cancelled</span>}
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

export default StaffReservationsManagement;
