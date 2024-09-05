import express from 'express';
import Reservation from '../models/Reservation.js'; // Ensure path and import name are correct

const router = express.Router();

// Fetch all reservations for a given user
router.get('/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const reservations = await Reservation.find({ userId }).sort({ date: -1 });
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reservations', error });
    }
  });

// Create a new reservation
router.post('/', async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating reservation', error });
  }
});

// Update an existing reservation
router.put('/:reservationId', async (req, res) => {
  try {
    const { reservationId } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, req.body, { new: true });
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating reservation', error });
  }
});

// Cancel a reservation
router.delete('/:reservationId', async (req, res) => {
  try {
    const { reservationId } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
    res.json(deletedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Error cancelling reservation', error });
  }
});

export default router;
