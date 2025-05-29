import React, { useRef,useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect } from "react";
import logo from "../../assets/logo.png"
import Language from '../../dashboard/components/Language';
import { Book, CircleHelp, CircleUser, Home, LogIn, Menu, X } from 'lucide-react';
const Header = () => {
 
   const location = useLocation()
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

  const [menu, setMenu] = useState(false)
  
  const handleMenu = ()=>{
    setMenu((prev)=>!prev)
  }


  useEffect(()=>{
      
    window.scrollTo({
      top:0,
      left:0,
      behavior:"instant"
        })
        setMenu(false)
  },[location])

  return (
      <nav className="bg-blue-600 text-white sticky top-0 z-40 w-full">
              <div className="mx-auto px-4 py-3 flex items-center justify-between lg:justify-around relative">

                  <Link to="/" className="flex items-center gap-4 w-full">
                    <div className="bg-blue-600 rounded-full h-12 w-12 flex items-center justify-center">
                      <img src={logo} alt='LOGO' className='rounded-full h-full'/>
                    </div>
                      <div className="flex flex-col gap-0">
                          <span className="font-bold text-xl" translate='no'>ISHEMA</span>
                          <span className="font-bold text-xs -top-2" translate='no'>Saving Group</span>
                      </div>
                  </Link>
                  
                  <div className='responsive-lg'>
                    <button className='bg-navy-900 px-2 py-2 shadow cursor-pointer rounded ' type='button' onClick={handleMenu}>
                    {
                      !menu ? <Menu/> : <X/>
                    }
                  </button>
                  </div>

                   {
                    menu && <div className="responsive-lg absolute top-18 py-3 px-4 right-0 bg-blue-500 w-64 h-screen z-64">
                    
                    <ul className='flex flex-col space-x-8 relative pb-4 h-full'>
                      <li>
                        <Link to="/" className="py-2 border-white flex items-center gap-3"> <Home size={16}/> <span>Home</span> </Link>
                      </li>
                      <li>
                        <Link to="/mission" className="py-2 border-white flex items-center gap-3"> <Book size={16}/> <span>Mission</span> </Link>
                      </li>
                      <li>
                    
                        <Link to="/help" className="py-2 border-white flex items-center gap-3"> <CircleHelp size={16}/> <span>Help</span> </Link>

                      </li>
                      <li>
                    
                        <Link to="/login" className="py-2 border-white flex items-center gap-3"> <LogIn size={16}/> <span translate='no'>Login</span> </Link>

                      </li>

                      
                      <li>
                    
                        <Link to="/register" className="py-2 border-white flex items-center gap-3"> <CircleUser size={16}/> <span translate='no'>Register</span> </Link>

                      </li>
                      <li className='py-3'>
                        
                        <div id="google_translate_element" style={{display: "none"}} ref={googleTranslateRef}></div>
                          <Language onLanguageChange={handleLanguageChange} className='bg-transparent w-full' />
                      </li>
                      <li className='py-5 absolute bottom-20 w-full'>
                        <p className='text-xs text-center' translate='no'><b>ISHEMA</b> &copy; {new Date().getFullYear()}</p>
                      </li>
                    </ul>
                  </div>
                   }


                  <div className="responsive-sm">
                    
                    <ul className='flex space-x-8'>
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
                        
                        <div id="google_translate_element" style={{display: "none"}} ref={googleTranslateRef}></div>
                          <Language onLanguageChange={handleLanguageChange} className='bg-transparent' />
                      </li>
                    </ul>
                  </div>
              </div>
      </nav>

  )
}

export default Header



                   
                    
                   
                   
                      
