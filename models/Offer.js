import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  offerName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  promoCode: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  }
});

// Export the model as default
const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
