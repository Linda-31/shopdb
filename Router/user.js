const User = require("../Modules/usermodule");
const bcrypt = require("bcryptjs");
const express=require("express");
const router=express.Router();

 router.get('/', async (req, res) => {
 const users=await User.find();
 console.log(users);
 res.json(users);
});


router.post('/signup', async (req, res) => {

try {

req.body.password = await bcrypt.hash(req.body.password, 10);

const { fullName, email, password } = req.body;

 const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }


  const newUser = new User({ fullName, email, password});
  await newUser.save();

  res.status(201).json({ message: 'Signup successful', user: newUser });
} catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }}
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "❌ User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
      return res.status(401).json({ message: "❌ Incorrect password" });
    }

    res.status(200).json({ message: "✅ Login successful", user: { fullName: user.fullName, email: user.email, _id:user._id } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports=router;