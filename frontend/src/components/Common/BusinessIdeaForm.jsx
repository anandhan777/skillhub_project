import React from 'react'

function BusinessIdeaForm({formData,handleChange,handleSubmit,category1}) {
  return (
    <div>
        <div>
       {/* <div className="circle w-[400px] h-[400px] left-74 rounded-full bg-cyan-200 blur-[160px]  mix-blend-multiply absolute"></div>
       <div className="circle w-[400px] h-[400px] right-74 top-64 rounded-full bg-cyan-300 blur-[160px] mix-blend-multiply absolute"></div> */}
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6  rounded-lg space-y-4 relative border-2 border-gray-400 bg-white mt-12"
    >
      <h2 className="text-xl font-bold">Add Business Idea</h2>
      

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title||""}
        onChange={handleChange}
        className="w-full border p-2 rounded border-gray-500 bg-white ring-2 focus:ring-cyan-500 ring-transparent focus:border-transparent"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded border-gray-500 bg-white ring-2 focus:ring-cyan-500 ring-transparent focus:border-transparent"
        required
      />

        <select
            name="category"
            value={formData.category||""}
            onChange={handleChange}
            className="w-full border p-2 rounded border-gray-500 bg-white ring-2 focus:ring-cyan-500 ring-transparent focus:border-transparent"
          >
            <option value="">select a category</option>
            {category1.map((m)=>(
               <option value={m._id}>{m.name}</option>
            ))}
           
            
          </select>
      <input
        type="text"
        name="requiredSkills"
        placeholder="Required Skills (comma separated)"
        value={formData.requiredSkills||""}
        onChange={handleChange}
        className="w-full border p-2 rounded border-gray-500 bg-white ring-2 focus:ring-cyan-500 ring-transparent focus:border-transparent"
      />

      <input
        type="text"
        name="estimatedCost"
        placeholder="Estimated Cost"
        value={formData.estimatedCost}
        onChange={handleChange}
        className="w-full border p-2 rounded border-gray-500 bg-white ring-2 focus:ring-cyan-500 ring-transparent focus:border-transparent"
        required
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
        className="w-full border p-2 rounded border-gray-500 bg-white ring-2 focus:ring-cyan-500 ring-transparent focus:border-transparent"
      />

   
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full border p-2 pl-5 rounded border-1 shadow rounded-full border-gray-500 bg-gray-300 focus:border-transparent  bg-white ring-2 focus:ring-cyan-500 ring-transparent"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-2 rounded-2xl  "
      >
        Submit Idea
      </button>
    </form>
    </div>
    </div>
  )
}

export default BusinessIdeaForm