//approutes.jsx
import React from 'react'
import {Routes,Route} from 'react-router-dom'
//layout
import HomeLayout from '../Layouts/HomeLayout'
import AdminLayout from '../Layouts/AdminLayout'
import UserLayout from '../Layouts/UserLayout'
//page
import Homepage from '../pages/Home/Homepage'
import Userpage from '../pages/User/Userpage'
import Adminpage from '../pages/Admin/Adminpage'
import Mentorpage from '../pages/Mentor/Mentorpage'
import UserProfileForm from '../pages/User/Userprofilecreation'
import Userprofileupdate from '../pages/User/Userprofileupdate'
import UserProfile from '../pages/User/UserProfile'
import Login from '../pages/Home/Login'
import Signup from '../pages/Home/Signup'
import MentorLayout from '../Layouts/MentorLayout'
import Userprofilecreation from '../pages/User/Userprofilecreation'
import Businessidea from '../pages/User/Businessidea'
import Roadmap from '../pages/User/Roadmap'
import Mentornotification from '../pages/Admin/Mentornotification'
import Admin_viewuser from '../pages/Admin/Admin_viewuser'
import Profile from '../pages/User/Profile'
import Add_BusinessIdea from "../pages/Admin/Add_BusinessIdea"
import Admin_dashboard from "../pages/Admin/Admin_dashboard"
import User_dashboard from "../pages/User/User_dashboard"
import UNotificationPage from '../pages/User/User_notification'
import LearningResources from '../pages/User/User_learning'
import MentorSection from '../pages/User/User_viewmentors'
import VideoResources from '../pages/User/Videos'
import ArticleResources from '../pages/User/Article'
import RoadmapForm from '../pages/Admin/RoadmapForm'
import Addcategory from '../pages/Admin/Addcategory'
import Mentorprofilecreation from '../pages/Mentor/Mentorprofilecreation'
import Mentorprofileview from '../pages/Mentor/mentorprofileview'
import Mentorprofile from '../pages/Mentor/Mentorprofile'
import Mentorprofileupdate from '../pages/Mentor/mentorprofileupdate'
import MentorList from '../pages/Admin/Viewmentors'
import Chatpage from '../pages/User/Chatpage'
import ChatLayout from '../pages/User/Chat'
import StepDetails from '../pages/User/view_stepdetails'
import BookingForm from '../pages/User/BookingForm'
import MentorDashboard from '../pages/Mentor/MentorDashboard'
import ResourceForm from '../pages/Admin/Add_resources'
import UserTable from '../pages/Admin/Admin_viewuser'
import ViewUserProfile from '../pages/User/ViewUserProfile'
import ViewMentorprofile from '../pages/Admin/View_mentorprofile'
import ConnectionRequest from "../components/Common/ConnectionRequest"
import ConnectedPeople from '../pages/User/ConnectedPeople'
import MNotificationPage from '../pages/Mentor/Mnotification'
import UFeedbackreport from '../pages/User/UFeedbackreport'
import MFeedbackReport from '../pages/Mentor/MFeedbackReport'
import ViewFeedbacks from '../pages/Admin/View_feedback'
import Checklist from '../pages/User/Checklist'
import Mentor_businessIdea from '../pages/Mentor/Mentor_businessIdea'
import About from '../pages/Home/About'
import Category from '../pages/Home/Category'
import Mentor from '../pages/Home/Mentor'
import MChatLayout from '../pages/Mentor/Mentor_chat'
// import ChatPage from '../pages/User/Chat'

import {AnimatePresence,motion} from "framer-motion"
import { useLocation } from 'react-router-dom'
import Mentor_resource from '../pages/Mentor/Mentor_resource'
import Mentor_viewmentor from '../pages/Mentor/Mentor_viewmentor'
import Mentor_connections from '../pages/Mentor/Mentor_connections'
import MentorStarRating from '../pages/User/Mentor_star_rating'
import Review_listing from '../pages/Mentor/Review_listing'
import ResourceAnalysisChart from '../pages/Mentor/ResourceAnalysisChart'
import AuthSuccess from '../pages/Home/AuthSuccess'
import CTASection from '../pages/Home/CallToAction'
import FAQSection from '../pages/Home/FAQ'
import UploadingSession from '../pages/Mentor/UploadingSession'
import UpcomingSessions from '../pages/User/View_upcomingSession'
import SessionCard from "../pages/Mentor/View_session"
import CategoryUserTable from '../pages/Admin/Categorized_users'

const AppRoutes = () => {
    const currentUser=localStorage.getItem("token");
    const location=useLocation();

   const  pagevariants={
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
       
    }
    const pagevariants1={
        initial:{opacity:0,y:50},
        animate:{opacity:1,y:0},

    }
  return (
    <div>
        <AnimatePresence mode="wait">
         <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomeLayout/>}>
                <Route index element={<Homepage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/about" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><About/></motion.div>}/>
                <Route path="/category" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><Category/></motion.div>}/>
                <Route path="/mentorsection" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><Mentor/></motion.div>}/>
                <Route path="/google-success" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><AuthSuccess/></motion.div>}/>
                <Route path="/calltoaction" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><CTASection/></motion.div>}/>
                <Route path="/faq" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><FAQSection/></motion.div>}/>
            </Route>
            <Route path="/admin" element={<AdminLayout/>}>
          
               
                  <Route index element={<Admin_dashboard/>}/>
                  <Route path="/admin/addidea" element={<Add_BusinessIdea/>}/>
                <Route path="/admin/mentornotification" element={<Mentornotification/>}/>
                <Route path="/admin/view_user" element={<Admin_viewuser/>}/>
                <Route path="/admin/roadmapform" element={<RoadmapForm/>}/>
                <Route path="/admin/addcategory" element={<Addcategory/>}/>
                <Route path="/admin/viewmentors" element={<MentorList/>}/>
                <Route path="/admin/addresource" element={<ResourceForm/>}/>
                <Route path="/admin/viewusers" element={<UserTable/>}/>
                <Route path="/admin/viewusers/viewuserprofile/:id" element={<ViewUserProfile/>}/>
                <Route path="/admin/viewfeedback" element={<ViewFeedbacks/>}/>
                <Route path="/admin/categorizedusers/:id" element={<CategoryUserTable/>}/>
               
            </Route>
            <Route path="/user" element={<UserLayout/>}>
                <Route index element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><Userpage/></motion.div>}/>
                <Route path="/user/dashboard" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><User_dashboard/></motion.div>}/>
                <Route path="/user/profile/:id" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><UserProfile/></motion.div>}/>
                <Route path="/user/profileme" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><Profile/></motion.div>}/>
                <Route path="/user/profilecreate" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><Userprofilecreation/></motion.div>}/>
                <Route path="/user/profileupdate/:id" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><Userprofileupdate/></motion.div>}/>
                <Route path="/user/user_business" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><Businessidea/></motion.div>}/>
                <Route path="/user/roadmap" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><Roadmap/></motion.div>}/>
                <Route path="/user/notification" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><UNotificationPage/></motion.div>}/>
                <Route path="/user/learning" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><LearningResources/></motion.div>}/>
                <Route path="/user/viewmentors" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><MentorSection/></motion.div>}/>
                <Route path="/user/learning/video" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><VideoResources/></motion.div>}/>
                <Route path="/user/learning/article" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><ArticleResources/></motion.div>}/>
                <Route path="/user/chatpage/:userId" element={<Chatpage/>}/>
                <Route path="/user/chatpage" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><ChatLayout/></motion.div>}/>
                <Route path="/user/stepdetails" element={<StepDetails/>}/>
                <Route path="/user/booking/:id" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><BookingForm/></motion.div>}/>
                <Route path="/user/viewmentorprofile/:id" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><ViewMentorprofile/></motion.div>}/>
                <Route path="/user/connectedpeople" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><ConnectedPeople/></motion.div>}/>
                <Route path="/user/feedback" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><UFeedbackreport/></motion.div>}/>
                <Route path="/user/checklist" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><Checklist/></motion.div>}/>
                <Route path="/user/mentorstarrating" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><MentorStarRating/></motion.div>}/>
                <Route path="/user/upcomingsession" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.2}}><UpcomingSessions/></motion.div>}/>
               
                

                {/* <Route path="/user/chatpage/:userId" element={<ChatPage currentUser={currentUser}/>}/> */}
            </Route>
            <Route path="/mentor" element={<MentorLayout/>}>
                <Route index element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><Mentorpage/></motion.div>}/>
                <Route path="/mentor/profilecreate" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><Mentorprofilecreation/></motion.div>}/>
                <Route path="/mentor/profileview" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><Mentorprofileview/></motion.div>}/>
                <Route path="/mentor/profileme" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><Mentorprofile/></motion.div>}/>
                <Route path="/mentor/profileupdate/:id" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><Mentorprofileupdate/></motion.div>}/>
                <Route path="/mentor/dashboard" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><MentorDashboard/></motion.div>}/>
                <Route path="/mentor/connectionrequest" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><ConnectionRequest/></motion.div>}/>
                <Route path="/mentor/notification" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><MNotificationPage/></motion.div>}/>
                <Route path="/mentor/feedback" element={<motion.div variants={pagevariants1} initial="initial" animate="animate" transition={{duration:0.4}}><MFeedbackReport/></motion.div>}/>
                <Route path="/mentor/add_businessidea" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><Mentor_businessIdea/></motion.div>}/>
                <Route path="/mentor/add_resource" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><Mentor_resource/></motion.div>}/>
                <Route path="/mentor/viewmentor" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><Mentor_viewmentor/></motion.div>}/>
                <Route path="/mentor/connections" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><Mentor_connections/></motion.div>}/>
                <Route path="/mentor/reviewlist" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><Review_listing/></motion.div>}/>
                <Route path="/mentor/rrr" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><ResourceAnalysisChart/></motion.div>}/>
                <Route path="/mentor/uploadsession" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><UploadingSession/></motion.div>}/>
                <Route path="/mentor/viewsession" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><SessionCard/></motion.div>}/>
                <Route path="/mentor/chatpage" element={<motion.div variants={pagevariants} initial="initial" animate="animate" exit="exit" transition={{duration:0.4}}><MChatLayout/></motion.div>}/>
                 <Route path="/mentor/viewmentorprofile/:id" element={<ViewMentorprofile/>}/>
            </Route>
        </Routes>
        </AnimatePresence>
    </div>
  )
}

export default AppRoutes