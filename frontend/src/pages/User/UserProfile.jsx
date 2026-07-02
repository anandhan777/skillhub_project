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


function UserProfile() {
  
    const [progress, setProgress] = useState(0);
    const[roadmap,setRoadmap]=useState({});
    const[connections,setConnections]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();
    const token=localStorage.getItem("token")
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
const user=JSON.parse(localStorage.getItem("user"));
  useEffect(()=>{
        const fetchroadmap=async()=>{
            try{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/getroadmaps`,{
                headers:{Authorization: `Bearer ${token}`}
            });
           ;
            setRoadmap(res.data);
             console.log(res.data);
            }catch(err){
                console.log(err.message);   
            }
        }
        fetchroadmap();

         const fetchConnections = async () => {
      const user=JSON.parse(localStorage.getItem("user"));
      try {
        const res = await axios.get(`
${import.meta.env.VITE_API_URL}/api/users/connectedpeople/${user.id}`);
        setConnections(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    };
    fetchConnections();
  
    },[user.id]);
     useEffect(()=>{
        const fetchProgress=async()=>{
            if (!roadmap?._id) return; 
            console.log(roadmap._id);
            try{
                const res=await axios.get(`
${import.meta.env.VITE_API_URL}/api/users/getprogress/${roadmap._id}`,{headers:{Authorization:`Bearer ${token}`}});
                setProgress(res.data.percentage);
                console.log(res.data.percentage)
                setCompletedSteps(res.data.completedSteps);
              
            }catch(error){
                console.log(error);
            }
        }
        fetchProgress();
    },[roadmap])

    
    

  useEffect(() => {
    
    const fetchProfile=async()=>{
      try{
      const token=localStorage.getItem("token");
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profileview`,{
          headers: {
            Authorization: `Bearer ${token}`, // or however you store it
          }},);
      setProfile(res.data);
      console.log(res.data);
      }
      catch(error){
        console.log(error);
      }
     
    }
     fetchProfile();
     if(!profile){
    <h1>loading...</h1>
  }
    // const interval = setInterval(() => {
    //   setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    // }, 500);
    // return () => clearInterval(interval);
  }, [id]);

  const handleClick=()=>{
    navigate(`/user/profileupdate/${profile.profile._id}`);
  }
 
  return (
    <div>
        <div className='w-full h-54 mt-10 '>
          

            <img src={`${import.meta.env.VITE_API_URL}${profile.profile.profileBanner}`} alt="banner" className='w-full h-full object-cover'/>
        </div>
        <div className="flex">
        <div className=' ml-41 w-60 h-60 relative rounded-full -mt-25 ml-4 border-4 border-white '>
            <img src={`${import.meta.env.VITE_API_URL}${profile.profile.profilePicture}`} alt="profile" className='  w-full h-full object-cover rounded-full shadow-md'/>
        </div>
        <div className='flex'>
        <div className="pl-12" >
        <h1 className="text-4xl font-semibold">{profile.profile.fullName}</h1>
        <h1 className="text-2xl text-gray-500">{profile.user.name}</h1>
        {/* <h3 className="text-2xl text-blue-800">{profile.user.email}</h3> */}
        <h3 className='text-2xl text-gray-500 flex items-center'><MdLocationOn/>{profile.profile.location}</h3>
        {/* <h3 className='text-2xl text-gray-500 flex items-center'>{profile.profile.skills}</h3>
        <h3 className='text-2xl text-gray-500 flex items-center'>{profile.profile.interests}</h3> */}
        <div className="flex mt-4 gap-4">
            <button onClick={handleClick} className=" border-2 border-blue-400 bg-transparent text-blue-800 px-4 py-2 rounded-full hover:text-white duration-500 hover:bg-blue-800">update Profile</button>
            </div>
              
        </div>
        <div className="pl-66 flex flex-col items-center ">
      <h1 className="text-lg font-bold mb-4">current stage</h1>
      <CircularProgress progress={progress}/>
      
    </div>
     
    </div>
        </div>
        
        <div className="bg-gray-100 w-full  mt-5 pt-5">
          
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
      <h3 className="text-lg font-bold mb-2">interest</h3>
      <p>{profile.profile.interests}</p>
    </div>
  </div>
  
        </div>
         <div className="bg-white shadow rounded-lg p-6 mx-20">
      <h3 className="text-xl font-bold mb-4">Mentor Connection</h3>
      {connections.length === 0 ? (
        <p className="text-gray-500">No mentor connections found.</p>
      ) : (<div>
        {connections.map((conn) => (
 <div className='flex gap-20 pl-10'>
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <img
          src={`
${import.meta.env.VITE_API_URL}${conn.profilePicture}`}
          alt={conn.fullName}
          className="w-22 h-22 rounded-full "
        />
        </div>

        {/* Info */}
       
        <div>
          <h2 className="text-lg font-bold">{conn.fullName}</h2>
          <p className="text-blue-600 font-semibold">{conn.experiece}</p>
          <p className="text-gray-600 text-sm mt-1">{conn.bio}</p>
         
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
          </div>))}</div>)}
      
      </div>
      
      
        
      
    </div>
    
  )
}

export default UserProfile