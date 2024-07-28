const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publish_date: { type: Date, required: true },
  publisher: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: {
    type: String,
    default: 'https://plus.unsplash.com/premium_photo-1675490808284-7c8b3c1f0795?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  genre: { type: String, required: true }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
