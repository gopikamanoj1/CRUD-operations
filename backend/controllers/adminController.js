import asyncHandler from "express-async-handler";
import { notFound } from "../middleware/errorMiddleware.js";
import fs from 'fs';
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import admin from "../models/adminModel.js";
import bcrypt from "bcrypt";

 
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const adminUser = await admin.findOne({ email });
  console.log(adminUser,"adminUser")

  if (adminUser && (await bcrypt.compare(password, adminUser.password))) {
    const { _id, name, email, is_admin ,password} = adminUser;
    const token = generateToken(res, _id);
    console.log(token,"token")

    res.status(201).json({
      _id,
      name,
      email,    
      is_admin, 
      token,
      password
    });  
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});



const registerUser=asyncHandler (async(req,res)=>{
  const {name,email,password}=req.body
 const useExits=await User.findOne({email})
 if (useExits) {
   res.status(400)
  throw new Error ('User alredy exits')
 }
 const user =await User.create({
  name,
  email,
  password
 })
 if (user) {
let token=   generateToken( user._id);

  res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      image:user.image,
      token
  })
  
 }else{
  res.status(400)
  throw new Error ('invalid user data')   

 }
})


 
const adminView = asyncHandler(async (req, res) => {
  try {
   
    const user = await User.find().exec();
    
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




  
  const userDelete = asyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      
      const result = await User.deleteOne({ _id: id }); // Pass the filter object {_id: id}
  
      if (result.deletedCount > 0) {
        // Check if user was found and removed
        res.status(200).json({ message: 'User deleted successfully' })
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message }); // Send error response with status code 500
    }
  });
  
 

  const editUserData = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      console.log('Request Body:', req.body);

  
      const user = await User.findById(id);
  
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }
  
      // Update user data
      user.name = name || user.name;
      user.email = email || user.email;
  
      if (password) {
        // If a new password is provided, hash and update it
        user.password = await bcrypt.hash(password, 10);
      }
  
      const updatedUser = await user.save();
  
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


export {adminView,adminLogin,registerUser,userDelete,editUserData}