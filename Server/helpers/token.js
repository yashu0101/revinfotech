const jwt = require("jsonwebtoken");

const createToken = (payload = {}, expiry = 60 * 10) => {
  try {
    return jwt.sign(payload, process.env.KEY, { expiresIn: expiry });
  } catch (err) {
    console.error(err);
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.KEY);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { createToken, verifyToken };
