const express = require('express');
const User = require('../models/users');
const router = express.Router();

router.get('/signin', (req, res) => {
  return res.render('signin.ejs');
});

//post api
router.get('/signup', (req, res) => {
  return res.render('signup.ejs');
});
router.post('/signup', async (req, res) => {
  const { fullname, email, password } = req.body;
  await User.create({
    fullName: fullname,
    email,
    password,
  });
  res.redirect('/'); //will redirect to the home [age]
});
module.exports = router;
