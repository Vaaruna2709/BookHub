const express = require('express');
const router = express.Router();
const Review = require("../models/review");
const { body, validationResult } = require('express-validator');

router.get("/:isbn",async(req,res)=>{
  try{
    const isbn = req.params.isbn;
    let reviews = await Review.find({isbn});
    res.json(reviews)
  }catch(error){
    res.json(error)
  }
   
})


router.post("/:id", [
  body('rating').isInt(),
  body('review').isLength({ min: 4,max:15}),
  body('username').isLength({ min: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, rating, review } = req.body;
    const isbn = req.params.id; // Use ISBN from URL params
    console.log(username, rating, review, isbn);
    
    const newReview = await Review.create({
      username,
      rating,
      review,
      isbn
    });

    console.log('success');
    res.status(201).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
