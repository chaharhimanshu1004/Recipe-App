import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/User.js';

const router = express.Router();

router.post('/register',async(req,res)=>{
    const {username,password} = req.body;
    const user = await UserModel.findOne({username});
    if(user){
        return res.json({message:"username already exists"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new UserModel({username,password:hashedPassword});
    await newUser.save();
    res.json({message: "New user registered successfully"});
});

router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const user = await UserModel.findOne({username});
    if(!user){
        return res.json({message:"user doesn't exists"});
    }
    const isValidPassword = await bcrypt.compare(password,user.password); // new password kko bi hash, hence dono hashed password same mtlb pass is same
    if(!isValidPassword){
        return res.json({message:"Password doesn't match"})
    }
    const token = jwt.sign({id:user._id},"secret");
    res.json({token,userID:user._id});
})






export {router as userRouter};