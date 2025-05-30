import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../dashboard/components/Layout'
import Unauthorized from '../dashboard/components/Unauthorized'

const ProtectedRoutes = () => {
  const isAuthenticated = !!sessionStorage.getItem('nihemart_token') 


  return isAuthenticated ? <Layout/> : <Navigate to="/login" />
}




export const ProtectedPage = ({children})=>{
 const isAuthenticated = !!sessionStorage.getItem('nihemart_token') 

 return isAuthenticated  ? <>{children}</> : <Unauthorized/>
  
}
export default ProtectedRoutes
