const crypto = require('crypto');
const UserModel = require('./../models/user');

const postUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await new UserModel({ username, password, email }).save();
    const token = await user.generateToken();
    res.json({
      message: 'User has been successfully created',
      data: { user, token: `Bearer ${token}` },
    });
  } catch (e) {
    const err = e.errmsg || e.msg || e.message;
    if (err.includes('duplicate key error')) return res.status(400).json({ message: 'User already exists' });
    throw new Error(e);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!(await user.verifyPassword(password))) return res.status(400).json({ message: 'Password is incorrect' });
  const token = await user.generateToken();
  res.json({ user, token: `Bearer ${token}` });
};

const logoutUser = async (req, res) => {
  console.log('asdasd', req.user);
  req.logout();
  res.json({ message: 'User logged out successfully' });
};

const forgotPassword = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) res.status(400).json({ message: 'No account with that email exists' });
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();
  // Email sending logic
  res.json({
    message: 'You have been emailed a password reset link',
  });
};

const getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

module.exports = {
  postUser,
  getUsers,
  loginUser,
  logoutUser,
  forgotPassword,
};
