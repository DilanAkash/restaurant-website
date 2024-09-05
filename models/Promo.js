import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  validTill: { type: Date, required: true },
});

export default mongoose.model('Promo', promoSchema);
