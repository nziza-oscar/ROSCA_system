import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchMyData } from "../../actions/users"

const Layout = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)

  useEffect(()=>{
   
  },[])
    
  return (
    <div className="">
      <Header  />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

