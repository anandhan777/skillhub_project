//userroutes
const express=require('express');
const router=express.Router();
const {registerUser,completeStep,viewBusinessIdea,bookingSession,getRoadmapProgress,connectionRequest,connectionAccept,
    showBookings,learningVideos,learningArticle,learningChecklist,connections,connectedFriends,getAllnotification,
deleteMessage,bookingConfirm,addsavedResource,addsavedIdea,saveditems,selectIdea,getConnection,deleteBooking,
connectionReject,viewUploadedSession,sessionRegister,registerStatus,searchConnection}=require('../controllers/userControllers');
const { getProfile, createProfile, updateProfile,getAllUsers,showProfile } = require("../controllers/profileController");
// const verifyToken=require('../middleware/verifytoken');
const  protect  = require("../middleware/verifytoken");
const multer=require("multer");
const { SessionRegister } = require('../models/Usermodel');
const upload=multer({dest:'uploads/user'});



router.post('/register',registerUser);

// router.get('/me',verifyToken,Userme);
// router.post('/uprofile',UserPro);

//multer setup
const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/user/"),
    filename:(req,file,cb)=>cb(null,Date.now()+"-"+file.originalname)
})
const userupload=multer({storage});

// Decide redirect (frontend uses this)
router.get("/profileview", protect, getProfile);
router.get("/profileview/:id",showProfile);


// Create profile
router.post("/profilecreate", protect,userupload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "profileBanner", maxCount: 1 }]),createProfile);

// Update profile
router.put("/profileupdate/:id", protect,userupload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "profileBanner", maxCount: 1 }]), updateProfile);
router.get("/getAllUsers", getAllUsers);
router.get("/viewbusiness",viewBusinessIdea);
router.post("/sessionbooking",bookingSession);
router.put("/showbooking/:id",showBookings);
router.get("/videos",learningVideos);
router.get("/articles",learningArticle);
router.get("/checklists",learningChecklist);
router.post("/complete-step",protect,completeStep);
router.get("/getprogress/:id",protect,getRoadmapProgress);
router.post("/sendconnection",connections);
router.get("/connectionrequest/:id",connectionRequest);
router.put("/connectionaccept/:userId/:id",connectionAccept);
router.put("/connectionreject/:userId/:id",connectionReject);

router.get("/connectedpeople/:id",connectedFriends);
router.get("/getallnotification",protect,getAllnotification);
router.delete("/deletemsg/:id",deleteMessage);
router.get("/bookingconfirm/:id",bookingConfirm);
router.post("/addsavedresource/:id/:sid",addsavedResource);
router.post("/addsavedidea/:id/:sid",addsavedIdea);
router.get("/saveditems/:id",saveditems);
router.put("/selectnewidea/:id",selectIdea);
router.get("/viewuploadedsession",viewUploadedSession);
router.post("/sessionregister/:id/:sid",sessionRegister);
router.get("/viewsessionregister/:id",registerStatus);
router.get("/getconnection/:rid",protect,getConnection);
router.delete("/deletebooking/:id",deleteBooking);
router.get("/searchconnection",searchConnection);

module.exports = router;
