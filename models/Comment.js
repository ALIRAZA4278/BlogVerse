import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const CommentSchema = new Schema(
  {
    blogId: {
      type: String,
      required: [true, 'Blog ID is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      maxlength: [500, 'Comment cannot be more than 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
