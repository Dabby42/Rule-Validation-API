import mongoose from 'mongoose';

let CommentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  comment: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
