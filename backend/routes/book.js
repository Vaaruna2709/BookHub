const express = require('express');
const router = express.Router(); 
const Book = require("../models/book.js");
const { body, validationResult } = require('express-validator');

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

        const book = await Book.create({
            title: req.body.title,
            publish_date: req.body.publish_date,
            publisher: req.body.publisher,
            author: req.body.author,
            coverImage: req.body.coverImage ? req.body.coverImage :"https://plus.unsplash.com/premium_photo-1675490808284-7c8b3c1f0795?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            genre: req.body.genre
        });

        console.log('success');
        res.json({ success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
