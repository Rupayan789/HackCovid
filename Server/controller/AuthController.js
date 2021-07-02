const bcrypt=require('bcrypt');
const validator=require('validator')
const jwt=require('jsonwebtoken')
const User=require('../model/user')

module.exports={
    register:async (req,res)=>{
        try
        {
            const {name,email,password,confirmPassword}=req.body;
            //checking if email is a valid one
            if(!validator.isEmail(email))
            return res.status(500).json({message:"Please enter a valid email"})
            //checking if password matches with confirm password
            if(password!==confirmPassword)
            {
                console.log(password,"  ",confirmPassword);
                return res.status(500).json({message:"Password don't matches"});
            }
            //checking if already an user exists
            const user=await User.find({email:email});
            if(user.length)
            {
                console.log(user)
                return res.status(500).json({message:"Already an user exists with this email"})
            }
            
            const hashedPassword=await bcrypt.hash(password,10);

            const newUser=await new User({
                name:name,
                email:email,
                password:hashedPassword
            })
            await newUser.save();
            return res.status(200).json({user:newUser});

        }
        catch(err){
            return res.status(404).json({
                message:err.message
            })
        }
    },
    login:async (req,res)=>{
        try
        {
            const {email,password}=req.body;
            //checking if user exist with this email
            const user=await User.find({email:email});
            if(!user.length)
            return res.status(500).json({message:"No user found"});
            //comparing password
            if(!(bcrypt.compare(password,user[0].password)))
            return res.status(500).json({message:"Wrong Credentials"});
            const token=await jwt.sign({name:user[0].name,email:user[0].email,password:user[0].password},process.env.SECRET_KEY,{expiresIn:"1h"})
            return res.status(200).json({
                message:"User successfully logged in",
                user:{
                    id:user[0]._id,
                    name:user[0].name,
                    email:user[0].email
                },
                token:token
            })
        }
        catch(err)
        {
            res.status(500).json({message:err.message})
        }
        
    }
}