const mongoose = require('mongoose');

const Review = mongoose.model('Review', new mongoose.Schema({
    rating: Number,
    review:String,
    isbn:String,
    username : String,
    date: { type: Date, default: Date.now }
  }));

module.exports = Review;