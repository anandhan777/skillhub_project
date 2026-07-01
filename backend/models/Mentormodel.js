const mongoose=require("mongoose");
const{User}=require("../models/Usermodel");
const {category}=require("../models/Adminmodel");

const MentorProfileSchema=new mongoose.Schema({
    mentor:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    fullName:{type:String,required:true},
    profilePicture:{type:String},
    profileBanner:{type:String},
    bio:{type:String,maxlength:500},
    phone:{type:String},
    location:{type:String},
    skills:{type:[String]},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    experience:{type:String,required:true},
    menteesConnected:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    feedback:[{mentorsId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
               comment:{type:String},
               createdAt:{type:Date,default:Date.now()}}],

},{timestamps:true});

const MentorProfile=mongoose.model("MentorProfile",MentorProfileSchema);

const StarratingSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    mentorId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    rating:{type:String,enum:[1,2,3,4,5],default:1},
    review:{type:String,enum:['poor_experience','fair_experience','good_experience','verygood_experience','excellent_experience'],default:"poor_experience"},
    feedback:{type:String}

},{timestamps:true});

const StarRating=mongoose.model("StarRating",StarratingSchema);


const UpcomingSessionSchema = new mongoose.Schema({
  title: { type: String, },
  banner:{type:String}, // Session title
  description: { type: String },           // Details about the session
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Mentor who created it
  sessionLink: { type: String,}, // Classroom/Zoom/Meet link
  startTime: { type: String},     // When session starts
  endTime: { type: String },                       // Optional end time
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // Admin verification
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const UpcomingSession = mongoose.model("UpcomingSession", UpcomingSessionSchema);

module.exports={MentorProfile,StarRating,UpcomingSession};