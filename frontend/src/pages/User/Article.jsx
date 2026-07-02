import React from "react";
import {NavLink} from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios"
import { FaSearch } from "react-icons/fa";

const ArticleResources = () => {
  const [articles,setArticles]=useState([]);
  const[search,setSearch]=useState("");

  useEffect(()=>{
    const fetchArticle=async()=>{
    try{
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/articles`);
      setArticles(res.data);
    }catch(error){
      console.log(error)
    }
  }
  fetchArticle();
  },[])
  const searchArticle=()=>{
    setArticles(prev=>prev.filter(m=>m.title===search));
  }
  const [activenav,setActivenav]=useState("article")

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e9eef5] p-26">
        <div >
              <nav className="text-gray-600  flex gap-5">
                <NavLink to="/user/learning/video" onClick={()=>setActivenav("video")} className={`${activenav==="video" ? " text-blue-600  border-b-2 border-blue-600":"border-b-2 border-gray-600 text-gray-600 "}`}>video</NavLink>
                <NavLink to="/user/learning/article" onClick={()=>setActivenav("article")} className={`${activenav==="article" ? " text-blue-600 border-b-2 border-blue-600":"border-b-2 border-gray-600 text-gray-600 "}`}>Article</NavLink>
                <NavLink to="/user/checklist" onClick={()=>setActivenav("checklist")} className={`${activenav==="checklist" ? " text-blue-600 border-b-2 border-blue-600":"border-b-2 border-gray-600 text-gray-600 "}`}>checklist</NavLink>
              </nav>
            </div>
      {/* Page Header */}
      <div className="bg-gray-50 min-h-screen p-6">
  <div className="max-w-6xl mx-auto">

    {/* Header */}
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Learning Resources
      </h1>
      <p className="text-gray-500 mt-2 text-center">
        Articles and resources shared by mentors and administrators.
      </p>
    </div>

    {/* Search */}
    <div className="mb-6 relative flex justify-end">
      <input
        type="text" value={search} onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search articles..."
        className="w-full p-3 border rounded-lg bg-white"
      />
      <button onClick={searchArticle} className="absolute text-2xl p-3"><FaSearch/></button>
    </div>

    {/* Resource Cards */}
    <div className="space-y-5">
      {articles.map((article) => (
        <div
          key={article._id}
          className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {article.title}
              </h2>

              <div className="flex gap-3 mt-2">
                <span className="text-sm text-blue-900 font-medium">
                  {article.author}
                </span>

                <span className="text-xs bg-blue-100 text-blue-900 px-2 py-1 rounded-full">
                  mentor
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mt-4 line-clamp-3">
            {article.description}
          </p>

          <div className="flex justify-between items-center mt-5">
            <span className="text-sm text-gray-400">
              {article.createdAt}
            </span>

            <button
              className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
            >
              Read Article
            </button>
          </div>
        </div>
      ))}
    </div>

  </div>
</div>
    </div>
  );
};

export default ArticleResources;
