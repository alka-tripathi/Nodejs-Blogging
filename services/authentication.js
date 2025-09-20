const JWT = require('jsonwebtoken');

// const secret = '$alka';
require('dotenv').config();
const secret = process.env.secret || '$bhumi';
function createTokenForUser(user) {
  //paylaod : It contains claims = data about the user/session.
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profilImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret, { expiresIn: '1h' });   //ye humara token hai
  return token;
}

function validateToken(token) {
  try {
    const payloads = JWT.verify(token, secret);
    return payloads;
  } catch (err) {
    return null; // invalid token
  }
}
module.exports = {
  createTokenForUser,
  validateToken,
};
