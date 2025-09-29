const mongoose = require('mongoose');
// const user = require('./models/users.js');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Must match the User model name
      required: true,
    },
  },
  { timestamps: true } // ✅ fixed spelling
);

module.exports = mongoose.model('blog', blogSchema);
