import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side'] // Example categories
  },
  description: String,
  price: { 
    type: Number, 
    required: true, 
    validate: {
      validator: (value) => value > 0,
      message: 'Price must be a positive number'
    }
  },
  image: String,
  isNewItem: { type: Boolean, default: false }, 
  isPopular: { type: Boolean, default: false },
}, { timestamps: true }); // Add timestamps to the schema

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
