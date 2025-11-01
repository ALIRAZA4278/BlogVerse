import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const NewsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Newsletter = models.Newsletter || model('Newsletter', NewsletterSchema);

export default Newsletter;
