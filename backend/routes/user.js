const express = require('express');
const router = express.Router(); 
const User = require("../models/user.js");
const { body, validationResult } = require('express-validator');

router.get('/user',async(req,res)=>{
    try {
        const email = req.query.email;
        const user = await User.findOne({email});
        console.log(user)
        res.json(user)
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    
})

router.post("/createUser", [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('username').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
         console.log('success')
         res.json({success:true});

        
    } catch (err) {
        console.log(err);
        res.status(500).json({  error: err.message });
    }
});

router.post("/loginUser", [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
   
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
         let oldUser = await User.findOne({email});
         if(oldUser){
            let passwordTyped = req.body.password;
            let originalPassword = oldUser.password
            if(passwordTyped !=originalPassword){
                // alert('Enter correct password')
               return res.json({success:false})
            }else{
               return res.json({success:true})
            }
         }else{
           return res.json({success:false})
         }
        
         
         
        
    } catch (err) {
        console.log(err);
        res.status(500).json({  error: err.message });
    }
});




module.exports = router;
