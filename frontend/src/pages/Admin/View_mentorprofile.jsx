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

function ViewMentorprofile() {
  
    const [progress, setProgress] = useState(0);
    const {id}=useParams();
    const navigate=useNavigate();
    const[profile,setProfile]=useState(null);
    const[getConnection,setGetConnection]=useState(null);

     const mentor = {
    name: "John Smith",
    expertise: "UI/UX Design",
    bio: "10+ years experience in digital product design.",
    avatar: "https://via.placeholder.com/100",
    sessions: 25
  };

    
    

  useEffect(() => {
     const user=JSON.parse(localStorage.getItem("user"));
    const fetchProfile=async()=>{
      const user=JSON.parse(localStorage.getItem("user"));
      try{
      const token=localStorage.getItem("token");
       console.log(token);
      const res=await axios.get(`http://localhost:5000/api/mentor/viewmentorprofile/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`, // or however you store it
          }},);
        
      setProfile(res.data);
      console.log(res.data);
      console.log(res1.data);
     
      }
      catch(error){
  console.log("Error status:", error.response?.status);
  console.log("Error data:", error.response?.data);
}
     
    }
     fetchProfile();
     const fetchConection=async()=>{
      try{
          const res1=await axios.get(`http://localhost:5000/api/users/getconnection/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`, // or however you store it
          }},);
           setGetConnection(res1.data);
           console.log(res1.data);
      }catch(error){
        console.log(error);
      }


     }
     if(!profile){
    <h1>loading...</h1>
  }
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 500);
    return () => clearInterval(interval);
  }, [id]);

  const handleClick=async(id)=>{
    const token=localStorage.getItem("token");
    const user=JSON.parse(localStorage.getItem("user"))
  
    try{
      const res=await axios.post('http://localhost:5000/api/users/sendconnection',{senderId:user.id,receiverId:id});
      alert("connection request sent successfully");
    }catch(error){
      console.error(error);
    }
  }
 
  return (
    <div className="mt-2">
        <div className='w-full h-54 mt-10'>
          

            <img src={`http://localhost:5000${profile?.profileBanner}`} alt="banner" className='w-full h-full object-cover'/>
        </div>
        <div className="flex">
        <div className=' ml-41 w-60 h-60 relative rounded-full -mt-25  border-4 border-white '>
            <img src={`http://localhost:5000${profile?.profilePicture}`} alt="profile" className='  w-60 h-60 object-cover rounded-full shadow-md'/>
        </div>
        <div className='flex'>
        <div className="pl-12" >
        <h1 className="text-4xl font-semibold">{profile?.fullName}</h1>
        <h1 className="text-2xl text-gray-500">{profile?.mentor?.name}</h1>
        {/* <h3 className="text-2xl text-blue-800">{profile.user.email}</h3> */}
        <h3 className='text-2xl text-gray-500 flex items-center'><MdLocationOn/>{profile?.bio}</h3>
        {/* <h3 className='text-2xl text-gray-500 flex items-center'>{profile.profile.skills}</h3>
        <h3 className='text-2xl text-gray-500 flex items-center'>{profile.profile.interests}</h3> */}
        <div className="flex mt-4 gap-4">
            <button onClick={()=>handleClick(profile?.mentor?._id)} className=" border-2 border-blue-400 bg-transparent text-blue-800 px-4 py-2 rounded-full hover:text-white duration-500 hover:bg-blue-800">connect</button>
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
      <p>{profile?.mentor?.email}</p>
      <p>{profile?.phone}</p>
    </div>
    <div className="bg-white shadow rounded-lg p-4 transform-transform duration-300 hover:scale-108">
      <h3 className="text-lg font-bold mb-2">Skills</h3>
      <p>{profile?.skills}</p>
    </div>
    <div className="bg-white shadow rounded-lg p-4 transform-transform duration-300 hover:scale-108">
      <h3 className="text-lg font-bold mb-2">interest</h3>
      <p>{profile?.interests}</p>
    </div>
  </div>
  
        </div>
         <div className="bg-white shadow rounded-lg p-6 mx-20">
      <h3 className="text-xl font-bold mb-4">Mentor Connection</h3>
 <div className='flex gap-20 pl-10'>
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <img
          src={mentor?.avatar}
          alt={mentor?.name}
          className="w-20 h-20 rounded-full border-4 border-blue-500"
        />
        </div>

        {/* Info */}
       
        <div>
          <h2 className="text-lg font-bold">{mentor?.name}</h2>
          <p className="text-blue-600 font-semibold">{mentor?.expertise}</p>
          <p className="text-gray-600 text-sm mt-1">{mentor?.bio}</p>
          <p className="text-gray-500 text-xs mt-1">
            Sessions: {mentor?.sessions}
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

export default ViewMentorprofile