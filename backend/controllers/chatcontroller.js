const {Chat} =require("../models/Chatmodel");

//save a new message

//get chat history between 2 users
const getMessage=async(req,res)=>{
    const{user1,user2}=req.params;
    try{
    // const myId=req.user._id;
    // const receiverId=req.params.receiverId;
    
    const chats=await Chat.find({$or:[{senderId:user1,receiverId:user2},{senderId:user2,receiverId:user1}]}).sort({createdAt:1});
    console.log(chats);
    res.json(chats);
}catch(err){
    console.error("error fetching caht history:",err);
    res.status(500).json({error:err.message});
}
};

const deleteMessage=async(req,res)=>{
    const {msg_id}=req.params;
    try{
        const deletemsg=await Chat.findByIdAndDelete({_id:msg_id});
        res.status(200).json({message:"msg deleted"});

    }catch(err){
        console.error(err);
        res.status(500).json({message:"msg deletion failed"});
    }


}

module.exports={getMessage,deleteMessage};