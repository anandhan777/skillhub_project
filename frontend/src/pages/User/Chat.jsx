
import { useEffect, useState } from "react";
import axios from "axios";
import Chatpage from "./Chatpage";

const ChatLayout = () => {
  const [users, setUsers] = useState([]);
  const [mentors,setMentors]=useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [picture, setPicture] = useState("");
  const [name,setName] = useState("");
  const [role,setRole] = useState(null);
  const user=JSON.parse(localStorage.getItem("user"))


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/connectedpeople/${user.id}`);
        
        setUsers(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    fetchUsers();

   
  }, []);
  
 
  return (
  <div className="h-screen bg-slate-100 pl-16 pt-14 ">
    <div className="h-full bg-white  shadow-2xl overflow-hidden flex">

      {/* Sidebar */}
      <div className="w-[350px] bg-gradient-to-b from-[#1e97f3] to-[#0083ff] flex flex-col">

        {/* Header */}
        <div className="p-6 border-b border-blue-400">
          <h1 className="text-2xl font-bold text-white">
            Messages
          </h1>
          <p className="text-blue-100 text-sm">
            Chat with users & mentors
          </p>
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md text-white placeholder-blue-100 outline-none border border-white/20"
          />
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">

          {users.map((profile) => (
            <div
              key={profile._id}
              onClick={() => {
                setSelectedUser(profile.mentor._id);
                setPicture(profile.profilePicture);
                setName(profile.fullName);
              }}
              className={`
                flex items-center gap-3
                p-3 mb-2
                rounded-2xl
                cursor-pointer
                transition-all duration-300
                hover:bg-white/20
                ${
                  selectedUser === profile.mentor._id
                    ? "bg-white text-blue-600 shadow-lg"
                    : "text-white"
                }
              `}
            >
              <div className="relative">
                <img
                  src={`
${import.meta.env.VITE_API_URL}${profile.profilePicture}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />

                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>

              <div>
                <h3 className="font-semibold">
                  {profile.fullName}
                </h3>

                <p
                  className={`text-xs ${
                    selectedUser === profile.mentor._id
                      ? "text-gray-500"
                      : "text-blue-100"
                  }`}
                >
                  Click to start chatting
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-slate-50">

        {selectedUser ? (
          <Chatpage
            userId={selectedUser}
            picture={picture}
            name={name}
          />
        ) : (
          <div className="h-full flex items-center justify-center">

            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 5l-3-3H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v11a2 2 0 01-2 2h-1l-3 3z"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                Welcome to Chat
              </h2>

              <p className="text-gray-500 mt-3">
                Select a user from the sidebar to start a conversation
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  </div>
);
}

export default ChatLayout;
