const mongoose=require("mongoose");

const businessIdeaSchema = new mongoose.Schema({
  title: {type: String,required: true,},
  description: {type: String,required: true,},
  category: {type:mongoose.Schema.Types.ObjectId, ref:"Category",required: true,},
  requiredSkills: {type: [String],default: [],},
  estimatedCost: {type: String,required: true,},
  tags: {type: [String],default: []},
  
  
  status: {type:String,enum:["pending","approved","rejected"],default:"pending"},
  imageUrl: {type: String, default: null,},
  createdAt: {type: Date,default: Date.now,
  },
});

// Indexes for search/filter
businessIdeaSchema.index({ category: 1 });
businessIdeaSchema.index({ tags: 1 });
businessIdeaSchema.index({ status: 1 });

const BusinessIdea = mongoose.model("BusinessIdea", businessIdeaSchema);

const categorySchema=new mongoose.Schema({
  name:{type:String,required:true,unique:true},
  description:{type:String},
},{timestamps:true});

const Category=mongoose.model("Category",categorySchema);

const roadmapstepSchema=new mongoose.Schema({
  title:{type:String,required:true},
  description:{type:String},
  checklist:{type:[String]},
  resources:{type:[String]},
  mentortips:{type:String},
});

const roadmapSchema=new mongoose.Schema({
  name:{type:String,required:true},
  category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
  steps:[roadmapstepSchema],
  status:{type:String,enum:["draft","publish"],default:"draft"}
},{timestamps:true});


const Roadmap=mongoose.model("Roadmap",roadmapSchema);

const ResourceSchema=new mongoose.Schema({
  title:{type:String,required:true},
  description:{type:String},
  type:{type:String,enum:["video","article","checklist"],required:true},
  videoUrl:{type:String},
  thumbnail:{type:String},
  articleFile:{type:String},
  articleLink:{type:String},
  author:{type:String},
  ownername:{type:String},
  checklistItems:[{type:String}],
  uploadedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  status:{type:String,enum:["pending","approved","rejected"],default:"pending"},
},{timestamps:true});

const Resources=mongoose.model("Resources",ResourceSchema);

const feedbackSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",},
    subject: {type:String},
    category: {type: String,enum: ["Bug","Feature","Roadmap","Mentor","General",],},
    priority: {type: String,enum: ["Low","Medium","High","Critical",],},
    description:{type:String},
    status: {type: String,enum: ["Pending","In Progress","Resolved","Rejected",],default: "Pending",},
  },
  {timestamps: true,}
);
const Feedback=mongoose.model("Feedback",feedbackSchema);

module.exports= {BusinessIdea,Category,Roadmap,Resources,Feedback}
