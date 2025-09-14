const mongoose = require('mongoose');
require('dotenv').config();
const dburl = process.env.mongoURL;

// app.use(bodyParser.urlencoded({ extended: true }));

async function connectDB() {
  try {
    await mongoose.connect(dburl);
    console.log('✅ DB Connected Successfully!');
  } catch (err) {
    console.log('❌ DB Connection Failed:', err.message);
  }
}
module.exports = connectDB;
