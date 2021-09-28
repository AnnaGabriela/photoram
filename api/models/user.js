const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User name required'],
  },
  email: {
    type: String,
    required: [true, 'User email required'],
  },
  imageURL: {
    type: String,
  }
});

module.exports = mongoose.model('users', userSchema);
