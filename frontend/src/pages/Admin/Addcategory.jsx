import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useState,useEffect} from "react"
import axios from "axios"
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
 
const Addcategory = () => {
    const navigate=useNavigate();
    const[categorydata,setCategorydata]=useState([]);
    const[isedit,setIsedit]=useState(false);
    const[editId,setEditId]=useState(null);
  useEffect(()=>{
    const fetchCategory=async()=>{
      try{
      const res=await axios.get("http://localhost:5000/api/admin/getcategory");
      setCategorydata(res.data);
      }catch(error){
        console.log(error);
      }
      
      
    }
    fetchCategory();
  },[]);
    const[category,setCategory]=useState({name:"",description:""});

    const handleEdit=(category)=>{
      setCategory({name:category.name,description:category.description});
      setIsedit(true);
      // console.log(category.id,category._id);
      setEditId(category._id);

    }
    useEffect(() => {
  if (editId) {
    console.log("Updated editId:", editId);
  }
}, [editId]);

const deleteCategory=async(id)=>{
  try{
    const data=await axios.delete(`http://localhost:5000/api/admin/deletecategory/${id}`);
     setCategorydata(pre=>pre.map(m=>m._id!==id));
  }catch(error){
    console.log(error);
  }
  
}

    const handleSubmit=async()=>{
      
        try{
          console.log(editId);
        if(isedit){
          const res=await axios.put(`http://localhost:5000/api/admin/updatecategory/${editId}`,category);
          setCategorydata((pre)=>pre.map((cat)=>cat._id===editId?{...cat,...category}:cat));
          setIsedit(false);
          setEditId(null);
        }
            

        const res=await axios.post("http://localhost:5000/api/admin/addcategory",category);
        
    
        }catch(err){
            console.log(err);
        }
        navigate("/admin/dashboard");


    }
  return (
    <div>
    <div className="w-[1200px] mx-auto bg-white shadow-2xl rounded p-6 mt-20 translate-transform hover:scale-105 duration-300">
      <h2 className="text-2xl font-bold mb-4">{isedit?"Edit":"Add"} Category</h2>
      <form onSubmit={handleSubmit} className="flex gap-10 grid grid-cols-3  ">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={(e) => setCategory({...category,[e.target.name]:e.target.value})}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Coding, Fashion"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={category.description}
            onChange={(e) => setCategory({...category,[e.target.name]:e.target.value})}
            className="w-full border rounded px-3"
            placeholder="Short description of this category"
          />
        </div>
        <div><button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xl mt-8 "
        >
          {isedit?"update": "add category"}
        </button></div>
        
     

      </form>
      </div>
      <div className="px-30 bg-gray-50 min-h-screen mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Category Management</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gradient-to-r from-blue-700 bg-cyan-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categorydata.map((cat) => (
              <tr key={cat._id} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-6 font-semibold text-gray-700">{cat.name}</td>
                <td className="py-3 px-6 text-gray-600">{cat.description}</td>
                <td className="py-3 px-6 flex justify-center space-x-4">
                  <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition" onClick={()=>handleEdit(cat)}>
                    <FaEdit />
                  </button>
                  <button className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-800 transition" onClick={()=>deleteCategory(cat._id)}>
                    <FaTrash/>
                  </button>
                  <button onClick={()=>navigate(`/admin/categorizedusers/${cat._id}`)} className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition">
                    <FaUsers />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
      
    
  )
}

export default Addcategory