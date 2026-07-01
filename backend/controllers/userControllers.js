//usercontroller

const{User,Booking,UserProgress,Connection,Notification, UserProfile,CompletedRoadmap,SavedItem,SessionRegister}=require('../models/Usermodel');
const bcrypt=require('bcryptjs');
const{UpcomingSession, MentorProfile}=require("../models/Mentormodel")
const generateToken=require('../utils/generatetoken');
const { BusinessIdea, Resources,Roadmap } = require('../models/Adminmodel');

//register user
const registerUser=async(req,res)=>{
    const{name,email,password,role}=req.body;
      
        const userexist= await User.findOne({email});
        
        if(userexist){
           return res.status(400).json({message:"user email already exist"});
          }
            const hashedpassword=await bcrypt.hash(password,10);
            const user=await User.create({name,email,password:hashedpassword,role,status:role==="mentor"?"pending":"approved",isVerified:role==="mentor"?false:true });
            if(role==="mentor"){
                return res.status(200).json({message:"mentor registered,awaiting admin approve"});
            }         
            res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id,user.role)
        });
    }
const viewBusinessIdea=async(req,res)=>{
    try{
    const businessIdeas= await BusinessIdea.find();
    if(businessIdeas.length===0){
        return res.status(404).json({message:"nothing here"});

    }
    res.status(200).json(businessIdeas);
    }catch(err){
        res.status(404).json({error:err.message});
    }

res.status(500).json({message:err.message||"internal server error"});

}

const bookingSession=async(req,res)=>{
   
    const{userId,mentorId,date,time,topic,notes}=req.body;
  try{
    const bookingdata=new Booking({userId,mentorId,date,time,topic,notes});
    await bookingdata.save();
    res.status(201).json({message:"booking created",bookingdata});
    
} catch (error) {
    console.error(error);
    res.status(500).json({message: error.message || "internal server error"});
}
}

const showBookings=async(req,res)=>{
    const id=req.params.id;
    const{status,classroomLink}=req.body;
    try{
    const booking=await Booking.findByIdAndUpdate(id,{status:status,link:classroomLink},{new:true,runValidators:true});
    res.status(201).json({message:"booking acccepted",booking});
    }catch(error){
        console.error(error);
        res.status(500).json({messagr:error.message});    
    }

}

const bookingConfirm=async(req,res)=>{
    const id=req.params.id;
    try{
        const booking=await Booking.find({userId:id,status:"approved"}).populate("mentorId");
        if(!booking){
            return res.status(404).json({message:"no booking confirmation found"});
        }
        res.status(200).json(booking);
        }catch(error){
            console.error(error);
            res.status(500).json({error:"failed fetching booking confirmation"});
        }
    }
const deleteBooking=async(req,res)=>{
    const id=req.params.id;
    try{
        const booking=await Booking.findByIdAndDelete(id);
        if(!booking){
            return res.status(404).json({message:"no booking found"});
        }
        res.status(200).json({message:"booking deleted",booking});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed deleting booking"});
    }
}


const learningVideos=async(req,res)=>{
    try{
        const video=await Resources.find({type:"video",status:"approved"});
        if(!video){
            return res.status(404).json({message:"no video found"});
        }
        res.status(200).json(video);
    }catch(error){
        console.error(error);
        res.satus(500).json({error:"video fetching failed"})
    }
}
const learningArticle=async(req,res)=>{
    try{
        const article=await Resources.find({type:"article",status:"approved"});
        if(!article){
            return res.status(404).json({message:"no article found"});
        }
        res.status(200).json(article);
    }catch(error){
        console.error(error);
        res.satus(500).json({error:"article fetching failed"})
    }
}
const learningChecklist=async(req,res)=>{
    try{
        const checklist=await Resources.find({type:"checklist",status:"approved"});
        if(!checklist){
            return res.status(404).json({message:"no checklist found"});
        }
        res.status(200).json(checklist);
    }catch(error){
        console.error(error);
        res.satus(500).json({error:"checklist fetching failed"})
    }
}

const completeStep=async(req,res)=>{
    const userId=req.user._id;
    const {roadmapId,stepId}=req.body;
    try{
        const progress=await UserProgress.findOneAndUpdate(
            {userId,roadmapId},{$addToSet:{
                completedSteps:stepId
            }},
            {returnDocument:'after',upsert:true}
        );
        res.status(200).json({message:"step completed",progress});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"progress added failed"})
    };
}

const getRoadmapProgress=async(req,res)=>{
    try{
    const uId=req.user._id;
    const rId=req.params.id;

    const roadmap=await Roadmap.findById(rId);
    if(!roadmap){
        return res.status(404).json({message:"roadmap not found"});
    }
    const progress=await UserProgress.findOne({userId:uId,roadmapId:rId});
    

    const completedSteps=progress?.completedSteps||[];
    console.log(completedSteps)

    const percentage=(completedSteps.length/roadmap.steps.length)*100;
    console.log(percentage)
    if(percentage===100){
        const data=await CompletedRoadmap.find({userId:uId,completedroadmap:rId});
        if(!data){
           return  await CompletedRoadmap.create({userId:uId,completedroadmap:rId});
        }

        return res.status(200).json({message:"congragulation you successfully completed roadmap",percentage});

    }
    res.status(200).json({completedSteps,percentage});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"roadmap fetching failed"})
    }

}

const connections=async(req,res)=>{
    const {senderId,receiverId}=req.body;
    try{
        const connect=await Connection.create({senderId,receiverId});
        res.status(201).json({message:"new connection"});
        await Notification.create({userId:senderId,title:"connection request",message:"your connection request has ben sent",type:"CONNECTION_REQUEST"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"connection failed"});

    }
}

const connectionRequest=async(req,res)=>{
    const id=req.params.id;
    try{
        console.log(id);
        const request=await Connection.find({receiverId:id}).populate("senderId");
        res.status(200).json(request);
        console.log(request)
    }catch(error){
        console.error(error);
        res.status(500).json({message:"request fetching failed"});
    }
}
const getConnection=async(req,res)=>{
 
    const rid=req.params.rid;
    const userId=req.user._id;
    try{
        const connect=await Connection.findOne({senderId:userId,receiverId:rid})
        if(!connect){
            return res.status(404).json({message:"no connection found"});
        }
        res.status(200).json(connect);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"connection fetching failed"});
    }

}

const connectionAccept=async(req,res)=>{
    const{status}=req.body;
    const {userId,id}=req.params
    try{
        const connect=await Connection.findByIdAndUpdate(id,{status},{new:true});
        res.status(201).json({message:"new connection"});
        await Notification.create({userId:userId,title:"connection accepted",message:"you request has been accepted",type:"CONNECTION_ACCEPTed"})
    }catch(eror){
        console.error(error);
        res.status(500).json({message:"connection request failed"});

    }

}
const connectionReject=async(req,res)=>{
    const{status}=req.body;
    const{userId,id}=req.params;
    try{
        const connect=await Connection.findByIdAndUpdate(id,{status},{new:true});
        await Notification.create({userId:userId,title:"connection rejected",message:"you connnection request has been rejected",type:"CONNECTION_REQUEST"})
        res.status(201).json({message:"new connection"});
    }catch(eror){
        console.error(error);
        res.status(500).json({message:"connection request failed"});

    }

}

const connectedFriends=async(req,res)=>{
    const id=req.params.id;
    try{
        const connect=await Connection.find({ $or:[{senderId:id},{receiverId:id}],
        status:"accept"}).populate("senderId receiverId");
        if(!connect){
            return res.status(404).json({message:"not connections found"});
        }
      
       const UserId=connect.map(m=>m.receiverId._id);
       profile=await MentorProfile.find({mentor:{$in:UserId}}).populate("mentor");
       console.log(profile);
       
       res.status(200).json(profile);
    
  
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:"fetching connection failed"})
    }
}

const searchConnection=async(req,res)=>{
    const search=req.query.search;
    try{
        const users=await MentorProfile.find({fullName:{$regex:search,$options:"i"}}).populate("mentor");
        res.status(200).json(users);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"searching connections failed"});
    }
}

const addsavedResource=async(req,res)=>{
 const {id,sid}=req.params;
    try{
        let res1=await SavedItem.findOne({userId:id})
        if(!res1){
        res1=await SavedItem.create({userId:id,savedResource:[sid],savedIdea:[]});
        res.status(201).json({message:"saved new resource"});
        }else{
            res1=await SavedItem.findOneAndUpdate({userId:id},{$addToSet:{savedResource:sid}});
            res.status(201).json({message:"saved new resource"});
        }

    }catch(error){
        console.error(error);
        res.status(500).json({message:"adding items failed"});
    }
}
const addsavedIdea=async(req,res)=>{
   
    const {id,sid}=req.params;
    try{
        let res1=await SavedItem.findOne({userId:id});
        if(!res1){
       res1=await SavedItem.create({userId:id,savedIdea:[sid],savedResource:[]});
       res.status(201).json({message:"saved new idea"});
        }else{
            res1=await SavedItem.findOneAndUpdate({userId:id},{$addToSet:{savedIdea:sid}});
            res.status(201).json({message:"saved new idea"});
        }

    }catch(error){
        console.error(error);
        res.status(500).json({message:"adding items failed"});
    }
}
const getAllnotification=async(req,res)=>{
    const userId=req.user._id;
    try{
        const data=await Notification.find({userId:userId}).sort({createdAt:-1});
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"failed fetching notification"});

    }
}

const deleteMessage=async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    try{
        const data=await Notification.findByIdAndDelete(id);
        res.status(200).json({message:"delete messsage successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"failed deleting message"});
    }
}

const saveditems=async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await SavedItem.findOne({userId:id}).populate("savedIdea").populate("savedResource");
        if(!data){
            res.status(404).json({message:"no items found"});
        }
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed to fetch"});
    }
}
const selectIdea=async(req,res)=>{
    const category=req.body.category;
    
    const id=req.params.id;
    
    try{
        await UserProfile.findOneAndUpdate({user:id},{category:category},{new:true});
        res.status(200).json({message:'successfully choose new roadmap'});
    }catch(error){
        console.error(error);
        res.satus(500).json({message:"failed to choose new roadmap"})
    }
}
const viewUploadedSession=async(req,res)=>{
    try {
        const data=await UpcomingSession.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed fetching session"})
        
    }
}
const sessionRegister=async(req,res)=>{
    const{id,sid}=req.params;
    console.log(req.params);
    try {
        let data=await SessionRegister.findOne({sessionId:sid});
        if(!data){
            data=await SessionRegister.create({sessionId:sid,userId:[id]});
        } else{
            data=await SessionRegister.findOneAndUpdate({sessionId:sid},
                {$addToSet:{userId:id}},{new:true}
            );
        }
        res.status(200).json({message:'session registration successfull',data});
    }catch (error) {
        console.error(error);
        res.status(500).json({message:'session registartion failed'});
    }
}
const registerStatus=async(req,res)=>{
  const id=req.params.id;
    try {
       const data=await SessionRegister.find({userId:id})
       res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed fetching"})
        
    }
}

module.exports={registerUser,selectIdea,viewBusinessIdea,bookingSession,showBookings,connections,connectionRequest,connectionAccept,connectionReject,connectedFriends,
     learningArticle,learningVideos,learningChecklist,completeStep,getRoadmapProgress,getAllnotification,deleteMessage,bookingConfirm,
     addsavedIdea,addsavedResource,saveditems,viewUploadedSession,sessionRegister,registerStatus,getConnection,deleteBooking,searchConnection
};
    