"use client"
import { useEffect, useRef , useState} from "react";
import { Bell, Menu, ChevronDown, Settings , LogOut, Mail, MessageSquare, AlertCircle  } from "lucide-react"
import Language from "./Language";

export default function Header({ toggleSidebar, user, logout }) {

   const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false)
  const userDropdownRef = useRef(null)
  const notificationDropdownRef = useRef(null)
  

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New message from John Doe",
      description: "You have received a new message",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "alert",
      title: "System maintenance scheduled",
      description: "Maintenance will start at 2:00 AM",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "info",
      title: "New user registered",
      description: "Jane Smith has joined the platform",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "message",
      title: "Payment received",
      description: "You received a payment of 1500 FRW",
      time: "5 hours ago",
      unread: false,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  
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
        includedLanguages: "fr,es,sw,rw,en",
        layout:window.google.translate.TranslateElement.FloatPosition.TOP_LEFT
      },
      googleTranslateRef.current
    );
     }
  }; 
  intervalId = setInterval(googleTranslateElementInit,100)
  
  },[])

  const handleLanguageChange = (value) => {
 const lang = value.code;
  const combo = document.querySelector(".goog-te-combo");

  if (combo) {
    combo.value = lang;

    const event = new Event("change");
    combo.dispatchEvent(event);
  }
};



    useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false)
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  
  const getNotificationIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageSquare size={16} className="text-blue-500" />
      case "alert":
        return <AlertCircle size={16} className="text-red-500" />
      default:
        return <Mail size={16} className="text-gray-500" />
    }
  }


  return (
    <header className="bg-white h-24 lg:h-16 px-4 flex items-center justify-between border-b border-gray-300 shadow-sm w-full z-64">
      
      <div className="flex relative gap-2 items-center">
        <button onClick={toggleSidebar} className="p-2 rounded-md bg-navy-900 text-white cursor-pointer">
        <Menu size={24} />
      </button>
       <div  className="lg:hidden flex flex-col relative">
          <h3 className="text-xl font-bold text-green-600 p-0 m-0" translate="no">ISHEMA</h3>
          <small className="text-xs  whitespace-nowrap  text-center w-full" style={{fontSize: 10}} translate="no">Saving Group</small>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div id="google_translate_element" className="" ref={googleTranslateRef}></div>
        
        <div className="responsive-sm">
           <Language onLanguageChange={handleLanguageChange} />
        </div>

         <div className="flex items-center justify-between space-x-4">
        {/* Notifications Dropdown */}
        <div className="relative notification" ref={notificationDropdownRef}>
          <button
            onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-300 z-50">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-300 hover:bg-gray-50 cursor-pointer ${
                      notification.unread ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                          {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
          >
            <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=005f78&color=fff`} className="w-10 h-10  rounded-full"/>
            <span className="font-medium text-xs text-slate-700 whitespace-nowrap">Hi, {user?.name}</span>
            <ChevronDown
              size={16}
              className={`ml-2 text-gray-500 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {userDropdownOpen && (
            <div className="absolute  right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
              <div className="p-4 border-b border-gray-400">
                <div className="flex items-center space-x-3">
                  
                  <div>
                    <p className=" text-sm text-slate-700">Hi, {user?.name}</p>
                    {/* <p className="text-xs text-gray-500 word-wrap text-wrap">{user.email}</p> */}
                  </div>
                </div>
              </div>
              <div className="py-2">
                
                <a
                  href="#"
                  className="flex items-center  px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Settings size={16} className="mr-3" />
                  Account Settings
                </a>
            
              </div>
              <div className="border-t border-gray-200 py-2">
                <button
                  className="flex items-center px-2 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full cursor-pointer"
                  onClick={logout}
                >
                  <LogOut size={16} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      </div>
    </header>
  )
}
