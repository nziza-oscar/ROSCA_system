"use client"

import { Bell, Menu, ChevronDown, User } from "lucide-react"

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-white h-16 px-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
      <button onClick={toggleSidebar} className="p-2 rounded-md bg-slate-600 text-white">
        <Menu size={24} />
      </button>

      <div className="flex items-center space-x-4">
        <button className="relative p-2">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>

        <div className="flex items-center">
          <User  alt="User avatar" className="rounded-full mr-2" size={20} />
          <span className="font-medium">Steven</span>
          <ChevronDown size={16} className="ml-2 text-gray-500" />
        </div>
      </div>
    </header>
  )
}
