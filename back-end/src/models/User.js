const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['customer', 'business', 'freelancer'],
    required: true
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  store_name: {
    type: String
  },
  store_location: {
    type: String
  },
  store_photos: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  portfolio_url: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
