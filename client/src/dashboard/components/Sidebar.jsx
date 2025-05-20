"use client"

import { Home, Users, DollarSign, BarChart2, MessageSquare, Settings, LogOut } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import logo from "../../assets/logo.png"
export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")

  const menuItems = [
    { name: "Dashboard", icon: Home , to:"/dashboard/home"},
    { name: "Debtors", icon: DollarSign, to:"/dashboard/debtors" },
    { name: "Users", icon: Users, to:"/dashboard/users" },
    { name: "Reports", icon: BarChart2, to:"/dashboard/reports" },
    { name: "Feedbacks", icon: MessageSquare, to:"/dashboard/feedbacks" },
    { name: "Settings", icon: Settings, to:"/dashboard/settings" },
    { name: "Logout", icon: LogOut, to:"" },
  ]

  return (
    <div className="h-screen w-60 bg-navy-900 text-white flex flex-col">
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
      <nav className="mt-8 flex-1">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.name

            return (
              <li key={item.name} className="mb-1">
                <NavLink
                  to={item.to}
                  
                  className="flex items-center w-full px-4 py-3 text-left text-gray-300 hover:bg-navy-800"
                >
                  <Icon size={20} className="mr-3" />
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
        </ul>
      </nav>
    </div>
  )
}
