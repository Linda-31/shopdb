const express = require('express');
const app = express();
const cors = require('cors');
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/DressShop",{})
.then(() => console.log('Success'))
.catch(err => console.error('Error:', err));
app.use(cors());
app.use(express.json());
require('dotenv').config();



const PORT = process.env.PORT || 3000;

const user=require("./Router/user");
app.use("/api/users", user);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});