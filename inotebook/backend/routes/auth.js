const express=require('express');
const router=express.Router();

const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
const JWT_SEC="fwwsfisabi$$$";

const fetchuser=require('../middleware/login');

//Creating a 'user' using POST request
router.post('/createuser',[
    body("email",'Enter a valid email').isEmail(),
    body("Name",'Name should atleast 3 characters ').isLength({min:3}),
    body("password").isLength({min:5})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {// If an error is found
      return res.status(400).json({errors:errors.array});
    }
    try{
        let user=await User.findOne({email:req.body.email})
        let success=false
        if(user){
            success=false
            return res.status(400).json({success,errors:"A user with this email already exists"});
        }
        const salt=await bcrypt.genSalt(10);//hashing the password
        const secPass=await bcrypt.hash(req.body.password,salt);
        user=await User.create({//Creating and sending a user to the database
            Name:req.body.Name,
            email:req.body.email,
            password:secPass,//passing the hashed password
        })
        
        const data={
            user:{
                id:user.id,
            }
        }
        const authToken=jwt.sign(data,JWT_SEC);//Creating the AuthToken
        // res.json(user);
        console.log(authToken);
        res.json({success:true,authToken});
    }
    catch(error){
        console.log(error.message);
    }
})

//Authenticating a user
router.post('/loginuser',[
    body("email",'Enter a valid email').isEmail(),
    body("password",'Cannot be blank').isLength({min:5}).exists()
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {// If an error is found
      return res.status(400).json({errors:errors.array});
    }

    try{
        const{email,password}=req.body;
        let user=await User.findOne({email});
        success=false
        if(!user){
            success=false
            console.log(req.body.password+" "+user.password);
            return res.status(400).json({errors:"Login with the correct credentials"});
        }
        const password_comp=await bcrypt.compare(password,user.password);
        if(password_comp==false){
            success=false
            return res.status(400).json({errors:"Login with the correct credentials"});
        }
        const payload={
            user:{
                id:user.id,
            }
        }
        const authToken=jwt.sign(payload,JWT_SEC);
        res.send({success:true,authToken})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).send("Internal Server Error");
    }
})

// Route 3:Showing details of the logged in user
router.post('/getuser',fetchuser,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {// If an error is found
      return res.status(400).json({errors:errors.array});
    }
    try{
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
    } 
    catch(error){
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

module.exports=router;
