import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true }, // Path to the uploaded image
});

export default mongoose.model('Gallery', GallerySchema);
