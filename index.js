const express = require('express');
const path = require('path');
const userRouters = require('./routes/user');
const blogRouters = require('./routes/blog.js');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8001;
const dbConnection = require('./db.js');
dbConnection();
const cookieparser = require('cookie-parser');
app.use(cookieparser());

const { authenticationCookie } = require('./middleware/authentication.js');

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//frontend se data aata hai toh
app.use(express.urlencoded({ extended: false }));
// app.use(cookieparser);

app.use(authenticationCookie('token'));
app.get('/', (req, res) => {
  res.render('home.ejs', {
    user: req.user,
  });
});

// URL :- /user/signup ect
app.use('/user', userRouters);

app.use('/blog', blogRouters);

app.listen(PORT, () => {
  console.log(`${PORT} Server is Listening..`);
});
