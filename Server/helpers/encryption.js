//! bcryptjs package used to encription

const bcrypt = require("bcryptjs");

function encrypt(text) {
  try {
    return bcrypt.hashSync(text, 10); //default value of salt is 10
  } catch (e) {
    console.log(e);
  }
}

function compareHash(text, hash) {
  try {
    return bcrypt.compareSync(text, hash);
  } catch (e) {
    console.log(e);
  }
  return false;
}

module.exports = { encrypt, compareHash };
