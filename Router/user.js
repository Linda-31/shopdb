const User = require("../Modules/usermodule");

const express=require("express");
const router=express.Router();

 router.get('/', async (req, res) => {
 const users=await User.find();
 console.log(users);
 res.json(users);
});


router.post('/', async (req, res) => {
 console.log('Request Body:', req.body);
const { fullName, email, password } = req.body;

 const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = new User({ fullName, email, password });
  await newUser.save();

  res.status(201).json({ message: 'Signup successful', user: newUser });
});
module.exports=router;