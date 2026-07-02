import React, { useState } from "react";
import {
  MessageSquareWarning,
  Send,
  Upload,
} from "lucide-react";
import axios from "axios"

const FeedbackReportForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "Medium",
    description: "",
  });



  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    const token=localStorage.getItem("token");
    e.preventDefault();
    try{
    const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/addfeedback`,formData,{headers:{Authorization:`Bearer ${token}`}});
    console.log(res.data)
    }catch(error){
        console.log(error);
    }


   

    
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 mt-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <MessageSquareWarning
              className="text-blue-600"
              size={30}
            />

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Submit Feedback / Report
              </h1>

              <p className="text-slate-500">
                Report issues, suggest improvements,
                or share feedback with the SkillHub team.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8 space-y-6"
        >
          {/* Subject */}
          <div>
            <label className="block mb-2 font-medium">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter report subject"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Bug">
                  Bug Report
                </option>

                <option value="Feature">
                  Feature Request
                </option>

                <option value="Roadmap">
                  Roadmap Issue
                </option>

                <option value="Mentor">
                  Mentor Feedback
                </option>

                <option value="General">
                  General Feedback
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

        
          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain your issue or feedback..."
              className="w-full border rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500   text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          >
            <Send size={18} />
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackReportForm;