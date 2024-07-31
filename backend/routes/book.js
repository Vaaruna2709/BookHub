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
    body('email').isEmail()
], async (req, res) => {
    try {
        // console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  
    
    const {coverImage,title,author,publish_date,publisher,genre,email} = req.body;
    console.log(coverImage,title,author,publish_date,publisher,genre)
    const book = await Book.create({
      title,
      publish_date,
      publisher,
      author,
      email,
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
        const email = req.query.email;
        // console.log(email)
        const books = await Book.find({email});
        // console.log("books",books)
        res.json(books);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
router.post('/purchased',async(req,res)=>{
    try{
        const {email,mrp,book} =req.body;
        
        const { title } = book; 
        const existingPurchase = await Purchase.findOne({
            email: email,
            'book.title': title
          });
        
        console.log(title,existingPurchase);
        if (existingPurchase) {
            // console.log("existingPurchase")
            return res.status(400).json({ error: 'Book already purchased' });
        }
       const purchasedBooks = await Purchase.create({
        email,
        mrp,
        book
       })
       
        res.json({ success: true });
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
})
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { email } = req.query;
  
      const book = await Book.findById(id);
  
      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }
  
      
      if (book.email !== email) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }
  
     
      await Book.findByIdAndDelete(id);
      const books = await Book.find({email})
  
      res.json({success:true,books});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
router.get('/purchased',async(req,res)=>{
    try{
        const {email} = req.query;
        const purchasedBooks = await Purchase.find({email});
        // console.log("purchasedBooks")
        res.json(purchasedBooks);
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;
