const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const blog = require('../models/blog');
const comments = require('../models/comment');
// const comment = require('../models/comment');

const router = express.Router();

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

// 2️⃣ GET: Show add new blog form
router.get('/add-new', (req, res) => {
  return res.render('addBlogs', {
    user: req.user,
  });
});

// 3️⃣ POST: Create a new blog

router.post('/add-new', upload.single('coverImage'), async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const blogPost = await blog.findById(req.params.id).populate('createdBy');

    const commentlist = await comments
      .find({ blogId: req.params.id })
      .populate('createdBy');
    console.log(blogPost);
    console.log(commentlist);
    if (!blogPost) {
      return res.status(404).send('Blog not found');
    }
    return res.render('blog', {
      user: req.user,
      blog: blogPost,
      comments: commentlist,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

router.post('/comment/:blogId', async (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  await comments.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
