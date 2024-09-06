import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['All', 'Dinner', 'Rice', 'Fish', 'Drinks', 'Kottu', 'Soup','Prawns', 'Vegetables', 'Desserts', 
      'Crab', 'Mutton', 'Chicken', 'Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side', 'Dinner'] //addded the catogaris here
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
}, { timestamps: true }); // Add timestamps to the schemazz

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
