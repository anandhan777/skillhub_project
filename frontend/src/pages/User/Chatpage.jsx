import {useEffect,useState} from "react";
import {useParams} from "react-router-dom"
import {socket} from "../../socket/Socket"
import axios from "axios"

const Chatpage=({userId,picture,name})=>{
    const[messages,setMessages]=useState([]);
    const[text,setText]=useState("");
    const[showdelete,setShowdelete]=useState(false);
    const user=JSON.parse(localStorage.getItem("user"));
    
    const token=localStorage.getItem("token");
//    const {userId}=useParams();
    
    useEffect(()=>{
        console.log(user.id);
        console.log(userId);
        const fetchMsg=async()=>{
            try{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/${user.id}/${userId}`,{headers:{Authorization:`Bearer ${token}`}});
            setMessages(res.data);
            console.log(res.data);
     
    }catch(error){
        console.log(error);
    }
           };
        fetchMsg();
        },[user.id,userId,token]);


    useEffect(()=>{
        socket.connect();
        socket.emit("setup",user.id)
        // socket.on("connect",()=>{
      
        socket.on("receive_message",(newMessage)=>{
           setMessages((prev)=>[...prev,newMessage]);
        });
        socket.on("sender_message",(newMessage)=>{
            setMessages((prev)=>[...prev,newMessage]);
        });
        
    
        return ()=>{
            //
            socket.off("receive_message");
            socket.off("sender_message");
             socket.disconnect();
        };

    },[user.id]);

    const deleteMsg= async(id)=>{
       
        try{
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/chat/msgdelete/${id}`);

        const updateMessage= messages.filter((m)=>m._id!==id);
        setMessages(updateMessage);
    
        }catch(err){
            console.log(err);
        }
    }

    const sendMessage=()=>{
        if(!text.trim()) return;

        
        socket.emit("send_message",{
            senderId:user.id,
            receiverId:userId,
            text,
        });
     
        setText("");
    };
    return (
    <div><div className="grid grid-cols-2">
    <div className="mt-6 mx-6 h-[615px] flex flex-col w-[730px]">
        <div className="flex items-center gap-5 "><img src={`
${import.meta.env.VITE_API_URL}${picture}`} className="h-12 w-12 rounded-full"/>
  <h1>chat with user {name}</h1></div>
  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`inline-block p-2 px-3 rounded-2xl max-w-fit ${
          msg.senderId === user.id
            ? "self-end bg-[#1e97f3] text-white text-right"
            : "self-start bg-gray-200 text-left"
        }`}
        onClick={() => setShowdelete(!showdelete)}
      >
        <b>{msg.senderId === user.id ? "you" : "them"}:</b>
        <p>
          {msg.message}
          {showdelete && (
            <button onClick={() => deleteMsg(msg._id)}>delete</button>
          )}
        </p>
      </div>
    ))}
  </div>

  <div className="flex gap-2 mt-2">
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="flex-1 border-gray-300 h-12 rounded-full px-20  ring-2 focus:outline-none focus:ring-cyan-300"
    />
    <button className="bg-gradient-to-r from-[#1e97f3] to-cyan-400 text-white px-2 rounded-full mr-10" onClick={sendMessage}>send msg</button>
  </div>
  </div>
  










  <div className="w-[340px] h-[800px] ml-48 flex -mt-14 items-center justify-center">
  <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

    {/* Top Banner */}
    <div className="h-28 bg-gradient-to-r from-[#1e97f3] to-[#0083ff] relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-12">
        <img
          src={`
${import.meta.env.VITE_API_URL}${picture}`}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
        />
      </div>
    </div>

    {/* Profile Content */}
    <div className="pt-14 pb-8 px-6 text-center">

      <h2 className="text-2xl font-bold text-gray-800">
        {name}
      </h2>

      <p className="text-gray-500 mt-1">
        Mentor / User
      </p>

      <div className="mt-3 space-y-2">
       
          <p className="font-medium text-gray-700">
            email@example.com
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-2">
          
          <p className="font-medium text-gray-700">
            Unknown
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-2">
          <p className="text-sm text-gray-500">Interests</p>
          <p className="font-medium text-gray-700">
            Technology, Business
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-1 mt-4">
        <button
          className="
            flex-1
            bg-gradient-to-r
            from-[#1e97f3]
            to-[#0083ff]
            text-white
            py-3
            mx-20 mb-5
            rounded-full
            font-semibold
            shadow-lg
            hover:scale-105
            transition-all
            duration-300
          "
        >
          View Details
        </button>

     
      </div>

    </div>
  </div>
</div>
</div>


);
};

export default Chatpage;