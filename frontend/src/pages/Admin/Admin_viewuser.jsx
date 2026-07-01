import React from "react";
import {useState,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaUsers ,FaSearch} from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Eye } from "lucide-react";
const UserTable = () => {

  const navigate=useNavigate();

    const[users,setUsers]=useState([]);
    const[search,setSearch]=useState("");
    useEffect(()=>{
       
        const getUsers=async()=>{
        try{
        const res=await axios.get("http://localhost:5000/api/users/getAllUsers");
        setUsers(res.data);

        
        }catch(err){
            console.log(err);
        }
    }
        getUsers();
        },[]);
    const userDelete=async(id,name)=>{
        await axios.delete(`http://localhost:5000/api/admin/admin/delete_user/${id}`)
        alert(`do you really want to delete ${name}`);
        setUsers(users.filter((m)=>m._id!==id));
      
    }
      const viewProfile=(uid)=>{

      navigate(`/admin/viewusers/viewuserprofile/${uid}`);
      
    };
    const searchUser=async()=>{
      try {
        if(search.trim()!==""){
        const data=await axios.get(`http://localhost:5000/api/admin/searchusers?search=${search}`)
        setUsers(data.data);
        console.log(data.data);
        console.log(typeof data.data);
        }else{
          setUsers([]);
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  return (
    <div className="overflow-x-auto flex justify-center flex-col items-center mt-20 mx-20 ">
        <h1 className="text-3xl pb-6">All users</h1>
     
      <div className="flex gap-2 items-center mb-4">
      <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="enter username" className="h-10 pl-5  w-[500px] ring-2 ring-gray-500 focus:ring-cyan-500 focus:outline-none rounded-2xl"/>
      <button onClick={searchUser} className="bg-gradient-to-r from-blue-600 to-cyan-400 p-3 rounded-full text-white"><FaSearch/></button>
      </div>
       <table className="min-w-full bg-white border border-gray-200 rounded-t">
                <thead className="bg-gradient-to-r from-blue-700 bg-cyan-500 text-white ">
                  <tr>
                    <th className="py-3 px-6 text-left">profile</th>
                    <th className="py-3 px-6 text-left">usermame</th>
                    <th className="py-3 px-6 text-center">email</th>
                    <th className="py-3 px-6 text-center">role</th>
                    <th className="py-3 px-6 text-center">status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-b hover:bg-gray-100 transition">
                      <td className="py-3 px-6 font-semibold text-gray-700"><img src={`http://localhost:5000${u.profilePicture}`} className="h-15 w-15 rounded-full object-cover"/></td>
                      <td className="py-3 px-6 font-semibold text-gray-700">{u.user.name}</td>
                      <td className="py-3 px-6 text-gray-600 text-center">{u.user.email}</td>
                      <td className="py-3 px-6 text-gray-600 text-center">{u.user.role}</td>
                      <td className="py-3 px-6 text-gray-600 text-center">{u.user.status}</td>
                      <td className="py-3 px-3 flex justify-center space-x-4">
                        <button className="p-2 px-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition" onClick={()=>handleEdit(u._id)}>
                          <FaEdit />
                        </button>
                        <button className="p-2 px-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition">
                          <FaTrash />
                        </button>
                       
                         <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"onClick={()=>viewProfile(u._id)}>
                      <Eye size={18} />
                        View Profile
                       </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
    </div>
  );
};

export default UserTable
// Example usage
// const sampleUsers = [
//   { id: 1, username: "anand_dev", email: "anand@example.com" },
//   { id: 2, username: "jane_doe", email: "jane@example.com" },
//   { id: 3, username: "john_smith", email: "john@example.com" },
// ];

// export default function App() {
//   const handleView = (user) => alert(`Viewing profile of ${user.username}`);
//   const handleEdit = (user) => alert(`Editing ${user.username}`);
//   const handleDelete = (user) => alert(`Deleting ${user.username}`);

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">User List</h1>
//       <UserTable
//         users={sampleUsers}
//         onView={handleView}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }
