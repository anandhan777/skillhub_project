import React from "react";
import { NavLink } from "react-router-dom";
import {useState,useEffect} from "react"
import {BsBookmarkFill} from "react-icons/bs"
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const VideoResources = () => {

  const [videos,setVideos]=useState([]);
  const[search,setSearch]=useState("");
  const user=JSON.parse(localStorage.getItem("user"))
    const savedResource=async(id)=>{
        await axios.post(`http://localhost:5000/api/users/addsavedresource/${user.id}/${id}`);
        alert("resource saved successfully");
       
    }

  useEffect(()=>{
    const fetchVideos=async()=>{
      try{
        const res=await axios.get("http://localhost:5000/api/users/videos");
        setVideos(res.data);
        console.log(res.data)
      }catch(error){
        console.log(error);
      }
    }
    fetchVideos();
  },[])

  const[activenav,setActivenav]=useState("video");

  const searchVideo=()=>{
    setVideos(prev=>prev.filter(m=>m.title===search));
  }
  
  return (
    <div className="min-h-screen p-26">
      <div >
        <nav className="text-gray-600  flex gap-5">
          <NavLink to="/user/learning/video" onClick={()=>setActivenav("video")} className={`${activenav==="video" ? "text-blue-600  border-b-2 border-blue-600":"border-b-2 border-gray-600 text-gray-600 "}`}>video</NavLink>
          <NavLink to="/user/learning/article" onClick={()=>setActivenav("article")} className={`${activenav==="article" ? "text-blue-600  border-b-2 border-blue-600":"border-b-2 border-gray-600 text-gray-600 "}`}>Article</NavLink>
          <NavLink to="/user/checklist" onClick={()=>setActivenav("checklist")} className={`${activenav==="checklist" ? "text-blue-600  border-b-2 border-blue-600":"border-b-2 border-gray-600 text-gray-600 "}`}>checklist</NavLink>
        </nav>
      </div>
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Learning Videos</h1>
        <p className="text-gray-600 mt-2">
          Explore curated video resources uploaded by mentors and admins.
        </p>
      </div>
      <div className="mb-6 relative flex justify-end">
              <input
                type="text" value={search} onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search video..."
                className="w-full p-3 border rounded-lg bg-white"
              />
              <button onClick={searchVideo} className="absolute text-2xl p-3"><FaSearch/></button>
            </div>
       
      {/* Video Grid */}
      <h1 className="text-2xl text-bold pb-4">Recomented based on your skils</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
        {videos.map((video, idx) => (
          <div
            key={idx}
            className=" group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Thumbnail */}
            <img
              src={`http://localhost:5000${video.thumbnail}`}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <BsBookmarkFill onClick={()=>savedResource(video._id)} className='text-2xl relative ml-[375px] mt-4 opacity-0 group-hover:opacity-100 trasition-opacity duration-300'/>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {video.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {/* Uploaded by: {video.uploadedBy} */}
                 {video.description}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {/* Uploaded by: {video.uploadedBy} */}
                 Uploaded by: {video.description}
              </p>
              <a
                href={video.link}
                className="inline-block bg-gradient-to-br from-blue-600 to-blue-400 text-white px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200"
              >
                Watch Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoResources;
