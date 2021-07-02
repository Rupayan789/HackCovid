const mongoose=require('mongoose');
const schema=mongoose.Schema;
const UserSchema=new schema({
    name:{
        _id:mongoose.Schema.Types.ObjectId,
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true,
        min:6,
        max:50
    }
},
{
    timestamps:{
    createdAt:'created_at'
    }})

module.exports=mongoose.model('user',UserSchema);