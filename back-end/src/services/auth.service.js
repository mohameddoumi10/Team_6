const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const ApiError = require('../utils/ApiError');

const registerUser = async (userData) => {
  const { 
    full_name, email, password, phone_number, role, 
    store_name, store_location, store_photos,
    skills, portfolio_url
  } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'Email exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userObject = {
    full_name,
    email,
    password: hashedPassword,
    phone_number,
    role
  };

  if (role === 'business') {
    if (store_name) userObject.store_name = store_name;
    if (store_location) userObject.store_location = store_location;
    if (store_photos) userObject.store_photos = store_photos;
  }

  if (role === 'freelancer') {
    if (skills) userObject.skills = skills;
    if (portfolio_url) userObject.portfolio_url = portfolio_url;
  }

  const user = await User.create(userObject);
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      role: user.role
    },
    token
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new ApiError(401, 'Wrong credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new ApiError(401, 'Wrong credentials');
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      is_verified: user.is_verified
    },
    token
  };
};

module.exports = {
  registerUser,
  loginUser
};
