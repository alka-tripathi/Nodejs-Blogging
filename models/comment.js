const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog', //kish blog ke liye comment daala hai
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', //kaun comment dala hai
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('comment', commentSchema);
