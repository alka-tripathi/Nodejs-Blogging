const express = require('express');
const user = require('../models/users');
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
  await user.create({
    fullname,
    email,
    password,
  });
  return res.redirect('/'); //will redirect to the home [age]
});
module.exports = router;
