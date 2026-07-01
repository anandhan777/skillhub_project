const mongoose=require("mongoose");

const ChatSchema= new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    message:{type:String,default:""},
    image:{type:"String",default:""},
    date:{type:Date,default:Date.now()}
},{timestamps:true});

const Chat=mongoose.model("Chat",ChatSchema);
module.exports={Chat};