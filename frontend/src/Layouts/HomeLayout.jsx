//homelayout
import React from 'react'
import Homenav from '../components/Navbar/Homenav'
import HomeSidebar from '../components/Sidebar/Homesidebar'
import {Outlet} from 'react-router-dom'


const HomeLayout = () => {
  return (
   
        
        <div className="flex-1">
            <Homenav/>
               <Outlet/>
            </div>
    
  )
}

export default HomeLayout