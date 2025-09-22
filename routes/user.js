const express = require('express');
const User = require('../models/users');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { createTokenForUser } = require('../services/authentication');

router.get('/signin', (req, res) => {
  return res.render('signin.ejs');
});
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user_email = await User.findOne({ email });
    if (!user_email) {
      // return res.send('User not found');
      return res.redirect('signin.ejs', {
        error: 'Email is Incorrect',
      });
    }
    const isMatch = await bcrypt.compare(password, user_email.password);

    if (!isMatch) {
      // return res.send('Incorrect password');
      return res.redirect('signin.ejs', {
        error: 'Password is Incorrect',
      });
    }
    // console.log(user_email);

    const token = createTokenForUser(user_email);
    console.log(token);

    return res.cookie('token', token).redirect('/');
  } catch (err) {
    console.error(err);
    return res.render('signin.ejs', {
      error: 'Incorrect email and password',
    });
  }
});


router.get('/signup', (req, res) => {
  return res.render('signup.ejs');
});
//post api
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body; // Match frontend input name
    await User.create({
      fullName,
      email,
      password,
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error: ' + err.message);
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token').redirect('/');
});
module.exports = router;
