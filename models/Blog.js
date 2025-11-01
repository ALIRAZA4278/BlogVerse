import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },
    // New fields for enhanced features
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    category: {
      type: String,
      enum: ['Technology', 'Lifestyle', 'Business', 'Health', 'Education', 'Travel', 'Food', 'Other'],
      default: 'Other',
    },
    views: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: Number,
      default: 0, // in minutes
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot be more than 160 characters'],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create text index for search functionality
BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
