import Coding from "../../assets/Home_images/coding.png"
import develop from "../../assets/Home_images/develop.png"
import cook from "../../assets/Home_images/cook.png"
import fashion from "../../assets/Home_images/fashion.png"
import animate from "../../assets/Home_images/animate.png"
import "./Category.css"
// import develop from "../../assets/Home_images/develop.png"
const Category = () => {
  return (
    <div className="bg-gray-50 text-gray-800 pb-20 ">
       
      <h1 className="text-4xl font-bold mb-6 text-center pt-20">Explore Categories</h1>
      <p className="text-lg max-w-2xl mx-auto">
       Discover opportunities across different fields and find the right path for your skills.
      </p>
      <div className="grid grid-cols-3 gap-6 mt-10 px-32 abspolute">
        <div className="w-[400px] h-[400px] rounded-xl overflow-hidden">
            <div className=" wrapper flex ">
                <img src={Coding} className="w-full h-full object-cover rounded-xl"/>
         
            <img src={develop} className="w-full h-full object-cover rounded-xl"/>
            <img src={cook} className="w-full h-full object-cover rounded-xl"/>
           
            <img src={animate} className="w-full h-full object-cover  rounded-xl"/>
            <img src={fashion} className="w-full h-full object-cover  rounded-xl"/>
               </div>
        </div>
        <div className="w-[400px] h-[400px] rounded overflow-hidden">
            <div className=" wrapper flex ">
            <img src={develop} className="w-full h-full object-cover rounded-xl"/>
            <img src={cook} className="w-full h-full object-cover rounded-xl"/>
            <img src={fashion} className="w-full h-full object-cover  rounded-xl"/>
            <img src={animate} className="w-full h-full object-cover  rounded-xl"/>
           
             <img src={Coding} className="w-full h-full object-cover rounded-xl"/>
             </div>
        </div>
        <div className="w-[400px] h-[400px] rounded overflow-hidden">
            <div className=" wrapper flex ">
            <img src={cook} className="w-full h-full object-cover rounded-xl"/>
           
            <img src={animate} className="w-full h-full object-cover  rounded-xl"/>
            <img src={fashion} className="w-full h-full object-cover  rounded-xl"/>
             <img src={Coding} className="w-full h-full object-cover rounded-xl"/>
            <img src={develop} className="w-full h-full object-cover rounded-xl"/>
            </div>
        </div>
        <div className="w-[400px] h-[400px] rounded overflow-hidden">
            <div className=" wrapper flex ">
            <img src={fashion} className="w-full h-full object-cover  rounded-xl"/>
             <img src={animate} className="w-full h-full object-cover  rounded-xl"/>
             
                  <img src={Coding} className="w-full h-full object-cover rounded-xl"/>
            <img src={develop} className="w-full h-full object-cover rounded-xl"/>
            <img src={cook} className="w-full h-full object-cover rounded-xl"/>
            </div>
              
        </div>
        <div className="w-[400px] h-[400px] rounded overflow-hidden">
            <div className=" wrapper flex ">
            <img src={animate} className="w-full h-full object-cover  rounded-xl"/>
            <img src={fashion} className="w-full h-full object-cover  rounded-xl"/>
             <img src={Coding} className="w-full h-full object-cover rounded-xl"/>
            <img src={develop} className="w-full h-full object-cover rounded-xl"/>
            <img src={cook} className="w-full h-full object-cover rounded-xl"/>
             
             </div>
        </div>
        <div className="w-[400px] h-[400px] rounded overflow-hidden">
            <div className=" wrapper flex ">
            <img src={fashion} className="w-full h-full object-cover  rounded-xl"/>
             <img src={Coding} className="w-full h-full object-cover rounded-xl"/>
            <img src={develop} className="w-full h-full object-cover rounded-xl"/>
            <img src={cook} className="w-full h-full object-cover rounded-xl"/>
            
               <img src={animate} className="w-full h-full object-cover  rounded-xl"/>
               </div>
        </div>
       
       
      </div>
    </div>
  );
};

export default Category;
