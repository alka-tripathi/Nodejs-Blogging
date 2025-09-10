const express = require('express');
const path = require('path');
const userRouters = require("./routes/user");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8001;

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
  res.render('home.ejs');
});

// URL :- /user/signup ect
app.use("/user",userRouters);
app.listen(PORT, () => {
  console.log(`${PORT} Server is Listening..`);
});
