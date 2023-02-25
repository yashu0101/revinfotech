const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  userId: Number, //for autoincrement we install npm i mongoose-sequence
  name: {
    first: { type: String, minlength: 3, maxlength: 45 },
    last: { type: String, minlength: 3, maxlength: 45 },
  },
  mobile: { type: String, minlength: 10, maxlength: 15 },
  email: {
    type: String,
    minlength: 10,
    maxlength: 100,
    unique: true,
    required: true,
  },
  password: String,
  role: String,
  status: Number,
  avatar: String,

  createdAt: { type: Date, default: Date.now },
});

userSchema.plugin(AutoIncrement, { inc_field: "userId" }); //This plugin lets you create fields which autoincrement their value:

module.exports = mongoose.model("User", userSchema);
