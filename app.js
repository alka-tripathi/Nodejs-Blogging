const express = require('express');
const path = require('path');
const userRouters = require('./routes/user.js');
const blogRouters = require('./routes/blog.js');
const blog = require('./models/blog.js');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8001;
const dbConnection = require('./db.js');
dbConnection();
const cookieparser = require('cookie-parser');
app.use(cookieparser());
const blogRouter = require('./routes/blog.js');

app.use(express.static(path.resolve('./public')));

const { authenticationCookie } = require('./middleware/authentication.js');

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//frontend se data aata hai toh
app.use(express.urlencoded({ extended: false }));
// app.use(cookieparser);

app.use(authenticationCookie('token'));

app.get('/', async (req, res) => {
  try {
    const allBlogs = await blog.find({}).sort({ createdAt: -1 }); //descendin
    res.render('home', {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// URL :- /user/signup ect
app.use('/user', userRouters);

app.use('/blogs', blogRouter);

app.listen(PORT, () => {
  console.log(`${PORT} Server is Listening..`);
});
