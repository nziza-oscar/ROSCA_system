import React from 'react'
import {  User,
    ShoppingBag,
    MapPin,
    Bell,
    Lock,
    LogOut,
    
    CreditCard,
  } from "lucide-react"

const Sidebar = ({user, setActiveTab , activeTab}) => {
  return (
    <div className=" md:col-span-1  ">
    <div className="hidden sm:block bg-slate-100 rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`} alt="u" className="rounded-full w-14"/>
           
          </div>
          <div>
            <h2 className="text-lg font-semibold capitalize">{user?.name}</h2>
            <p className="text-sm text-gray-500">Member since {new Date(user?.createdAt).toDateString()}</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setActiveTab("personal-info")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "personal-info" ? "bg-purple-500 text-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <User size={16} className=" mr-3" />
                <span className='text-sm' >Personal Info</span>
              </div>
             
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "orders" ? "bg-purple-500 text-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <ShoppingBag size={16} className=" mr-3" />
                <span className='text-sm'>My Orders</span>
              </div>
             
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "addresses" ? "bg-purple-500 text-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <MapPin size={16} className=" mr-3" />
                <span className='whitespace-nowrap text-sm'>My Address</span>
              </div>
              
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("payment")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "payment" ? "bg-purple-500 text-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <CreditCard size={16} className=" mr-3" />
                <span className='whitespace-nowrap text-sm'>Payment Methods</span>
              </div>
             
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "notifications" ? "bg-purple-500 text-purple-600" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <Bell size={16} className=" mr-3" />
                <span className='text-sm'>Notifications</span>
              </div>
             
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "security" ? "bg-purple-500 text-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <Lock size={16} className=" mr-3" />
                <span className='text-sm'>Security</span>
              </div>
             
            </button>
          </li>
        </ul>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-md cursor-pointer ">
            <LogOut className=" mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>

    <div className=" shadow overflow-hidden hidden">
    
      <nav className="">
        <ul className="flex">
          <li>
            <button
              onClick={() => setActiveTab("personal-info")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "personal-info" ? "bg-purple-500 text-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <User size={20} />
               
              </div>
             
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "orders" ? "bg-purple-500 text-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <ShoppingBag size={20} />
              
              </div>
             
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "addresses" ? "bg-purple-500 text-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <MapPin size={20}  />
               
              </div>
              
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("payment")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "payment" ? "bg-purple-500 text-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <CreditCard size={20}  />
             
              </div>
             
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "notifications" ? "bg-purple-500 text-purple-600" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <Bell size={20} />
                
              </div>
             
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer ${
                activeTab === "security" ? "bg-purple-500 text-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <Lock size={20} />
            
              </div>
             
            </button>
          </li>
        </ul>

      </nav>
    </div>

  </div>
  )
}

export default Sidebar