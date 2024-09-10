import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      price: { 
        type: Number, 
        required: true,
        validate: {
          validator: (value) => value > 0,
          message: 'Price must be a positive number',
        },
      },
      quantity: { 
        type: Number, 
        required: true,
        validate: {
          validator: (value) => value > 0,
          message: 'Quantity must be a positive number',
        },
      },
      image: { type: String, required: true },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Card Payment', 'Cash On Delivery'],
    default: 'Card Payment',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }); 

// Pre-save middleware to automatically calculate the total
orderSchema.pre('save', function (next) {
  this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
