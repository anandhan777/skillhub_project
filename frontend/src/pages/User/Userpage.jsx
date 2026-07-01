import userbg from "../../assets/user_images/userpage.png"
import {useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";
 
const UserHome = () => {
 const navigate=useNavigate();
    useEffect(()=>{
       const user=JSON.parse(localStorage.getItem("user"));
       console.log(user);
       const token=localStorage.getItem("token");
        if(user.isProfile){
        navigate(`/user`);
       }
       else{
        navigate("/user/profilecreate");
       }
      },[]);
    


  
 
  const features = [
    {
      title: "Expert-Led Courses",
      description: "Learn from industry experts and gain in-demand skills.",
      icon: "📚",
    },
    {
      title: "Learn At Your Pace",
      description: "Access courses anytime, anywhere and learn your way.",
      icon: "⏰",
    },
    {
      title: "Earn Certificates",
      description: "Showcase your achievements with verified certificates.",
      icon: "🏆",
    },
    {
      title: "Community Support",
      description: "Connect, ask questions and grow together.",
      icon: "👥",
    },
    {
      title: "Track Progress",
      description: "Monitor your learning journey and celebrate milestones.",
      icon: "📈",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen z-0">
      {/* Hero Section */}
      <section className="h-[50vh] bg-white "  style={{backgroundImage:`url(${userbg})`, height:"400px", backgroundPosition:"center"}}>
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="grid md:grid-cols-1 h-full items-center gap-10">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold text-white leading-tight pt-20">
                Learn Skills.
            
                Build Your Future.
              </h1>

              <p className="mt-3 text-lg text-gray-900 max-w-lg">
                Discover expert-led courses across technology, business,
                marketing, and design. Learn at your pace and achieve your
                career goals.
              </p>

              <div className="flex gap-4 mt-4">
                <button className="px-6 py-3 duration-300 bg-blue-400 hover:bg-cyan-400 text-white rounded-lg font-medium">
                  Explore Courses
                </button>

                <button className="px-6 py-3 border border-white text-white rounded-lg font-medium">
                  Learn More
                </button>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-3">
                  <img
                    src="https://i.pravatar.cc/40?img=1"
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://i.pravatar.cc/40?img=2"
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://i.pravatar.cc/40?img=3"
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>

                <p className="text-gray-600">
                  Joined by <span className="font-semibold">10,000+</span>{" "}
                  learners
                </p>
              </div>
            </div>

            {/* Right Image */}
          
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-[1440px] mx-auto px-10 pt-26 pb-10 -mt-20 ">
        <div className="bg-white rounded-3xl  p-10 shadow-sm">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Everything You Need To Succeed
          </h2>

          <div className="grid md:grid-cols-5 gap-8 mt-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto bg-cyan-100 rounded-xl flex items-center justify-center text-3xl">
                  {feature.icon}
                </div>

                <h3 className="font-semibold mt-5 text-lg">
                  {feature.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="max-w-7xl mx-auto  pb-16">
        <div className="bg-white rounded-3xl shadow-sm p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                10,000+
              </h3>
              <p className="text-gray-600 mt-2">Active Learners</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                500+
              </h3>
              <p className="text-gray-600 mt-2">Courses</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                200+
              </h3>
              <p className="text-gray-600 mt-2">Mentors</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                4.8/5
              </h3>
              <p className="text-gray-600 mt-2">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserHome;