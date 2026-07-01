// controllers/profileController.js
// const UserProfile = require("../models/UserProfile");
const { User,UserProfile,Notification } = require("../models/Usermodel");


// Get profile (used to decide redirect)
const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("name email role");
    const profile = await UserProfile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: "No profile found" });
    }

    res.json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create profile
const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      fullName,
      phone,
      location,
      skills,
      interests,
      experienceLevel, // match frontend
      privacy,
      category,
    } = req.body;
    await User.findByIdAndUpdate(userId,{isProfileCreated:true});
    const existing = await UserProfile.findOne({ user: userId });
    if (existing) {
      return res.status(400).json({ message: "Profile already exists" });
      
    }
    
    const newProfile = new UserProfile({
      user: userId,
      fullName,
      phone,
      location,
      skills: skills ? skills.split(",") : [],
      interests: interests ? interests.split(",") : [],
      experience: experienceLevel, // save correctly
      privacy,
      category,
      profilePicture: req.files["profilePicture"]
        ? `/uploads/user/${req.files["profilePicture"][0].filename}`
        : null,
      profileBanner: req.files["profileBanner"]
        ? `/uploads/user/${req.files["profileBanner"][0].filename}`
        : null,
    });

    await newProfile.save();
    res.status(201).json({ message: "Profile created", profile: newProfile });
  } catch (error) {
    console.error(error); // log actual error
    res.status(500).json({ message: "Server error" });
  }
};

const showProfile=async(req,res)=>{
  const id=req.params.id;
  try{
    const data=await UserProfile.findById(id).populate("user");
    if(!data){
       return res.status(404).json({message:"user profile not found"});
    
    }
    res.status(200).json(data);
  }catch(error){
    console.error(error);
    res.status(500).json({error:"pprofile not found"});
  }
}

// Update profile
const updateProfile = async (req, res) => {
  try {
    const userId=req.user._id;
    const {id}=req.params;
   const {
      fullName,
      phone,
      location,
      skills,
      interests,
      experienceLevel, // match frontend
      privacy,
      category,
    } = req.body;
    
    const profile = await UserProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    } 

    profile.fullName=fullName || profile.fullName;
    profile.phone=phone || profile.phone;
    profile.location=location || profile.location;
    profile.skills=skills ? skills.split(",") : profile.skills;
    profile.interests=interests ? interests.split(",") : profile.interests;
    profile.experienceLevel=experienceLevel || profile.experienceLevel;
    profile.privacy=privacy || profile.privacy;
    profile.category=category || profile.category;
    
    if(req.files["profilePicture"]){
      profile.profilePicture=`/uploads/user/${req.files["profilePicture"][0].filename}`;
    }
    if(req.files["profileBanner"]){
      profile.profileBanner=`/uploads/user/${req.files["profileBanner"][0].filename}`;
    }

    

   
    await profile.save();

    res.json({ message: "Profile updated", profile });
    await Notification.create({userId:userId,title:"Profile update",message:"profile updated successfully",type:"PROFILE_UPDATE"});
    res.status(201).json({message:"profile updated successfully"});
 } catch (error) {
  console.error("Update profile error:", error); // <-- log full error
  res.status(500).json({ message: "Server error", error: error.message });
}
};

const getAllUsers=async(req,res)=>{
 try{
  
  const users= await UserProfile.find({_id:{$ne:req.params.id}}).populate("user");
  if( users.length!==0){
    res.status(200).json(users);
  }
}catch(err){
    res.status(404).json({message:err});
  }

}

module.exports = { getProfile, createProfile, updateProfile,getAllUsers,showProfile };
