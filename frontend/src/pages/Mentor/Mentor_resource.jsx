import React from 'react'
import {useState} from "react"
import Resource_form from '../../components/Common/Resource_form'
import axios from "axios"
import {useForm} from "react-hook-form"

function Mentor_resource() {
     
  const {reset}=useForm()
  const [checklistItems, setChecklistItems] = useState([]);
 

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
    const user=JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post(`
${import.meta.env.VITE_API_URL}/api/mentor/addresource_request/${user.id}`,formdata, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("you request is sent to amin for verify the resource wait for their response!");
      console.log(res.data);
      reset();
      setChecklistItems([]);
    } catch (err) {
      console.error("Error uploading resource:", err);
      alert("Failed to upload resource");
    }
  };
  return (
    <div className='mt-26'><Resource_form 
     handleFormSubmit={handleFormSubmit} checklistItems={checklistItems} setChecklistItems={setChecklistItems}/></div>
  )
}

export default Mentor_resource