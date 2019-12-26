const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema(
  {
    title: { type: String },
    description: { type: String },
    author: { type: String },
    rating: { type: String },
    published: { type: String }
  }
);

module.exports = mongoose.model('Books', bookModel);
