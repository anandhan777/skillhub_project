import React from 'react'
import {useForm} from "react-hook-form"
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
;
function Resource_form({handleFormSubmit,checklistItems,setChecklistItems}) {
    const { register, handleSubmit, watch, reset } = useForm();
    const[newItem,setNewItem]=useState("");
   
    const type = watch("type");

    
  const addItem = () => {
    if (newItem.trim() !== "") {
      setChecklistItems([...checklistItems, newItem]);
      setNewItem("");
    }
  };

    const remove1=(id)=>{
        const updateditem=checklistItems.filter((_,i)=>i!==id);
        setChecklistItems(updateditem);
    
      }
    
  return (
 <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white shadow-lg rounded-xl p-6 space-y-6 w-[700px] mt-15 mx-auto rounded"
    >
      <h2 className="text-2xl font-bold text-cyan-800">Upload Resource</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full border rounded-xl px-3 py-2 ring-2 ring-gray-200   focus:ring-cyan-400"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full border rounded-xl px-3 py-2 ring-2 ring-gray-200   focus:ring-cyan-400"
        />
      </div>

      {/* Type Dropdown */}
      <div>
        <label className="block text-sm font-semibold mb-1">Type</label>
        <select
          {...register("type", { required: "Type is required" })}
          className="w-full border rounded px-3 py-2 ring-2 ring-gray-200   focus:ring-cyan-400"
        >
          <option value="">Select type</option>
          <option value="video">Video</option>
          <option value="article">Article</option>
          <option value="checklist">Checklist</option>
        </select>
      </div>

      {/* Conditional Fields */}
      {type ==="video" && (
        
        <div>
          <label className="block text-sm font-semibold mb-1">Video Link</label>
          <input
            {...register("videoUrl", { required: "Video link is required" })}
            placeholder="https://youtube.com/..."
            className="w-full border rounded-xl px-3 py-2 ring-2 ring-gray-200   focus:ring-cyan-400"
          />
          <label className="block text-sm font-semibold mt-4 mb-1">Thumbnail Image</label>
          <input
             type="file"
             accept="image/*"
      {...register("thumbnail")}
      className="w-full border rounded-xl px-3 py-2 ring-2 ring-gray-200   focus:ring-cyan-400"/>
          <label className="block text-sm font-semibold mt-4 mb-1">uploaded by</label>
          <input             
      {...register("ownername",{required:"name is required"})}
      placeholder="enter your name"
      className="w-full border rounded-xl px-3 py-2 ring-2 ring-gray-200   focus:ring-cyan-400"/>
        </div> 
      )}

      {type === "article" && (
        <div>
          <label className="block text-sm font-semibold mb-1">Article Link</label>
          <input
            {...register("articleLink", { required: "Article link is required" })}
            placeholder="https://medium.com/..."
            className="w-full  rounded-xl px-3 py-2 ring-2 ring-gray-200   focus:ring-cyan-400"
          />
          <label className="block text-sm font-semibold mb-1">author name</label>
          <input
            {...register("author", { required: "author name is required" })}
            placeholder="please provide the name"
            className="w-full  rounded-xl px-3 py-2 ring-2 ring-gray-200   focus:ring-cyan-400"
          />
        </div>
      )}

      {type === "checklist" && (
        <div>
          <label className="block text-sm font-semibold mb-1">Checklist Items</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter checklist item"
              className="border rounded px-3 py-2 flex-1 ring-2 ring-gray-200   focus:ring-cyan-400"
            />
            <button
              type="button"
              onClick={addItem}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Add
            </button>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            {checklistItems.map((item, idx) => (
              <li key={idx} className="flex items-center bg-blue-200 text-blue-900 rounded-full py-2">{item}<FaTimes className="flex justify-end" onClick={()=>remove1(idx)}/></li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="bg-gradient-to-r from bg-blue-500 to-cyan-500 text-white px-6 py-2 rounded hover:"
      >
        Submit Resource
      </button>
    </form>
  
  )
}

export default Resource_form