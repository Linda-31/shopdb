const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    lastName:{type:String},
    gender:{type:String},
    mobile: {type:String},
    deliveryAddress: {type:String},
    status: {type: String,enum: ['Active', 'Inactive'],default: 'Active'},
    image: { type: String},
    joinedAt: { type: Date, default: Date.now }

});
module.exports = mongoose.models.User || mongoose.model('User', userSchema);