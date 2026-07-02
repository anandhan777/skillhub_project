import React from "react";
import {useState,useEffect} from "react";
import axios from "axios"
import { useParams } from "react-router-dom";

const UserDashboard = () => {
const [profile,setProfile]=useState({user:{},profile:{}});
  const [progress, setProgress] = useState(0);
    const[roadmap,setRoadmap]=useState({});
    const token=localStorage.getItem("token");
    const[saved,setSaved]=useState({
      savedIdea:[],
      savedResource:[]
    });


  const {id}=useParams();
  useEffect(()=>{
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
  },[]);
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
    },[]);
     useEffect(()=>{
        const fetchProgress=async()=>{
            if (!roadmap?._id) return; 
            console.log(roadmap._id);
            try{
                const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/getprogress/${roadmap._id}`,{headers:{Authorization:`Bearer ${token}`}});
                setProgress(res.data.percentage);
                console.log(res.data.percentage)
                setCompletedSteps(res.data.completedSteps);
              
            }catch(error){
                console.log(error);
            }
        }
        fetchProgress();
    },[roadmap])

     const [connections, setConnections] = useState([]);
 const user1=JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchConnections = async () => {
      const user1=JSON.parse(localStorage.getItem("user"));
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/connectedpeople/${user1.id}`);
        setConnections(res.data);
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    };
    fetchConnections();
  }, [user1.id]);

  useEffect(()=>{
    const fetchSaveditems=async()=>{
      try{
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/saveditems/${user1.id}`);
        setSaved(res.data);
        console.log(res.data)
      }catch(error){
        console.log(error);
      }
    }
    fetchSaveditems();
  },[])

  
  const user = {
    name: "Jane Doe",
    category: "Art",
    profilePic: "https://via.placeholder.com/80",
    roadmapProgress: 50,
    currentStep: "Portfolio Creation",
    nextStep: "Legal Setup",
    notifications: [
      "Your mentor replied to your question.",
      "New resource added to your roadmap.",
      "Admin announced a new business idea."
    ],
    savedIdeas: ["Digital Art Studio", "Fashion Blog", "Cooking Channel"],
    resources: ["Figma Tutorial", "Canva Templates", "Adobe XD Basics"],
    mentors: ["John Smith", "Emily Johnson"]
  };

  return (
    <div className="bg-slate-50 min-h-screen p-20">
  <div className="grid grid-cols-12 gap-4">

    {/* LEFT CONTENT */}
    <div className="col-span-9 space-y-4">

      {/* HERO CARD */}
      <div style={{backgroundImage:`url(${import.meta.env.VITE_API_URL}${profile.profile.profileBanner})`,backgroundPosition:"center",backgroundSize:"cover"}} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-4 flex justify-between items-center shadow-sm">

        <div className="flex items-center gap-5">
          <img
            src={`${import.meta.env.VITE_API_URL}${profile.profile.profilePicture}`}
            className="w-20 h-20 rounded-full object-cover border-4 border-white"
          />

          <div>
            <h1 className="text-3xl font-bold text-white">
              Hi, {profile.profile.fullName} 👋
            </h1>

            <p className="text-gray-200 mt-1">
              Keep learning and growing every day.
            </p>
          </div>
        </div>

        <img
          src="/mountain.svg"
          className="h-32"
        />
      </div>
      <div className="grid grid-cols-4 gap-4 my-5">
         <div className="bg-gradient-to-r flex flex-col justify-center items-center from-slate-200 to-slate-100 p-4 rounded-2xl shadow w-[240px] h-[120px]">
          <h2 className="text-lg font-semibold"> connected Mentees</h2>
          <p className="text-2xl font-bold"></p>
        </div>
         <div className="bg-gradient-to-r flex flex-col justify-center items-center from-slate-200 to-slate-100 p-4 rounded-2xl shadow w-[240px] h-[120px]">
          <h2 className="text-lg font-semibold"> connected Mentees</h2>
          <p className="text-2xl font-bold"></p>
        </div>
         <div className="bg-gradient-to-r flex flex-col justify-center items-center from-slate-200 to-slate-100 p-4 rounded-2xl shadow w-[240px] h-[120px]">
          <h2 className="text-lg font-semibold"> connected Mentees</h2>
          <p className="text-2xl font-bold"></p>
        </div>
         <div className="bg-gradient-to-r flex flex-col justify-center items-center from-slate-200 to-slate-100 p-4 rounded-2xl shadow w-[240px] h-[120px]">
          <h2 className="text-lg font-semibold"> connected Mentees</h2>
          <p className="text-2xl font-bold"></p>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-6 shadow-sm my-5">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            Roadmap Progress
          </h2>

          <span className="font-bold text-blue-600">
            {progress}%
          </span>
        </div>

        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
       {progress===100 ?(<div className="flex flex-col justify-center items-center mt-6">
          
          <div>
            <p className="text-gray-500 text-sm text-center">
              step completed
            </p>

            <h3 className="font-semibold text-cyan-600">
              choose a new roadmap
            </h3>
          </div>
          </div>):(
        <div className="grid grid-cols-2 mt-6">
          
          <div>
            <p className="text-gray-500 text-sm">
              Current Step
            </p>

            <h3 className="font-semibold">
              {user.currentStep}
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Next Step
            </p>

            <h3 className="font-semibold">
              {user.nextStep}
            </h3>
          </div>
        </div>)}
      </div>

      {/* RESOURCES */}
      <div className="grid md:grid-cols-2 gap-6 my-5">

        {/* Ideas */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

          <div className="bg-emerald-50 px-6 py-4 border-b">
            <h2 className="font-bold text-emerald-700">
              Saved Business Ideas
            </h2>
          </div>

          <div >
            {saved.savedIdea?.map((idea, index) => (
              <div
                key={index}
                className="p-4 border-b hover:bg-slate-50"
              >
                {idea.title}
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

          <div className="bg-purple-50 px-6 py-4 border-b">
            <h2 className="font-bold text-purple-700">
              Learning Resources
            </h2>
          </div>

          <div >
            {saved.savedResource?.map((resource, index) => (
              <div
                key={index}
                className="p-4 border-b hover:bg-slate-50"
              >
                {resource.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MENTORS */}
      <div className="bg-white rounded-3xl shadow-sm my-5">

        <div className="px-6 py-2 ">
          <h2 className="font-bold text-xl">
            Mentorship
          </h2>
        </div>

        <div className="py-3 px-6 pb-6 grid md:grid-cols-2 gap-6">

          {connections.map((mentor, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-2xl p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {mentor.receiverId?.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  Connected Mentor
                </p>
              </div>

              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl">
                Chat
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* RIGHT SIDEBAR */}
    <div className="col-span-3  space-y-4">

      <div className="bg-white rounded-3xl p-6 py-8 shadow-sm flex flex-col justify-center items-center">
        <h3 className="text-gray-500">
          Today's Progress
        </h3>

        <h2 className="text-2xl font-bold mt-2">
          Keep it up!
        </h2>

        <p className="text-gray-500 mt-2">
          You're doing great.
        </p>
      </div>

      <div className="bg-gradient-to-b from-blue-600 to-cyan-500 rounded-3xl p-8 text-white min-h-[590px]">

        <h2 className="text-4xl font-bold leading-relaxed">
          Big journeys
          <br />
          begin with
          <br />
          small steps.
        </h2>

        <p className="mt-6 text-blue-100">
          Stay consistent and your dream
          business will become reality.
        </p>

      </div>
    </div>

  </div>
</div>)
};

export default UserDashboard;
