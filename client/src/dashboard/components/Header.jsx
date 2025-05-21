"use client"
import { useEffect, useRef } from "react";
import { Bell, Menu, ChevronDown, User } from "lucide-react"

export default function Header({ toggleSidebar }) {
  
    const googleTranslateRef = useRef(null)

    useEffect(()=>{
      let intervalId;
            const googleTranslateElementInit = () => {
       if(window.google && window.google.translate){
        clearInterval(intervalId);
        // window.google.TranslateElement({
        //   pageLanguage:"en",
        //   layout:window.google.translate.TranslateElement.InlineLayout.SIMPLE
          
        // }, googleTranslateRef.current)
  
        new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
          layout:window.google.translate.TranslateElement.FloatPosition.TOP_LEFT
        },
        googleTranslateRef.current
      );
  
        console.log(window.google.translate)
       }
    }; 
    intervalId = setInterval(googleTranslateElementInit,100)
    
    },[])

  return (
    <header className="bg-white h-16 px-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
      <button onClick={toggleSidebar} className="p-2 rounded-md bg-slate-600 text-white">
        <Menu size={24} />
      </button>

      <div className="flex items-center space-x-4">
        <div id="google_translate_element" ref={googleTranslateRef}></div>
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
