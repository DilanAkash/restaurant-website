import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const offerSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true }, // Discount percentage
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Offer', offerSchema);
