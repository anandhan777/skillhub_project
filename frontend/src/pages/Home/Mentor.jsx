import React from 'react'
import mentorbg from "../../assets/Home_images/mentorbg.jpeg"
import "./Mentor.css"

function Mentor() {
  const mentors = [
  {
    id: 1,
    name: "Aarav Mehta",
    expertise: "Full‑Stack Development",
    bio: "Guides students in building scalable web apps using React, Node.js, and modern frameworks.",
    sessions: 40,
    experience: "6 years",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: 2,
    name: "Sophia Martinez",
    expertise: "Fashion Design",
    bio: "Helps mentees explore creative clothing design, styling, and sustainable fashion practices.",
    sessions: 28,
    experience: "5 years",
    image: "https://randomuser.me/api/portraits/women/7.jpg"
  },
  
  {
    id: 3,
    name: "Liam Chen",
    expertise: "Music Composition",
    bio: "Passionate about teaching piano, songwriting, and digital music production.",
    sessions: 35,
    experience: "7 years",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 4,
    name: "Isabella Rossi",
    expertise: "Culinary Arts",
    bio: "Mentors aspiring chefs in world cuisines, baking, and food presentation.",
    sessions: 50,
    experience: "10 years",
    image: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  
  {
    id: 5,
    name: "Noah Patel",
    expertise: "Animation & Graphics",
    bio: "Specializes in 2D/3D animation, motion graphics, and storytelling through visuals.",
    sessions: 32,
    experience: "6 years",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 6,
    name: "Emma Johnson",
    expertise: "Art & Craft",
    bio: "Encourages creativity through DIY crafts, handmade projects, and sustainable art.",
    sessions: 22,
    experience: "4 years",
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  
  {
    id: 7,
    name: "Daniel Kim",
    expertise: "Painting",
    bio: "Teaches techniques in watercolor, acrylic, and oil painting for beginners and advanced learners.",
    sessions: 38,
    experience: "8 years",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 8,
    name: "Maya Singh",
    expertise: "Graphic Design",
    bio: "Mentors on digital design, branding, and creative use of tools like Photoshop and Illustrator.",
    sessions: 45,
    experience: "9 years",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
];

  return (
    <div style={{backgroundImage:`url(${mentorbg})`,backgroundSize:"cover",backgroundPosition:"center",height:"900px"}} className="mt-20 ">
        <h1 className="text-3xl font-bold text-center text-white pt-10 mt-10">Learn from Experts</h1>
        <p className="text-white font-light text-center text-xl">Connect with experienced mentors who guide you at every step.</p>
        <div className=" mt-10 ">
          <div className=" ">
            <div className="container1 grid grid-cols-8 w-full gap-20 px-20">
              {mentors.map((m)=>(
                <div className="border-2 border-cyan-700 h-[320px] w-[300px] rounded-2xl p-4 pt-8 flex flex-col items-center shadow-lg bg-white">
  {/* Avatar */}
  <img
    src={m.image}
    alt="Mentor Avatar"
    className="rounded-full border-2 h-26 w-26 border-blue-500 mb-3"
  />

  {/* Name & Expertise */}
  <h2 className="text-lg font-semibold text-blue-700">{m.name}</h2>
  <p className="text-sm text-gray-900">{m.expertise}</p>

  {/* Bio */}
  <p className="text-xs text-gray-900 text-center mt-2">
    {m.bio}
  </p>

  {/* Stats */}
  <div className="flex justify-center w-full mt-3 text-sm text-gray-900">
    <span>Sessions: {m.sessions}</span>
    </div><div>
    <span>Experience: {m.experience}</span>
  </div>

  {/* Action Buttons */}
  
</div>
))}
           
 </div>
  
  </div>
  </div>
    <div className=" mt-10 ">
    <div className="container2 grid grid-cols-8 w-full gap-20">
  {mentors.map((m)=>(
                <div className="border-2 border-blue-700 h-[320px] w-[300px] rounded-2xl p-4 pt-8 flex flex-col items-center shadow-lg bg-white">
  {/* Avatar */}
  <img
    src={m.image}
    alt="Mentor Avatar"
    className="rounded-full border-2 h-26 w-26 border-blue-500 mb-3"
  />

  {/* Name & Expertise */}
  <h2 className="text-lg font-semibold text-blue-400">{m.name}</h2>
  <p className="text-sm text-gray-900">{m.expertise}</p>

  {/* Bio */}
  <p className="text-xs text-gray-900 text-center mt-2">
    {m.bio}
  </p>

  {/* Stats */}
  <div className="flex justify-center w-full mt-3 text-sm text-gray-900">
    <span>Sessions: {m.sessions}</span>
    </div><div>
    <span>Experience: {m.experience}</span>
  </div>

  {/* Action Buttons */}
  
</div>
))}
  </div>
  
            
           
        </div>
    </div>
  )
}

export default Mentor