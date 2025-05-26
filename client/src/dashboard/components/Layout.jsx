"use client"

import { use, useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyData, fetchUsers } from "../../actions/users"
import { logout } from "../../reducers/users/authSlice"
import { fetchDeposits, skippedDeposit } from "../../actions/dashboard"

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const dispatch = useDispatch()
  const {user, loading} = useSelector((state)=>state.auth)
  const navigate = useNavigate()


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(()=>{
    const dates = new Date();
    const yyyyMmDd = dates.toISOString().split('T')[0];
    const [year,month,day] = yyyyMmDd.split("-")
     dispatch(fetchMyData())
    dispatch(fetchDeposits())
    dispatch(skippedDeposit({year,month,day}))
    dispatch(fetchUsers())
  },[])

  const handleLogout = ()=>{
     dispatch(logout())
    navigate("/")
  }

  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-60" : "ml-0"}`}>
      { user && !loading &&  <div className="sticky top-0 z-60"><Header toggleSidebar={toggleSidebar} user={user}  logout={handleLogout}/></div>}

        <main className="flex-1 overflow-none p-4">
          <Outlet/>
        </main>
        <footer className="py-6 mt-auto">
        <div className="container mx-auto text-center text-gray-500">
          <p>All right is reserved by stev 2025</p>
        </div>
      </footer>
      </div>
    </div>
  )
}

