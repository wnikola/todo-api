const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../utils/validation');

const router = express.Router();

// Fetch users
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return console.error(err);
    res.status(200).json(users);
  });
});

// Registration
router.post('/', async (req, res) => {
  // Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error);

  // Check if the email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ success: false, message: 'Email already registered' });

  // Check if the username already exists
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists) return res.status(400).json({ success: false, message: 'Username already taken' });

  // Generate a salt and hash
  bcrypt.hash(req.body.password, 10, (err, password) => {
    if (err) return console.error(err);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: password
    });

    user.save(async err => {
      if (err) return console.error(err);
      const resUser = await User.findOne({ email: req.body.email });
      return res.status(200).json(resUser);
    });
  });
});

// Login
router.put('/', async (req, res) => {
  // Validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error);

  // Find user
  const user = await User.findOne({ $or: [{ email: req.body.login }, { username: req.body.login }] }).select('+password');
  if (!user) return res.status(400).json({ success: false, message: 'User not found' });

  // Check the password
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) return console.error(err);
    result
      ? res.status(200).json({ message: 'Logged in' })
      : res.status(400).json({ status: false, message: 'Wrong password' });
  });
});

module.exports = router;