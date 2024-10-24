import mongoose from 'mongoose';

// Connect to MongoDB
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide the price for this product'],
      trim: true,
      maxlength: [5, 'Price cannot exceed 5 digits'],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for this product'],
      maxlength: [1024, 'Description cannot exceed 1024 characters'],
      trim: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },

    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    category: {
      type: String,
      required: [true, 'Please provide a category for this product'],
    },
    stock: {
      type: Number,
      required: true,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: [
        {
          name: { type: String, required: true },
          rating: { type: Number, required: true },
          comment: { type: String, required: true },
          userId: { type: ObjectId, ref: 'User', required: true },
        },
      ],
      default: [],
    },

    //   reviews: [{ type: ObjectId, ref: 'Review' }],

    user: {
      type: ObjectId,
      ref: 'User',
    },
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   updatedAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
  },
  { timestamps: true }
);

const Product = model('Product', productSchema);

export default Product;
