require('dotenv').config();

const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/marketplace',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key'
};

module.exports = env;
