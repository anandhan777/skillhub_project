const express=require("express");
const router=express.Router();
const multer=require("multer");
const{getMentorProfile,Viewmentorprofile,createMentorProfile,updateMentorProfile,getAllMentors,
    mentorsPerCategory,pendingBookings,MentoraddResources,Mentor_createBusinessIdea,latestReview,
    addStarRating,reviewListing,ratingCalculate,collections,mentorResourceAnalysis,mentorConnectionAnalysis,uploadingSession,uploadedSession,
    viewUploadedSession,deleteSession,connectedFriends
}=require("../controllers/mentorController");
const  protect  = require("../middleware/verifytoken");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/mentor/"),
    filename:(req,file,cb)=>cb(null, Date.now()+"-"+file.originalname)
})
const mentorupload=multer({storage});


router.post("/creatementorprofile",protect,mentorupload.fields([
    { name:"profilePicture", maxCount:1},
    {name:"profileBanner", maxCount:1}]),createMentorProfile);
router.get("/mentorprofile",protect,getMentorProfile);
router.put("/mentorprofileupdate/:id",protect,mentorupload.fields([
    {name:"profilePicture", maxCount:1},
    {name:"profileBanner",maxCount:1}]),updateMentorProfile);
router.get("/getmentors/:id",getAllMentors);
router.get("/mentors-per-category",mentorsPerCategory);
router.get("/pendingbookings/:id",pendingBookings);
router.get("/viewmentorprofile/:id",Viewmentorprofile);
router.post("/addresource_request/:id",mentorupload.single("thumbnail"),MentoraddResources);
router.post("/addbusiness_idea",mentorupload.single("image"),Mentor_createBusinessIdea);
router.post("/addstarrating",addStarRating);
router.get("/listmentorreviews/:id",reviewListing);
router.get("/calculaterating/:id",ratingCalculate);
router.get("/collections/:id",collections);
router.get("/mentorresourceanalysis/:mentorId",mentorResourceAnalysis);
router.get("/mentorconnectionanalysis/:mentorId",mentorConnectionAnalysis);
router.get("/latestreview/:id",latestReview);
router.post("/uploadingsession/:id",mentorupload.single("banner"),uploadingSession);
router.get("/uploadedsession/:id",uploadedSession);
router.get("/viewuploadedsession/:id",viewUploadedSession);
router.delete("/deletesession/:id",deleteSession);
router.get("/connectedfriends/:id",connectedFriends);


module.exports=router;