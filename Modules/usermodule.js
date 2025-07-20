const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    lastName:{type:String, required:true},
    gender:{type:String, required:true},
    mobile: {type:String, required:true},
    deliveryAddress: {type:String, required:true},
    status: {type: String,enum: ['Active', 'Inactive', 'Pending'],default: 'Active'},
    joinedAt: { type: Date, default: Date.now }

});
module.exports = mongoose.models.User || mongoose.model('User', userSchema);