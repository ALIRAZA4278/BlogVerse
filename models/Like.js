import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const LikeSchema = new Schema(
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

// Compound index to ensure one user can like a blog only once
LikeSchema.index({ blogId: 1, userId: 1 }, { unique: true });

const Like = models.Like || model('Like', LikeSchema);

export default Like;
