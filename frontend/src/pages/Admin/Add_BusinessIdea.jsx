import React, { useState ,useEffect} from "react";
import axios from "axios"
import BusinessIdeaForm from "../../components/Common/BusinessIdeaForm";

const Add_BusinessIdea= () => {
  const initialState={
    title: "",
    description: "",
    category: "",
    requiredSkills: "",
    estimatedCost: "",
    tags: "",
    category: "",
    roadmapId: "",
    image: null,
  }


const [formData, setFormData] = useState({initialState});
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const[category1,setCategory1]=useState([]);
  useEffect(()=>{
    const fetchCategory=async()=>{
      try{
      const res=await axios.get("http://localhost:5000/api/admin/getcategory");
      setCategory1(res.data);
      }catch(error){
        console.log(error);
      }
      
      
    }
    fetchCategory();
  },[]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formdata= new FormData();
    formdata.append("title",formData.title);
    formdata.append("description",formData.description);
    formdata.append("category",formData.category);
    formdata.append("requiredSkills",formData.requiredSkills);
    formdata.append("estimatedCost",formData.estimatedCost);
    formdata.append("tags",formData.tags);
    
   
    formdata.append("image",formData.image);

    try{
     
    const res= await axios.post("http://localhost:5000/api/admin/createIdea",formdata,{headers:
      {"Content-Type":"multipart/form-data"}
     
    });
     setFormData(initialState);
  }
 catch(err) {
  console.log("Frontend error:", err.response?.data || err.message);

  }
  alert("new business idea added");

  };

  return (
    <div className="mt-25">
      <BusinessIdeaForm formData={formData} handleChange={handleChange} category1={category1} handleSubmit={handleSubmit} />
    </div>
   
    
  );
};

export default Add_BusinessIdea;
