const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  }
});

const Users = module.exports = mongoose.model('users', UserSchema);
