const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },

  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
      },
    },
  },
);

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: this._id, username: this.username, password: this.password },
      process.env.TOKEN_SECRET_KEY,
      // { expiresIn: 15 * 60 * 1000 },
      { expiresIn: 15 * 60 },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
};

module.exports = mongoose.model('User', UserSchema);
