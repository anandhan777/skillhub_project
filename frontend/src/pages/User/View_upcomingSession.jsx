import React from "react";
import { CalendarDays, Clock3, Video, User } from "lucide-react";
import{useState,useEffect} from "react";
import axios from "axios" ;

function UpcomingSessions() {
  const[sessions,setSessions]=useState([]);
  const[status,setStatus]=useState([]);
  const[register,setRegister]=useState([]);
  const[sessionId,setSessionId]=useState(null);
  const user=JSON.parse(localStorage.getItem("user"));
   useEffect(()=>{
    const fetchSession=async()=>{
      try {
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/viewuploadedsession`);    
        const res1=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/viewsessionregister/${user.id}`);  
        setSessions(res.data);   
        setRegister(res1.data);
        console.log(res.data);
        console.log(res1.data);
      } catch (error) {
        console.log(error);       
      }
    }
    fetchSession();
  },[])
  const sessionRegister=async(id)=>{
    try{
  const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/users/sessionregister/${user.id}/${id}`)
  const updated=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/viewsessionregister/${user.id}`);  
  setRegister(updated.data);
    }catch(error){
      console.log(error);
    }
  

  alert('you registration successfull');

  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-25 ">
     
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-slate-900">
          Upcoming Sessions
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Join mentor-led workshops, live discussions, and startup guidance
          sessions.
        </p>
      </div>

      {/* Session Cards */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {sessions.map((session) => {
          
          
          return(<div
            key={session._id}
            className=" bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all 
            duration-300 border border-gray-100 transition-transform hover:scale-102 duration-300"
          >
            {/* Banner */}
            <div className="relative ">
              <img
                src={`
${import.meta.env.VITE_API_URL}${session.banner}`}
                alt=""
                className="h-56 w-full object-cover"
              />

              <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Upcoming
              </div>
            </div>

            {/* Content */}
            <div className="p-7">
              <h2 className="text-2xl font-bold text-slate-900">
                {session.title}
              </h2>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {session.description}
              </p>

              {/* Details */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <User size={18} />
                  <span>{session.mentorId}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <CalendarDays size={18} />
                  <span>{session.createdAt}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Clock3 size={18} />
                  <span>{session.startTime}{session.endTime}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-8">
                <button onClick={()=>sessionRegister(session._id)} disabled={register.some(m => m.sessionId === session._id && m.userId?.includes(user.id))?true:false} className={`${register.some(m => m.sessionId === session._id && m.userId?.includes(user.id))?"bg-blue-600":"bg-cyan-500"}  text-white py-3 rounded-xl font-semibold transition`}>
               {register.some(m => m.sessionId === session._id && m.userId?.includes(user.id))?"already register":"register now"}
                </button>

                <button className="flex items-center justify-center gap-2 border border-gray-300 px-6 rounded-xl hover:bg-gray-100 transition">
                  <Video size={18} />
                  Details
                </button>
              </div>
            </div>
          </div>)
})}
      </div>

      {/* Empty State */}
      {/* Show this when no sessions are available */}

    
      <div className="flex flex-col items-center justify-center py-24">
        <img
          src="/empty-session.svg"
          alt=""
          className="w-72 mb-6"
        />

        <h2 className="text-3xl font-bold text-slate-800">
          No Upcoming Sessions
        </h2>

        <p className="text-gray-500 mt-3">
          Check back later for new mentor sessions.
        </p>
      </div>
      
    </div>
  );
}


export default UpcomingSessions;