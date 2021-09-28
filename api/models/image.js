const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  url: {
    type: String,
    required: [true, 'Image URL required'],
  },
  tags: {
    type: Schema.Types.Array,
    default: []
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  publisherId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Publisher Id required'],
  },
  uploadDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('images', imageSchema);
