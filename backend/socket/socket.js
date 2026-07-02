const {Server} =require("socket.io");
const {Chat}=require("../models/Chatmodel");

let io;
const onlineUsers={};
const initSocket=(server)=>{
    io=new Server(server,{
        cors:{
            origin: [
    "http://localhost:5173",                
    "https://skillhub-project-bay.vercel.app/"    
  ],
            methods:["GET","POST"],
            credentials:true,
        }
    });
    io.on("connection",(socket)=>{
        console.log("user connected",socket.id);

        socket.on("setup",(userId)=>{
            // console.log("setup event received");
            onlineUsers[userId]=socket.id;
            console.log("online users:",onlineUsers);
        });
        socket.on("send_message", async(data)=>{
           try{
            const newMessage=await Chat.create({senderId:data.senderId,receiverId:data.receiverId,message:data.text});
            // const senderSocketId=onlineUsers[data.senderId];
            // if(senderSocketId){
            //     io.to(senderSocketId).emit("sender_message",newMessage);
            // }
            const receiverSocketId=onlineUsers[data.receiverId];
            console.log(receiverSocketId)
            if(receiverSocketId){
                io.to(receiverSocketId).emit("receive_message",newMessage);
            }
            socket.emit("sender_message",newMessage);
        }catch(error){
            console.log("error saving message",error);

            };
        });

        socket.on("disconnect",()=>{
            console.log("user disconnected",socket.id);
            for(const userId in onlineUsers){
                if(onlineUsers[userId]===socket.id){
                    delete onlineUsers[userId];
                    break;
                }
            }
            console.log("online users:",onlineUsers);
        });

    });
};
const getIO=()=>{
    if(!io){
        throw new Error("socket.io not initilized");

    }
    return io;

};

module.exports={initSocket,getIO};