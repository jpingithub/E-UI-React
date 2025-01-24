import React from 'react'
import AdminSideBar from '../components/AdminSideBar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
      <div className='adminpagelayout'>
          <div className="sidebarlayout">
              <AdminSideBar />
          </div>
          <div className="contentlayout">
              <Outlet/>
          </div>
      </div>
  )
}

export default Admin