const express = require('express');
const app = express();
const cors = require('cors');
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/DressShop",{})
.then(() => console.log('Success'))
.catch(err => console.error('Error:', err));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

app.use(cors());
app.use(express.json());
require('dotenv').config();



const PORT = process.env.PORT || 3000;

const user=require("./Router/user");
const product = require("./Router/product");

app.use("/api/users", user);
app.use("/api/products", product);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});