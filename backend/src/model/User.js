import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
      maxlength: [255, 'Your name must not exceed 255 characters'],
    },

    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },

    password: {
      type: String,
      required: [true, 'Please enter your password'],
      trim: true,
      // minlength: [8, 'Your password must be atleast 8 characters'],... if you dont want to use the validator, you can use min/max lenght

      validate: [
        validator.isStrongPassword,
        'Your password must contain atleast 8 characters,\none uppercase,\none lowercase,\none number\none special character',
      ],
    },

    avatar: {
      public_id: { type: String, required: false },
      url: { type: String, required: false },
    },

    role: {
      type: String,
      default: 'user',
    },

    profile: {
      type: String,
      required: [true, 'Please enter your Bio'],
      maxlength: [120, 'Your name must not exceed 120 characters'],
    },

    age: {
      type: Number,
      required: [true, 'Please enter your age'],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = model('User', userSchema);

export default User;
