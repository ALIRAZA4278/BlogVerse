import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const BookmarkSchema = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one user can bookmark a blog only once
BookmarkSchema.index({ blogId: 1, userId: 1 }, { unique: true });

const Bookmark = models.Bookmark || model('Bookmark', BookmarkSchema);

export default Bookmark;
