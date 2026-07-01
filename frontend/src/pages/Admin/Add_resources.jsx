import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import Resource_form from "../../components/Common/Resource_form";

const ResourceForm = ({ uploadedBy }) => {
  
  const {reset}=useForm()
   const [checklistItems, setChecklistItems] = useState([]);
  const [newItem, setNewItem] = useState("");

   // watch selected type


  const handleFormSubmit = async (data) => {
    
    const formdata=new FormData();

    formdata.append("title",data.title);
    formdata.append("description",data.description);
    formdata.append("type",data.type);

    if (data.type==="video"){
    formdata.append("videoUrl",data.videoUrl);
    formdata.append("ownername",data.ownername);
    if(data.thumbnail && data.thumbnail[0]){
    formdata.append("thumbnail",data.thumbnail[0]);
    }
    }

    if(data.type==="article"){
        formdata.append("articleLink",data.articleLink);    
        formdata.append("author",data.author);
    }
    if(data.type==="checklist"){
        checklistItems.forEach((item,idx)=>{
            formdata.append(`checklistItems[${idx}]`,item)

        })
        
    }
    try {
      const res = await axios.post("http://localhost:5000/api/admin/addresources",formdata, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Resource submitted successfully!");
      console.log(res.data);
      reset();
      setChecklistItems([]);
    } catch (err) {
      console.error("Error uploading resource:", err);
      alert("Failed to upload resource");
    }
  };
  
  return (
    <div className="mt-30"><Resource_form 
     handleFormSubmit={handleFormSubmit} checklistItems={checklistItems} setChecklistItems={setChecklistItems}/></div>
  );
}

export default ResourceForm;
