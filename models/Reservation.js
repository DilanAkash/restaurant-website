import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  numberOfGuests: { type: Number, required: true },
  location: { type: String, required: true }, 
  status: { type: String, default: 'pending' }, 
});

export default model('Reservation', reservationSchema);
