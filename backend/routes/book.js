const express = require('express');
const router = express.Router(); 
const Book = require("../models/book.js");
const { body, validationResult } = require('express-validator');
const Purchase = require('../models/purchase.js');

router.post("/create", [
    body('title').isString().withMessage('Title must be a string'),
    body('publisher').isString().withMessage('Publisher must be a string'),
    body('author').isString().withMessage('Author must be a string'),
    body('genre').isString().withMessage('Genre must be a string'),
    body('publish_date').isInt().withMessage('Publish date must be a number'),
], async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const { title, publish_date, publisher, author, genre, coverImage } = req.body;
    const book = await Book.create({
      title,
      publish_date,
      publisher,
      author,
      genre,
      coverImage: coverImage && coverImage.trim() !== '' ? coverImage : 'https://plus.unsplash.com/premium_photo-1675490808284-7c8b3c1f0795?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    });

        console.log('success');
        res.json({ success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/published',async(req,res)=>{
    try {
        const books = await Book.find();
        res.json(books);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
router.post('/purchased',async(req,res)=>{
    try{
        const {email,mrp} =req.body;
       const purchasedBooks = await Purchase.create({
        email,
        mrp
       })
       console.log('success');
        res.json({ success: true });
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;
