import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: 'Quantity must be a positive number'
    }
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: 'Price must be a positive number'
    }
  },
  image: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Adding index to improve query performance
  },
  items: [orderItemSchema],
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Card Payment', 'Cash On Delivery'],
    default: 'Card Payment',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
}, { timestamps: true });

// Pre-save middleware to automatically calculate total
orderSchema.pre('save', function (next) {
  this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
