
import { Book, BookMarked, Briefcase, Calendar, Home, University, Users, Weight } from "lucide-react"
import { useState, useRef, useEffect} from "react"
import { NavLink } from "react-router-dom"
import logo from "../../assets/logo.png"
import {useSelector} from "react-redux"

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")
 const {user} = useSelector((state)=>state.auth)
  const menuItems = [
    { name: "Dashboard", icon: Home , to:"/dashboard/home"},
    { name: "Balance", icon: Weight, to:"/dashboard/balance" },
    { name: "Debts", icon: Calendar , to:"/dashboard/debts" }
  ]

   const adminItems = [
    { name: "Dashboard", icon: Home , to:"/dashboard/home"},
    { name: "Savings", icon: Book , to:"/dashboard/savings"},
    { name: "withdrawal", icon: University , to:"/dashboard/withdrawal"},
    { name: "Users", icon: Users , to:"/dashboard/users"},
    { name: "Deposit Request", icon: Briefcase , to:"/dashboard/deposit-request"},
    { name: "Historique", icon:BookMarked , to:"/dashboard/historic"},
   
  ]

  const googleTranslateRef = useRef(null)
  useEffect(()=>{
        let intervalId;
              const googleTranslateElementInit = () => {
                  if(window.google && window.google.translate){
                    clearInterval(intervalId);
  
                    new window.google.translate.TranslateElement(
                    {
                      pageLanguage: "en",
                      autoDisplay: false,
                      layout:window.google.translate.TranslateElement.FloatPosition.TOP_LEFT
                    },
                    googleTranslateRef.current
                  );
              
                   
                  }
                }; 
  
      intervalId = setInterval(googleTranslateElementInit,100)
     
  },[])

  return (
    <div className={`fixed w-64 bg-navy-900 text-white flex flex-col z-40 h-full`}>
      {/* Logo */}
      <div className="flex items-center p-4">
        <div className="bg-blue-600 rounded-full h-14 w-14 flex items-center justify-center mr-3">
          <img src={logo} alt="Logo" className="w-full rounded-full h-full"/>  
        </div>
       <div className="block">
         <p className="font-bold text-xl">ISHEMA</p>
         <p className="font-bold text-xs">Saving Group</p>
       </div>
      </div>

      {/* Navigation */}
      <nav className="mt-1 flex-1">
        <ul>
          {user && user.role == "admin" && <li className="px-4 py-3 ">
            <h2 className=" font-bold text-xl" style={{color:"#fff"}}>ADMIN</h2>
          </li>}
          {user && user.role === "user" && menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.name

            return (
              <li key={item.name} className="mb-1">
                <NavLink
                  to={item.to}
                  
                  className="flex items-center w-full px-4 py-3 text-left text-gray-300 hover:bg-navy-800"
                >
                  <Icon size={16} className="mr-3" />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="ml-auto">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  )}
                </NavLink>
              </li>
            )
          })}

           {user && user.role === "admin" && adminItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.name

            return (
              <li key={item.name} className="mb-1">
                <NavLink
                  to={item.to}
                  
                  className="flex items-center w-full px-4 py-3 text-left text-gray-300 hover:bg-navy-800"
                >
                  <Icon size={16} className="mr-3" />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="ml-auto">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  )}
                </NavLink>
              </li>
            )
          })}

          <li className="px-2">
            <div id="google_translate_element" style={{display:"none"}} ref={googleTranslateRef}></div>

          </li>
        </ul>
      </nav>
    </div>
  )
}
