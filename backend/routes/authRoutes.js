//authroutes
const express=require('express');
const passport =require("passport");
const jwt=require("jsonwebtoken");
const router=express.Router();
const {loginUser}=require('../controllers/authController');
const generateToken =require("../utils/generatetoken");
const protect=require("../middleware/verifytoken");
router.post('/login',loginUser);

//step 1 redirect to google login
router.get("/google",passport.authenticate("google",{scope:["profile","email"],session:false,})  );
router.get("/google/callback",
    passport.authenticate("google",{session:false,failureRedirect:"/login"}),
    async(req,res)=>{
        const token=jwt.sign({id:req.user._id,role:req.user.role},process.env.JWT_SECRET,{expiresIn:"7d",});

        res.redirect(`http://localhost:5173/google-success?token=${token}`);
    }
    
)





module.exports=router;