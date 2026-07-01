//usermodel
const mongoose =require('mongoose');
const {Category,Resources,BusinessIdea}=require("../models/Adminmodel");
const {UpcomingSession}=require("../models/Mentormodel")
const {Roadmap}=require("../models/Adminmodel")

const userSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true,required:true},
    password:{type:String},
    googleId:{type:String},
    avatar:{type:String},
    role:{type:String,enum:['user','mentor','admin'],default:'user'},
    status:{type:String,enum:['pending','approved','rejected'],default:'pending'},
    isVerified:{type:Boolean,default:false},
    isProfileCreated:{type:Boolean,default:false},
    isOnline:{type:Boolean,default:false}
  },{timestamps:true}
);

const User=mongoose.model('User',userSchema);

const userProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String },
    phone: { type: String },
    location: { type: String },
    skills: { type: [String] },
    interests: { type: [String] },
    experience: { type: String },
    privacy: { type: String },
    category:{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    profilePicture: { type: String },
    profileBanner: { type: String },
    savedBusinessIdeas:[{type:String}],
  },
  { timestamps: true }
);


const UserProfile=mongoose.model("UserProfile", userProfileSchema);

const BookingSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  mentorId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  date:{type:Date,required:true},
  topic:{type:String},
  notes:{type:String},
  status:{type:String,enum:["pending","approved","rejected"],default:"pending"},
  link:{type:String,required:true,default:"nill"},

},{timeStamps:true});
const Booking=mongoose.model("Booking",BookingSchema);


const userProgressSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  roadmapId:{type:mongoose.Schema.Types.ObjectId,ref:"Roadmap"},
  completedSteps:[{type:mongoose.Schema.Types.ObjectId}]
});

const UserProgress=mongoose.model("UserProgress",userProgressSchema);

const connectionSchema=new mongoose.Schema({
  senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  status:{type:String,enum:['pending','accept','reject'],default:"pending"},
},{timeStamps:true});

const Connection=mongoose.model("Connection",connectionSchema);


const notificationSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
    title: {type: String,required: true,},
    message: {type: String,required: true,},
    type: {type: String,enum: [
        "PROFILE_UPDATE",
        "PASSWORD_CHANGE",
        "NEW_SESSION",
        "NEW_ROADMAP",
        "NEW_FEEDBACK",
        "NEW_RESOURCE",
        "NEW_CATEGORY",
        "NEW_BUSINESS_IDEA",
        "ROADMAP_COMPLETED",
        "CHECKLIST_COMPLETED",
        "CONNECTION_REQUEST",
        "CONNECTION_ACCEPTED",
        "SYSTEM",
      ],
      required: true,
    },
    isRead: {type: Boolean,default: false,},
    isGlobal:{type:Boolean,deafult:false},
    relatedId: {type: mongoose.Schema.Types.ObjectId,default: null, },
    redirectUrl: {type: String,default: "",},
  },{timestamps: true,}
);

const Notification= mongoose.model(
  "Notification",
  notificationSchema
);

const completedRoadmapSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  completedroadmap:{type:mongoose.Schema.Types.ObjectId,ref:"Roadmap",required:true},


},{timestamps:true});

const CompletedRoadmap=mongoose.model("CompletedRoadmap",completedRoadmapSchema);

const savedItemsSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  savedResource:[{type:mongoose.Schema.Types.ObjectId,ref:"Resources"}],
  savedIdea:[{type:mongoose.Schema.Types.ObjectId,ref:"BusinessIdea"}],

},{timeStamps:true});

const SavedItem=mongoose.model("savedItem",savedItemsSchema);

const sessionRegisterSchema=new mongoose.Schema({
  userId:[{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}],
  sessionId:{type:mongoose.Schema.Types.ObjectId,ref:"UpcomingSession",required:true},
  status:{type:String,enum:['pending','accept'],default:"accept"},
  
},{timestamps:true})

const SessionRegister=mongoose.model("SessionRegister",sessionRegisterSchema);

module.exports={User,UserProfile,Booking,UserProgress,Connection,Notification,CompletedRoadmap,SavedItem,SessionRegister};