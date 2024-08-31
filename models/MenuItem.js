import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  isNewItem: { type: Boolean, default: false }, // Renamed from isNew to isNewItem
  isPopular: { type: Boolean, default: false },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
