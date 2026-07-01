const {MentorProfile,StarRating,UpcomingSession}=require("../models/Mentormodel");
const {User,Booking,Notification,Connection, SessionRegister,UserProfile}=require("../models/Usermodel");
const {Resources,BusinessIdea,}=require("../models/Adminmodel");




const getMentorProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const profile = await MentorProfile.findOne({ mentor: userId }).populate("mentor").populate("category");
  

    if (!profile) {
      return res.status(404).json({ message: "No profile found" });
    }

    res.json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create profile
const createMentorProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      fullName,
      phone,
      location,
      bio,
      skills,
      experience, // match frontend
      category,
    } = req.body;
    await User.findByIdAndUpdate(userId,{isProfileCreated:true});
    const existing = await MentorProfile.findOne({ mentor: userId });
    if (existing) {
      return res.status(400).json({ message: "Profile already exists" });
      
    }
    
    const newProfile = new MentorProfile({
      mentor: userId,
      fullName,
      phone,
      location,
      skills: skills ? skills.split(",") : [],
      bio,
      experience, // save correctly
      category,
      profilePicture: req.files["profilePicture"]
        ? `/uploads/mentor/${req.files["profilePicture"][0].filename}`
        : null,
      profileBanner: req.files["profileBanner"]
        ? `/uploads/mentor/${req.files["profileBanner"][0].filename}`
        : null,
    });

    await newProfile.save();
    res.status(201).json({ message: "Profile created", profile: newProfile });
  } catch (error) {
    console.error(error); // log actual error
    res.status(500).json({ message: "Server error" });
  }
};

// Update profile
const updateMentorProfile = async (req, res) => {
  try {
    const {id}=req.params;
   const {
      fullName,
      phone,
      location,
      skills,
      interests,
      bio,
      experience, // match frontend
      privacy,
      category,
    } = req.body;
    
    const profile = await MentorProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    } 

    profile.fullName=fullName || profile.fullName;
    profile.phone=phone || profile.phone;
    profile.bio=bio || profile.bio;
    profile.location=location || profile.location;
    profile.skills=skills ? skills.split(",") : profile.skills;
    profile.experience=experience || profile.experience;
    profile.category=category || profile.category;
    
    if(req.files["profilePicture"]){
      profile.profilePicture=`/uploads/mentor/${req.files["profilePicture"][0].filename}`;
    }
    if(req.files["profileBanner"]){
      profile.profileBanner=`/uploads/mentor/${req.files["profileBanner"][0].filename}`;
    }

    

   
    await profile.save();

    res.json({ message: "Profile updated", profile });
 } catch (error) {
  console.error("Update profile error:", error); // <-- log full error
  res.status(500).json({ message: "Server error", error: error.message });
}
};

const getAllMentors=async(req,res)=>{
  const id=req.params.id;
  try{
  const data=await MentorProfile.find({mentor:{$ne:id}}).populate("category").populate("mentor");
  if(!data){
    res.status(404).json({error:"no mentor found"});
  }
  res.status(200).json(data);
  }catch(err){
    console.error(err);
    res.status(500).json({message:"server error",error:err.message});

  }

}

const pendingBookings=async(req,res)=>{
  const id=req.params.id;
  try{
    const bookings=await Booking.find({mentorId:id}).populate("userId","name email");
    if(!bookings){
      res.status(404).json({message:"no bookings found"});
    }
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"server error",error:err.message});
  }
}


const Viewmentorprofile=async(req,res)=>{
  const id=req.params.id;
  try{
    const mentor=await MentorProfile.findById(id).populate("mentor");
    if(!mentor){
      return res.status(404).json({message:"mentor not found"});
    }
    res.status(200).json(mentor);
  }catch(error){
    console.error(error);
    res.status(500).json({message:"mentor profile not found"});
  }
}


const mentorsPerCategory=async (req, res) => {
  try {
    const result = await MentorProfile.aggregate([
      {
        $group: {
          _id: "$category",   // group mentors by category
          count: { $sum: 1 }  // count mentors in each category
        }
      },
      {
        $lookup: {
          from: "categories",       // join with Category collection
          localField: "_id",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },
      {
        $project: {
          categoryName: "$category.name",
          count: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch mentor distribution" });
  }
};

const MentoraddResources=async(req,res)=>{
  const id=req.params.id;
    const {title,description,type,videoUrl,articleLink,author,ownername}=req.body;
    const thumbnail=req.file?`/uploads/mentor/${req.file.filename}`:null;
    console.log(thumbnail);
    const updatestatus="pending";
     
    try{
        const data=await Resources.create({title,description,type,videoUrl,ownername,status:updatestatus,
            thumbnail,articleLink,author,uploadedBy:id,checklistItems:req.body.checklistItems||[]
        });
        res.status(201).json({message:"resource uploaded successfully"})
        await Notification.create({userId:id,title:"new material",message:"new resource has been added",type:"NEW_RESOURCE",isGlobal:true});
    }catch(error){
        console.error("resources uploaded failed",error);
        res.status(500).json({message:"uploading failed"})
    }

}
const Mentor_createBusinessIdea = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      requiredSkills,
      estimatedCost,
      tags,
     
    } = req.body;
    const updatestatus="pending";

    // image upload handled via middleware (e.g., Multer)
    const imageUrl = req.file ? `/uploads/mentor/${req.file.filename}` : null;

    const newIdea = new BusinessIdea({
      title,
      description,
      category,
      status:updatestatus,
      requiredSkills:requiredSkills? requiredSkills.split(","):[],
      estimatedCost,
      tags:tags? tags.split(","):[],
    
      
      imageUrl,
    
      
    });

    await newIdea.save();
    res.status(200).json(newIdea);
    await Notification.create({title:"new bussiness idea",message:`new ${title} idea is uploaded look `,type:"NEW_BUSINESS_IDEA",isGlobal:true})
  } catch (error) {
    console.error("Error creating business idea:", error); // full stack trace
  res.status(500).json({ error: error.message });
  }
};
const pendingResource=async(req,res)=>{
  try{
    const data=await Resources.find({status:"pending"});
    res.status(200).json(data);
  }catch(error){
    console.error(error);
    res.status(500).json({message:"failed fetching pending request"});
  }
}

const approveMentorResource=async(req,res)=>{
  
  const id=req.params.id;
  try{
    const data=await Resources.findByIdAndUpdate(id,{status:"approved"});
    res.status(200).json({message:"resource approved"})
    await Notification.create({title:"new resource uploaded",message:"your resource is approved",type:"NEW_RESOURCE"})
  }catch(error){
    console.error(error);
    res.status(500).json({message:"resource approved failed"});
  }
}
const rejectMentorResource=async(req,res)=>{
  const id=req.params.id;

  try{
    const data=await Resources.findByIdAndUpdate(id,{status:"rejected"});
    res.status(200).json({message:"resource rejected"});
     await Notification.create({title:"resource invalid",message:"your resource is rejected",type:"NEW_RESOURCE"})
  }catch(error){
    console.error(error);
    res.status(500).json({message:"resource rejection failed"});
  }
}

const addStarRating=async(req,res)=>{
  const {mentorId,userId,rating,review,feedback}=req.body;
  try{
    const data=await StarRating.create({userId,mentorId,rating,review,feedback});
    res.status(201).json({message:"response saved succesfully"})
  }catch(error){
    console.error(error);
    res.status(500).json({message:"failed saving response"})
  }
}
const reviewListing=async(req,res)=>{
  const id=req.params.id;
  try{
    const data=await StarRating.find({mentorId:id}).populate("userId");
    res.status(200).json(data);
  }catch(error){
    console.error(error);
    res.status(500).json({message:"failed fetching reviews"});
  }
}

const ratingCalculate=async(req,res)=>{
  const id=req.params.id;
  try{
    const data=await StarRating.find({mentorId:id});
    const totalrating=data.reduce((sum,item)=>sum +parseInt(item.rating),0);
    const totalreviews=data.length;
    const average=totalreviews>0?(totalrating/totalreviews).toFixed(1):0;
    res.status(200).json({totalrating,totalreviews,average});
 

  }catch(error){
    console.error(error);
    res.status(500).json({message:"failed fetching rate calculation"})
  }
}
const latestReview=async(req,res)=>{
  const id=req.params.id;
  try{
  const review=await StarRating.find({mentorId:id}).sort({createdAt:-1}).limit(2).populate("userId");
  res.status(200).json(review);
}catch(error){
  console.error(error);
  res.status(500).jaon(error);
}
}
const collections=async(req,res)=>{
  const id=req.params.id;
  try{
    const connection=await  Connection.find({$or:[{senderId:id},{receiverId:id}]}).countDocuments();
    const resource=await  Resources.find({uploadedBy:id}).countDocuments();
    res.status(200).json({connection,resource});
    console.log(connection,resource);
  }catch(error){
    console.error(error);
    res.status(500).json({message:"failed fetching collection"});
  }
}

const mentorResourceAnalysis=async(req,res)=>{
  // router.get("/mentor/:mentorId/analytics", async (req, res) => {
    const mentorId=req.params.id;
  try {
    // const mentorId = new mongoose.Types.ObjectId(req.params.mentorId);

    // Aggregate resources uploaded by this mentor
    const stats = await Resources.aggregate([
      { $match: { uploadedBy: mentorId, status: "approved" } }, // only approved resources
      {
        $group: {
          _id: "$type", // group by type (video/article/checklist)
          count: { $sum: 1 }
        }
      }
    ]);
    console.log(stats)

    // Count total uploads
    const totalUploads = await Resources.countDocuments({
      uploadedBy: mentorId,
      status: "approved"
    });

    // Trend: uploads per month
    const monthlyTrend = await Resources.aggregate([
      { $match: { uploadedBy: mentorId, status: "approved" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalUploads,
      byType: stats,
      monthlyTrend
    });
    console.log(monthlyTrend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const mentorConnectionAnalysis=async(req,res)=>{
  const mentorId=req.params.id;
   try {
    

    // Count accepted connections where mentor is receiver
    const totalConnections = await Connection.countDocuments({
      receiverId: mentorId,
      status: "accept"
    });

    // Trend: connections per month
    const monthlyTrend = await Connection.aggregate([
      { $match: { receiverId: mentorId, status: "accept" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalConnections,
      monthlyTrend
    });
    console.log(monthlyTrend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const uploadingSession=async(req,res)=>{
  const {title,description,sessionLink,date,startingTime,endingTime}=req.body;
  const banner=req.file?`/uploads/mentor/${req.file.filename}`:null;
  console.log(req.body);
  console.log(banner);
  const id=req.params.id;
  try {
    const user=await UpcomingSession.create({title:title
      ,description:description
      ,mentorId:id,
      sessionLink:sessionLink,
      date:date,
      startTime:startingTime,
      endTime:endingTime,
      createdAt:date,
      banner:banner
    })
    res.status(200).json({message:"uploaded successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"failed creating session"})
    
  }
}
const viewUploadedSession=async(req,res)=>{
  const id=req.params.id;
  try{
    const data=await UpcomingSession.find({mentorId:id});
    res.status(200).json(data);
  }catch(error){
    console.error(error);
    res.status(500).json({message:"error fetching session"});
  }
}
const uploadedSession=async(req,res)=>{
  const id=req.params.id;
  try {
    const data=await UpcomingSession.find({mentorId:id});
    const dataid=data.map(m=>m._id);
    const data1=await SessionRegister.find({sessionId:{$in:dataid}}).populate("userId sessionId");
    res.status(200).json(data1);
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"failed fetching uploading session"});
    
  }
}
// const connectedFriends=async(req,res)=>{
//     const id=req.params.id;
//     try{
//         const connect=await Connection.find({ $or:[{senderId:id},{receiverId:id}],
//         status:"accept"}).populate("senderId receiverId");
//         if(!connect){
//             return res.status(404).json({message:"not connections found"});
//         }
//         const targetUserId = id.toString() === connect.senderId.toString() 
//         ? connect.receiverId 
//         : connect.senderId;

//          const profile = await UserProfile.findO({ user: targetUserId }).populate("user");
//         res.status(200).json(profile);
        
//     }catch(error){
//         console.error(error);
//         res.status(500).json({message:"fetching connection failed"})
//     }
// }
const connectedFriends=async(req,res)=>{
    const id=req.params.id;
    try{
        const connect=await Connection.find({ $or:[{senderId:id},{receiverId:id}],
        status:"accept"}).populate("senderId receiverId");
        if(!connect){
            return res.status(404).json({message:"not connections found"});
        }
      
       const UserId=connect.map(m=>m.receiverId._id);
       const [mentorProfiles, userProfiles] = await Promise.all([
      MentorProfile.find({ mentor: { $in: UserId } }).populate("mentor"),
      UserProfile.find({ user: { $in: UserId } }).populate("user")
    ])
    const profiles = [...mentorProfiles, ...userProfiles]; 
    res.status(200).json(profiles);     
    }catch(error){
        console.error(error);
        res.status(500).json({message:"fetching connection failed"})
    }
}
const deleteSession=async(req,res)=>{
  const id=req.params.id;
  try {
    const data=await UpcomingSession.findByIdAndDelete(id);
    res.stats(200).json({message:"deleted successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).status({message:"failed deleting"});
    
  }

}



module.exports = { latestReview,reviewListing,addStarRating,getMentorProfile,pendingResource,approveMentorResource,rejectMentorResource,
  Mentor_createBusinessIdea,Viewmentorprofile,MentoraddResources, mentorsPerCategory, createMentorProfile,uploadingSession,deleteSession,
   updateMentorProfile,getAllMentors,pendingBookings,ratingCalculate,collections,mentorResourceAnalysis,mentorConnectionAnalysis,uploadedSession,
  viewUploadedSession,connectedFriends};
