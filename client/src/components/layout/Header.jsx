import React, { useRef,useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useEffect } from "react";
import logo from "../../assets/logo.png"
const Header = () => {
 
   const googleTranslateRef = useRef(null)

  //     const googleTranslateElementInit = () => {
    // new window.google.translate.TranslateElement(
    //   {
    //     pageLanguage: "en",
    //     autoDisplay: false,
    //     layout:window.google.translate.TranslateElement.InlineLayout.SIMPLE
    //   },
    //   "google_translate_element"
    // );
  // };
  useEffect(()=>{
    let intervalId;
          const googleTranslateElementInit = () => {
     if(window.google && window.google.translate){
      clearInterval(intervalId);

      new window.google.translate.TranslateElement(
      {
        pageLanguage: "rw",
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
      <nav className="bg-blue-500 text-white sticky top-0 z-40 w-full">
              <div className="mx-auto px-4 py-3 block sm:flex items-center justify-around">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 rounded-full h-12 w-12 flex items-center justify-center">
                      <img src={logo} alt='LOGO' className='rounded-full h-full'/>
                    </div>
                      <div className="flex flex-col gap-0">
                          <span className="font-bold text-xl">ISHEMA</span>
                          <span className="font-bold text-xs -top-2">Saving Group</span>
                      </div>
                  </div>
                  <div className="">
                    
                    <ul className='block sm:flex space-x-8'>
                      <li>
                        <NavLink to="/" className="py-2 border-white">Home </NavLink>
                      </li>
                      <li>
                        <a href="#" className="py-2 hover:border-b-2 hover:border-white">
                      Mission
                    </a></li>
                      <li>
                         <a href="#" className="py-2 hover:border-b-2 hover:border-white">
                          How to
                        </a>
                      </li>
                      <li>
                         <Link to="/login" className="py-2 hover:border-b-2 hover:border-white">
                      Login
                    </Link>
                      </li>
                      <li>
                        <Link to="/register" className="py-2 hover:border-b-2 hover:border-white">
                      Register
                    </Link>
                      </li>
                      <li>
                        
                        <div id="google_translate_element" ref={googleTranslateRef}></div>
                      </li>
                    </ul>
                  </div>
              </div>
      </nav>

  )
}

export default Header



                   
                    
                   
                   
                      
