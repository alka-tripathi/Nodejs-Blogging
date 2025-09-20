const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      requied: true,
    },
    coverImageURL: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timeStamps: true }
);
module.exports = mongoose.model('blog', blogSchema);
