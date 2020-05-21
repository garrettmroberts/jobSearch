const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type :String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  },
  password: {
    type: String,
    required: true,
    match: /[a-z0-9]{8,}/i
  },
  // jobs: {
  //   type: [{
  //     type: mongoose.ObjectId,
  //     ref: Job
  //   }],
  //   default: []
  // }
});

userSchema.methods.verifyPassword = pw => {
  return bcrypt.compareSync(pw, this.password);
};

userSchema.pre('save', function() {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = User;