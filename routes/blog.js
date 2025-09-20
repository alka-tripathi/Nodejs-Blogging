const express = require('express');

const router = express.Router();
router.get('/add-new', (req, res) => {
  return res.render('addBlogs', {
    user: req.user,
  });
});

module.exports = router;
