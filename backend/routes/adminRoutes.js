const express=require('express');
const router=express.Router();
const {pendingResource,approveMentorResource,rejectMentorResource}=require('../controllers/mentorController');
const {aproveMentor,rejectMentor,getMentors,getAllUsers,deleteUser,createBusinessIdea,addCategory,
    getCategory,createRoadmap,updateCategory,totalUsers,totalPendingMentors,totalRoadmaps,totalBusinessIdeas,getCategorizedUsers,
    userperCategory,getRoadmaps,addResources,deleteCategory,globalNotification,addFeedback,viewFeedback,deleteFeedback,searchUser}=require('../controllers/adminController');
const multer=require("multer");
const upload=multer({dest:'uploads/adminupload'});
const  protect  = require("../middleware/verifytoken");



const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/adminupload"),
    filename:(req,file,cb)=>cb(null, Date.now()+"-"+file.originalname)
})
const adminupload=multer({storage});

router.post("/addresources",adminupload.single("thumbnail"),addResources);
router.post("/createIdea",adminupload.single("image"),createBusinessIdea);
router.post("/admin/aprove/:id",aproveMentor);
router.post("/admin/reject/:id",rejectMentor);
router.get("/admin/pending-mentors",getMentors);
router.get("/admin/view_users",getAllUsers);
router.delete("/admin/delete_user/:id",deleteUser);
router.post("/addcategory",addCategory);
router.get("/getcategory",getCategory);
router.post("/createroadmap",createRoadmap);
router.put("/updatecategory/:id",updateCategory);
router.get("/users-per-category",userperCategory);
router.get("/total-users",totalUsers);
router.get("/total-pending-mentors",totalPendingMentors);
router.get("/total-roadmaps",totalRoadmaps);
router.get("/total-business-ideas",totalBusinessIdeas);
router.get("/getroadmaps",protect,getRoadmaps);
router.delete("/deletecategory/:id",deleteCategory);
router.get("/globalnotification",globalNotification);
router.post("/addfeedback",protect,addFeedback);
router.get("/viewfeedback",viewFeedback);
router.delete("/deletefeedback/:id",deleteFeedback);
router.get("/pendingresource",pendingResource);
router.put("/approvedresource/:id",approveMentorResource);
router.put("/rejectresource/:id",rejectMentorResource);
router.get("/searchusers",searchUser);
router.get("/getcategorizedusers/:id",getCategorizedUsers);



module.exports=router;