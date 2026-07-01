import { useState ,useEffect} from "react";
import axios from "axios"
import { CalendarDays, Clock3, Video, User } from "lucide-react";
import{motion} from "framer-motion"


function SessionCard() {

  const [showUsers, setShowUsers] = useState(false);
  const[sessions,setSessions]=useState([]);
  const[showModel,setShowModel]=useState(false);
  const[selectedSession,setSelectedSession]=useState(null);
  const[registerUser,setRegisterUser]=useState([]);

  const[showmenu,setShowmenu]=useState("sessionregister");

  // const toggleMenu=(menu)=>{
  //   setShowmenu(showmenu===menu?null:menu);
  // }

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    const fetchSession=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/mentor/uploadedsession/${user.id}`);
        const res1=await axios.get(`http://localhost:5000/api/mentor/viewuploadedsession/${user.id}`);
        setSessions(res.data);
        setRegisterUser(res1.data);
        console.log(res.data);
        console.log(res1.data);
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchSession();

  },[])
  const deleteSession=async(id)=>{
    try {
      await axios.delete(`http://localhost:5000/api/mentor/deletesession/${id}`);
      
      setRegisterUser(prev=>prev.filter(m=>m._id!==id));
      alert("session deleted");
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="p-26 pt-20">
      <div className="flex gap-10 ">
      <button onClick={()=>setShowmenu("session")} className={`${showmenu==="session" ?"bg-gradient-to-r from-blue-600 to-cyan-500 text-white":"text-gray-700 border-2 border-gray-400"} text-2xl px-4 py-2 rounded-full duration-300`}>view session</button>
      <button onClick={()=>setShowmenu("sessionregister")}  className={`${showmenu==="sessionregister" ?"bg-gradient-to-r from-blue-600 to-cyan-500 text-white":"text-gray-700 border-2 border-gray-400"} text-2xl px-4 py-2 rounded-full duration-300`}>view session register</button>
      </div>
      {showmenu==="sessionregister" &&(
    <div className="p-5  grid grid-cols-2 gap-10 ">
    {sessions.map((session) => (
          <div
            key={session._id}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            
            <div className="relative">
              <img
                src={`http://localhost:5000${session.sessionId?.banner}`}
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
                {session.sessionId?.title}
              </h2>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {session.sessionId?.description}
              </p>

              {/* Details */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <User size={18} />
                  <span>{session.sessionId?.mentorId}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <CalendarDays size={18} />
                  <span>{session.sessionId?.createdAt}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Clock3 size={18} />
                  <span>{session.sessionId?.startTime}{session.sessionId?.endTime}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-8">
                <button onClick={()=>setShowUsers(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
                  view refistered user
                </button>

                <button onClick={()=>{setSelectedSession(session),setRegisterUser(session.userId),setShowModel(true)}}className="flex items-center justify-center gap-2 border border-gray-300 px-6 rounded-xl hover:bg-gray-100 transition">
                  <Video size={18} />
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
        {showModel && selectedSession && (
  <div className="fixed inset-0  flex items-center justify-center z-50 ">
    <motion.div initial={{scale:0.6,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} transition={{duration:0.3}} className="bg-white rounded-2xl shadow-lg w-[1000px] h-[90vh] overflow-y-auto p-6 pt-10 mt-14">
      
      {/* Header */}
      

      {/* Banner */}
      <img 
        src={`http://localhost:5000${selectedSession.sessionId.banner}`} 
        alt="" 
        className="w-full h-58 object-cover rounded-lg -mt-5"
      />

      {/* Details */}
      <div className="mt-4 space-y-2 text-gray-700">
         <div className="flex justify-between items-center  ">
        <h2 className="text-xl font-bold text-slate-900">
          {selectedSession.title}
        </h2>
       
        
        <button 
          onClick={() => setShowModel(false)} 
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
        <p><strong>Description:</strong> {selectedSession.sessionId.description}</p>
        <p><strong>Mentor:</strong> {selectedSession.sessionId.mentorId}</p>
        <p><strong>Date:</strong> {selectedSession.sessionId.createdAt}</p>
        <p><strong>Time:</strong> {selectedSession.sessionId.startTime} - {selectedSession.sessionId.endTime}</p>
      </div>

      {/* Registered Users */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Registered Users</h3>
         <div className="overflow-y-auto">
    <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
            Username
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
            Email
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
            Password
          </th>
        </tr>
      </thead>
      <tbody>
     
        {selectedSession.userId.map((user, idx) => (
          <tr key={user._id} className="hover:bg-gray-50">
            <td className="px-6 py-3 text-sm text-gray-800 border-b">
              {user.name}
            </td>
            <td className="px-6 py-3 text-sm text-gray-800 border-b">
              {user.email}
            </td>
            <td className="px-6 py-3 text-sm text-gray-800 border-b">
              {user.password}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
        
      </div>
       
    </motion.div>
  </div>
)}
    </div>)}
    {showmenu==="session" &&(<div className="p-5  grid grid-cols-1 gap-10 ">
      {registerUser.length===0?(<div classame="flex flex-cols pl-80"><h1 className="text-2xl text-gray-500">no session uploded</h1>
      <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-2xl px-4 py-2 rounded-full">start uploading</button>
      </div>):(<div className="p-5  grid grid-cols-2 gap-10 ">
    {registerUser.map((session) => (
          <div
            key={session._id}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            
            <div className="relative">
              <img
                src={`http://localhost:5000${session?.banner}`}
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
                <button onClick={()=>deleteSession(session._id)}className="border-2 px-3 py-1 text-xl border-gray-500 rounded-full">delete</button>
              </div>
            </div>
          </div>
        ))}</div>)}

    </div>
      )}
    </div>
  );
}

export default SessionCard;