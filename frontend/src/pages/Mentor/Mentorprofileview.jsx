import React from 'react'
import banner from '../../assets/banner.png'
import OIP from '../../assets/OIP.webp'
import {SiGmail} from 'react-icons/si'
import {FaPhone} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import CircularProgress from '../../components/Common/Circularprogress'
import { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

function Mentorprofileview() {
  
    const [progress, setProgress] = useState(0);
    const {id}=useParams();
    const navigate=useNavigate();
    const[profile,setProfile]=useState({
      user:{},
      profile:{}
    });

     const mentor = {
    name: "John Smith",
    expertise: "UI/UX Design",
    bio: "10+ years experience in digital product design.",
    avatar: "https://via.placeholder.com/100",
    sessions: 25
  };

    
    

  useEffect(() => {
    
    const fetchProfile=async()=>{
      try{
      const token=localStorage.getItem("token");
       console.log(token);
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/mentor/mentorprofile`,{
          headers: {
            Authorization: `Bearer ${token}`, // or however you store it
          }},);
      setProfile(res.data);
      console.log(res.data);
     
      }
      catch(error){
  console.log("Error status:", error.response?.status);
  console.log("Error data:", error.response?.data);
}
     
    }
     fetchProfile();
     if(!profile){
    <h1>loading...</h1>
  }
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 500);
    return () => clearInterval(interval);
  }, [id]);

  const handleClick=()=>{
    navigate(`/mentor/profileupdate/${profile.profile._id}`);
  }

 
  return (
    <div className="">
        <div className='w-full h-54 pt-15 '>
            <img src={`${import.meta.env.VITE_API_URL}${profile.profile.profileBanner}`} alt="banner" className='w-full h-full object-cover'/>
        </div>
        <div className="flex">
       <div className=' ml-41 w-60 h-60  rounded-full -mt-25  border-4 border-white '>
            <img src={`${import.meta.env.VITE_API_URL}${profile.profile.profilePicture}`} alt="profile" className=' w-full h-full object-cover rounded-full shadow-md'/>
        </div>
        <div className='flex'>
        <div className="pl-12" >
        <h1 className="text-4xl font-semibold">{profile.profile.fullName}</h1>
        {/* <h1 className="text-2xl text-gray-500">{profile.user.name}</h1> */} 
        <h3 className='text-2xl w-[900px] text-gray-500 flex items-center'>{profile.profile.bio}</h3>
         <h3 className="text-2xl text-blue-800 flex"><MdLocationOn/>{profile.profile.location}</h3>
        {/* <h3 className='text-2xl text-gray-500 flex items-center'>{profile.profile.skills}</h3>
        <h3 className='text-2xl text-gray-500 flex items-center'>{profile.profile.interests}</h3> */}
        <div className="flex mt-4 gap-4">
            <button onClick={handleClick} className=" border-2 border-blue-400 bg-transparent text-blue-800 px-4 py-2 rounded-full hover:text-white duration-500 hover:bg-blue-800">Enhance Profile</button>
            </div>
              
        </div>
        
     
    </div>
        </div>
        
        <div className="bg-gray-100 w-full  mt-5 pt-5">
            {/* <div className=" ml-34  w-[300px] h-[230px] bg-white rounded-lg ">
                <h2 className="text-green-900  font-light text-3xl pl-19 py-6 ">contact Me</h2>
                <h2 className="text-1xl flex items-center pl-10"><SiGmail/> krishnan@gmail.com</h2>
                <h2 className="text-1xl flex items-center pl-10"><FaPhone/> 123-456-7890</h2>
                <h2 className="text-1xl flex items-center pl-10"><MdLocationOn/> kerala</h2>
                <button className="bg-blue-400 text-white px-4 py-2 rounded-full ml-25 my-5">chat me</button>
            </div> */}
            <div className="w-full grid grid-cols-3 gap-10 px-20 pb-5 ">
    <div className="bg-white shadow rounded-lg p-4 transform-transform duration-300 hover:scale-108">
      <h3 className="text-lg font-bold mb-2">Contact Me</h3>
      <p>{profile.user.email}</p>
      <p>{profile.profile.phone}</p>
    </div>
    <div className="bg-white shadow rounded-lg p-4 transform-transform duration-300 hover:scale-108">
      <h3 className="text-lg font-bold mb-2">Skills</h3>
      <p>{profile.profile.skills}</p>
    </div>
    <div className="bg-white shadow rounded-lg p-4 transform-transform duration-300 hover:scale-108">
      <h3 className="text-lg font-bold mb-2">catgory</h3>
      <p>{profile.profile.category?.name}</p>
    </div>
  </div>
  
        </div>
         <div className="bg-white shadow rounded-lg p-6 mx-20">
      <h3 className="text-xl font-bold mb-4">Mentor Connection</h3>
 <div className='flex gap-20 pl-10'>
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-20 h-20 rounded-full border-4 border-blue-500"
        />
        </div>

        {/* Info */}
       
        <div>
          <h2 className="text-lg font-bold">{mentor.name}</h2>
          <p className="text-blue-600 font-semibold">{mentor.expertise}</p>
          <p className="text-gray-600 text-sm mt-1">{mentor.bio}</p>
          <p className="text-gray-500 text-xs mt-1">
            Sessions: {mentor.sessions}
          </p>
          </div>
          

          {/* Action buttons */}
          <div className="mt-3 flex items-center gap-5 justify-end ">
            <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition">
              Book Session
            </button>
            <button className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition">
              Ask Question
            </button>
          </div>
          </div>
      
      </div>  
    </div>
    
  )
}

export default Mentorprofileview