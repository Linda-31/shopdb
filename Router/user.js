const User = require("../Modules/usermodule");

const express=require("express");
const router=express.Router();

 router.get('/', async (req, res) => {
 const users=await User.find();
 console.log(users);
 res.json(users);
});

router.post('/', async (req, res)=>{
     const userdata=new User(req.body);
     const result= await userdata.save();
      res.json(result);
});

module.exports=router;