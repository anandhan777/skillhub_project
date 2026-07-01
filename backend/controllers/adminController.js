const { User,UserProfile,Notification } = require("../models/Usermodel");
const {Resources,Feedback}=require("../models/Adminmodel.js");

// const { MentorProfile } = require("../models/MentorModel");



const getMentors=async(req,res)=>{
    try{
        const mentor=await User.find({role:"mentor",status:"pending"});
        res.json(mentor);
    }catch(err){
        res.status(400).json(err);
    }
}


const aproveMentor= async(req,res)=>{
    try{
    const mentor=await User.findById(req.params.id);
    if(!mentor || !mentor.role==="mentor"){
        return res.status(404).json({error:"mentor not found"});
    }
    mentor.status="approved";
    mentor.isVerified=true;
    await mentor.save();
    res.status(200).json({message:"admin approved successfully"})
}
catch(err){
    res.status(400).json({error:err.message});
}
}

const rejectMentor=async(req,res)=>{
    try{
        const mentor=await User.findById(req.params.id);
        if(!mentor || !mentor.role==="mentor"){
            return res.status(404).json({error:"mentor not found"});
        }
        mentor.status="rejected";
        mentor.isVerified=false;
        await mentor.save();
        res.status(200).json({message:"admin rejected successfully"})
    }catch(err){
        res.status(400).json({error:err.messsage});
    }
}

const getAllUsers=async(req,res)=>{
    const users=await User.find({role:"user"});
    if (!users){
        res.status(404).json({message:"no users"});
    }
    res.status(200).json(users);
}

const deleteUser=async(req,res)=>{
    const user= await User.findByIdAndDelete(req.params.id);
    if(!user){
        res.status(404).json({message:"user not found"});
    }
    res.status(200).json({message:"user ddeleted successfully"});
}


const{BusinessIdea,Roadmap} =require( "../models/Adminmodel.js");
const {Category} =require("../models/Adminmodel.js");

// Create new Business Idea
const createBusinessIdea = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      requiredSkills,
      estimatedCost,
      tags,
     
    } = req.body;

    // image upload handled via middleware (e.g., Multer)
    const imageUrl = req.file ? `/uploads/adminupload/${req.file.filename}` : null;

    const newIdea = new BusinessIdea({
      title,
      description,
      category,
      requiredSkills:requiredSkills? requiredSkills.split(","):[],
      estimatedCost,
      tags:tags? tags.split(","):[],
    
      
      imageUrl,
      status:"approved",
    });

    await newIdea.save();
    res.status(200).json(newIdea );
    await Notification.create({title:"new bussiness idea",message:`new ${title} idea is uploaded look `,type:"NEW_BUSINESS_IDEA",isGlobal:true})
  } catch (error) {
    console.error("Error creating business idea:", error); // full stack trace
  res.status(500).json({ error: error.message });
  }
};




const addCategory=async(req,res)=>{
    try{
    const {name,description}=req.body;
    const category=new Category({name,description});
    await category.save();

    res.status(200).json(category);
    await Notification.create({title:"new category",message:"new category has been addded check out",type:"NEW_CATEGORY",isGlobal:true});
    }catch(error){
        console.error("creating ccategory error",error);
    res.status(500).json({error:error.message});
    }

}
const updateCategory=async(req,res)=>{
    const {id}=req.params;
   
    const {name,description}=req.body;
    try{
        const res=await Category.findByIdAndUpdate(id,{name,description},{new:true,runValidators:true});
     if(!res){
        res.status(404).json({message:"not found"})
    }
    res.status(200).json({message:"category updated successfully"});
   
        
    }catch(error){
        console.error(error);
        
        res.status(500).json({message:"updation failed successfuly"})

    }
}

const getCategory=async(req,res)=>{
    try{
        const category=await Category.find();
        if(!category){
            res.status(404).json({message:"no category found"});
        }
        res.status(200).json(category);

    }catch(err){
        console.error(err);
        res.status(500).json({error:err.message});
    }
}
const deleteCategory=async(req,res)=>{
    const {id}=req.params;
    console.log(req.params);
    try{
        const data=await Category.findByIdAndDelete(id);
        res.status(200).json({message:"deleted category"});

    }catch(error){
        console.error(error);
        res.status(500).json({messagee:"failed ddeleting category"});
    }
}

const createRoadmap=async(req,res)=>{
    const {name,category,steps}=req.body;
    try{
    
    console.log(req.body);
    const roadmap=new Roadmap({name,category,steps});
    await roadmap.save();

    res.status(201).json(roadmap);
    await Notification.create({title:"new roadmap",message:"new roadmap has been added",type:"NEW_ROADMAP",isGlobal:true})
    }
    catch(err){
        console.error("roadmap creation failed",err)
        res.status(500).json({error:"error saving roadmap"});
    }


}

const getRoadmaps=async(req,res)=>{
    const userid=req.user._id;
    try{
        const user=await UserProfile.findOne({user:userid}).populate("category");
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        const roadmap=await Roadmap.findOne({category:user.category._id}).populate("category");
        if(!roadmap){
            return res.status(404).json({message:"no roadmap found"});
        }
        res.status(200).json(roadmap);
    }catch(error){
        console.error(error);
        res.status(500).json({error:error.message});
    }
}

const addResources=async(req,res)=>{
    const {title,description,type,videoUrl,articleLink,author,ownername}=req.body;
    const thumbnail=req.file?`/uploads/adminupload/${req.file.filename}`:null;
    console.log(thumbnail);
     
    try{
        const data=await Resources.create({title,description,type,videoUrl,ownername,
            thumbnail,articleLink,author,checklistItems:req.body.checklistItems||[],status:"approved"
        });
        res.status(201).json({message:"resource uploaded successfully"})
        await Notification.create({title:"new material",message:"new resource has been added",type:"NEW_RESOURCE",isGlobal:true});
    }catch(error){
        console.error("resources uploaded failed",error);
        res.status(500).json({message:"uploading failed"})
    }

}
const getCategorizedUsers=async(req,res)=>{
    const id=req.params.id;
    try {
        const data=await UserProfile.find({category:id}).populate("category");
        res.status(200).json(data);
    }catch (error) {
        console.error(error);
        res.status(500).json({messae:"failed fetching users"});
        
    }
}

const globalNotification=async(req,res)=>{
    try{
        const data=await Notification.find({isGlobal:true});
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed fetch global"});
    }
}

// Approve or Reject Idea
// export const updateIdeaStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body; // approved, rejected, published

//     const updatedIdea = await BusinessIdea.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     res.json({ message: "Status updated", idea: updatedIdea });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// route: GET /api/admin/users-per-category
const userperCategory=async (req, res) => {
  try {
    const result = await UserProfile.aggregate([
      {
        $group: {
          _id: "$category", // group by category ObjectId
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: "$category"
      },
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
    res.status(500).json({ error: "Failed to fetch user counts" });
  }
};
// route: GET /api/admin/mentors-per-category
const totalUsers=async(req,res)=>{
    try{
        const res1=await User.countDocuments();
        res.status(200).json({ totalUsers: res1 });
    } catch (error) {
        console.error("Error fetching total users:", error);
        res.status(500).json({ error: error.message }); 
    }
}

const totalPendingMentors=async(req,res)=>{
    try{
        const res1=await User.countDocuments({role:"mentor",status:"pending"});
        res.status(200).json({ totalPendingMentors: res1 });
    } catch (error) {
        console.error("Error fetching total pending mentors:", error);
        res.status(500).json({ error: error.message }); 
    }
}

const totalRoadmaps=async(req,res)=>{
    try{
        const res1=await Roadmap.countDocuments();   
        res.status(200).json({ totalRoadmaps: res1 });
    }catch(error){
        console.error("Error fetching total roadmaps:", error);
        res.status(500).json({ error: error.message }); 
    }
}

const totalBusinessIdeas=async(req,res)=>{
    try{
        const res1=await BusinessIdea.countDocuments();  
        res.status(200).json({ totalBusinessIdeas: res1 });
    }catch(error){
        console.error("Error fetching total business ideas:", error);
        res.status(500).json({ error: error.message }); 
    }
}
const addFeedback=async(req,res)=>{
    const id=req.user._id;
    const{subject,category,priority,description}=req.body;
    try{
        const data=await Feedback.create({userId:id,subject,category,priority,description});
        res.status(201).json({message:"new feedback addded"})
         await Notification.create({title:"feedback",message:"your feedback has been sent",type:"NEW_FEEDBACK"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed sending feedback"});
    }
}

const viewFeedback=async(req,res)=>{
    try{
        const data=await Feedback.find().populate("userId");
        if(!data){
            return res.status(404).json({message:"no feedback found"})
        }
        res.status(200).json(data)
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed fetching feedback"})
    }
}
const deleteFeedback=async(req,res)=>{
    const {id}=req.params;
    try{
        const data=await Feedback.findByIdAndDelete(id);
        res.status(200).json({message:"feedback deleted successfully"})
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed deleting feedback"})
    }
}
const searchUser=async(req,res)=>{
    const {search}=req.query;
    try {
        const data=await UserProfile.find({$or:[{fullName:{$regex:search,$options:"i"}},{email:{$regex:search,$options:"i"}}]}).populate("user");
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed searching user"});
        
    }
}

 module.exports={aproveMentor,userperCategory,totalUsers,totalPendingMentors,totalRoadmaps,totalBusinessIdeas,getCategorizedUsers,
    rejectMentor,getMentors,getAllUsers,deleteUser,getRoadmaps,globalNotification,addFeedback,viewFeedback,deleteFeedback,
    createBusinessIdea,addCategory,getCategory,createRoadmap,updateCategory,addResources,deleteCategory,searchUser};