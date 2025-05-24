import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCartThunk, fetchCategories, fetchProducts } from "../../actions/dashboard"
import { fetchMyData } from "../../actions/users"

const Layout = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  const { categories } = useSelector((state)=>state.categories)
  const {cart} = useSelector((state)=>state.cart)

// console.log(c)
  useEffect(()=>{
    dispatch(fetchCategories())
    dispatch(fetchMyData())
    dispatch(fetchProducts())
    dispatch(fetchCartThunk())
  },[])
    
  return (
    <div className="flex flex-col min-h-screen">
      <Header  />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

