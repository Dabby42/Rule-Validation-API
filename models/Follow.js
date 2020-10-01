import mongoose from 'mongoose';

let FollowSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  source: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let Follow = mongoose.model('Follow', FollowSchema);

module.exports = Follow;
