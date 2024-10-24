import mongoose from 'mongoose';

// Connect to MongoDB
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: ObjectId,
    ref: 'Product',
    required: true,
  },
});

const Review = model('Review', reviewSchema);

export default Review;
