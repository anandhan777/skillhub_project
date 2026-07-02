const passport=require("passport");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
require("dotenv").config();

const {User}=require("../models/Usermodel");

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,

  callbackURL:`${process.env.VITE_API_URL}/api/auth/google/callback`
},
async(accessToken,refreshToken,Profile,done)=>{
  try {
    let user=await User.findOne({email:Profile.emails[0].value})
    if(!user){
      user=await User.create({name:Profile.displayName,
        email:Profile.emails[0].value,
        googleId:Profile.id
      });
    }
    return done(null,user)
  } catch (error) {
    return done(error,null)
    
  }
}));