const express = require('express');
const User = require('../models/users');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/signin', (req, res) => {
  return res.render('signin.ejs');
});
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user_email = await User.findOne({ email });
    if (!user_email) {
      return res.send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user_email.password);

    if (!isMatch) {
      return res.send('Incorrect password');
    }
    console.log(user_email);
    return res.send(`Welcome, ${user_email.fullName}`);
  } catch (err) {
    console.error(err);
    return res.send('Something went wrong');
  }
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
