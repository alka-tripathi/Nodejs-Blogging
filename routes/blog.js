const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const blog = require('../models/blog');

const router = express.Router();

// GET route to render blog form
router.get('/add-new', (req, res) => {
  return res.render('addBlogs', {
    user: req.user,
  });
});

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(`./public/uploads/${req.user._id}`);

    // Ensure directory exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, body } = req.body;

    const blogs = await blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.user._id}/${req.file.filename}`,
    });

    return res.redirect(`/blogs/${blogs._id}`);
  } catch (error) {
    console.error('Error creating blog:', error);

    // If validation error, re-render the form with error message
    return res.status(400).render('addBlogs', {
      user: req.user,
      error: error.message,
      oldInput: req.body,
    });
  }
});

module.exports = router;
