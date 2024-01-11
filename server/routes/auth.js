const express = require('express')
const mongoose  = require('mongoose')
const router = express.Router()
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const requireLogin = require('../middleware/requireLogin');


router.post('/signup' , (req , res)=>{
    const {name , email , password , pic} = req.body
    if(!email || !password || !name)
    {
        return res.status(422).json({error:"Please add all the fields"});
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser)
        {
            return res.status(422).json({error:"User already exist with that email"})
        }

        bcrypt.hash(password , 5)
        .then(hashedpassword=>{
            const user = new User({
                name,
                email,
                password:hashedpassword,
                pic
            })
    
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err);
            })
        })
        })
       
    .catch(err=>{
        console.log(err);
    })


})

router.post('/signin' , (req , res)=>{
    const {email , password} = req.body
    if(!email || !password) {
        return res.status(422).json({error:"Please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"Invalid Email or password"})
        }
        else
        {
            bcrypt.compare(password , savedUser.password)
            .then(doMatch=>{
                if(doMatch)
                {
                    const token = jwt.sign({_id:savedUser._id} , JWT_SECRET)
                    const {_id , name , email , follower , following , pic   } = savedUser
                    res.json({token , user: {_id , name ,  email , follower , following  , pic  }});
                    // res.json({message:"Successfully logged in"})   
                }
                else {
                    res.status(422).json({error:"Invalid email or password"})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})
module.exports = router