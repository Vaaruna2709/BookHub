const mongoose = require('mongoose');

const Purchase = mongoose.model('Purchase', new mongoose.Schema({
    mrp: Number,
    book:Object,
    email : String,
    date: { type: Date, default: Date.now }
  }));

module.exports = Purchase;