import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  response: { type: String },
  status: { type: String, default: 'pending' }, // 'pending' or 'responded'
  createdAt: { type: Date, default: Date.now },
});

export default model('Message', messageSchema);
