const jwt = require('jsonwebtoken');

function generateToken(_id) {
  const payload = {
    _id,
  };
 
  return jwt.sign(payload, "KARYA-SECRET");
}

module.exports = { generateToken };
