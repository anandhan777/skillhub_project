const express=require('express');
const connectDB =require('./config/db');
const userRoutes=require('./routes/userRoutes');
const authRoutes=require('./routes/authRoutes');
const adminRoutes=require('./routes/adminRoutes');
const mentorRoutes=require("./routes/mentorRoutes");
const chatRoutes=require("./routes/chatRoutes");
const {initSocket}=require("./socket/socket");
const cors=require('cors');
const http=require("http");
const passport=require("passport");
const dns=require("dns");
require("./config/passport");

require('dotenv').config();
dns.setServers([`1.1.1.1`],[`8.8.8.8`]);


connectDB();

const app=express();

app.use(cors({
     origin: [
    "http://localhost:5173",                
    "https://skillhub-project-bay.vercel.app"    
  ],
  credentials: true  
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(passport.initialize());

app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/mentor",mentorRoutes);

app.get('/',(req,res)=>{
    res.send("API is running");
});


//connect socket io logic
const server=http.createServer(app);
initSocket(server);



// io.on("connection",(socket)=>{
//     console.log("user connect",socket.id);

//     //private msg event
//     socket.on("privateMessage",async({from,to,message})=>{
//         try{
//         //save to db
//         const chat=new Chat({from,to,message});
//         await chat.save();
//         //deliver to receiptent if online
//         io.to(to).emit("privateMessage",chat)
//          //optianlly send back to sender for confirmation
//          socket.emit("privateMessage",chat);
//         }catch(err){
//             console.log("error saving messsage",err);
//         }

//     });
//     socket.on("disconnect",()=>{
//        console.log("use disconnected successfully",socket.id);
//     });
// });



const PORT =process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`server is running on the ${PORT}`);
});