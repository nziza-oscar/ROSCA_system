"use client"

import {  useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { Outlet, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyData, fetchUsers } from "../../actions/users"
import { logout } from "../../reducers/users/authSlice"
import { fetchDeposits, getAllUserBalances, skippedDeposit } from "../../actions/dashboard"
import useNotificationChecker from "../../lib/useNotificationChecker"

export default function Layout() {
   const [screenSize, setScreenSize] = useState("");
   const [openSidebar, setOpenSidebar] = useState(true)
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  const location = useLocation()

 

  useEffect(()=>{
    const dates = new Date();
    const yyyyMmDd = dates.toISOString().split('T')[0];
    const [year,month,day] = yyyyMmDd.split("-")
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    dispatch(fetchMyData())
    dispatch(fetchDeposits({startDate: startDate.toISOString().split("T")[0] ,endDate: endDate.toISOString().split("T")[0]}))
    dispatch(skippedDeposit({year,month,day}))
    dispatch(fetchUsers())
  },[])


   useEffect(()=>{
        if(user){
           if(user.role == "admin"){
            dispatch(getAllUserBalances())
           }
        }
   },[user])

    
   const getSize = () => {
     const width = window.innerWidth;
     if (width < 640) {
    
       return "sm";
     } else if (width < 768) {
       return "md";
     } else if (width < 1024) {
       return "lg";
     } else if (width < 1280) {
       return "xl";
     } else {
       return "2xl";
     }
   };

   useEffect(() => {
     const handleResize = () => {
       setScreenSize(getSize());
     };
 
     handleResize(); // set initial value
     window.addEventListener("resize", handleResize);
 
     return () => window.removeEventListener("resize", handleResize);
   }, []);
 

    useEffect(()=>{
        if(screenSize == "sm" || screenSize == "md"){
           setOpenSidebar(false)
        }
        else{
          setOpenSidebar(true)
        }
    },[screenSize,location])

  
   const LogoutUser = ()=>{
     dispatch(logout())
   }

   const handleOpenSidebar = ()=>{
    setOpenSidebar((prev)=>!prev)
   }

   useNotificationChecker()

   
  return (
    <div className="min-h-screen bg-gray-100 w-full">
   
         { openSidebar && <Sidebar   />}
      <div className={ `${!openSidebar?"ml-0":"lg:ml-64"}  flex-1 flex flex-col `}>
          <Header toggleSidebar={handleOpenSidebar} user={user} logout={LogoutUser} />
          <main className="w-full  p-4 bg-gray-50 overflow-x-hidden relative">
            <Outlet/>
          </main>
          <footer className="py-6 mt-auto">
          <div className="container mx-auto text-center text-gray-500">
            <p>All right is reserved by ISHEMA &COPY; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

