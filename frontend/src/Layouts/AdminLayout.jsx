import React from 'react'
import Adminnav from '../components/Navbar/Adminnav'
import Adminsidebar from '../components/Sidebar/Adminsidebar'

import {Outlet} from 'react-router-dom'

const AdminLayout = () => {
  return (
     <div className="flex">
            <Adminsidebar/>
            
            <div className="flex-1">
                <Adminnav/>
                   <Outlet/>
                </div>
        </div>
  )
}



export default AdminLayout