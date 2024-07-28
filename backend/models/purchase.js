const mongoose = require('mongoose');

const Purchase = mongoose.model('Purchase', new mongoose.Schema({
    mrp: Number,
   email : String,
    date: { type: Date, default: Date.now }
  }));

module.exports = Purchase;