const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please Enter your name'],
  },
  email: {
    type: String,
    require: [true, 'Please provide your Email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email'],
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guid', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    require: [true, 'Please provide your password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Please conform your Password'],
    validate: {
      validator: function (el) {
        // Only works on .save() and .create()
        return this.password === el;
      },
      message: 'Passwords do not match',
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

schema.pre('save', async function (next) {
  // run only with send() or create()
  // only run this function if password was actually modified
  if (!this.isModified('password')) next();

  // Hash the password with coast 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordCOnfirm fields
  this.passwordConfirm = undefined;
  next();
});

schema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Blog_User = mongoose.model('Blog_User', schema);

module.exports = Blog_User;
