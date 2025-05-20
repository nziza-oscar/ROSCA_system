import React, { useRef } from 'react'
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
  // useEffect(() => {
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);

  return (
      <nav className="bg-blue-500 text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-around">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 rounded-full h-12 w-12 flex items-center justify-center">
               <img src={logo} alt='LOGO' className='rounded-full h-full'/>
            </div>
              <div className="flex flex-col gap-0">
                  <span className="font-bold text-xl">ISHEMA</span>
                  <span className="font-bold text-xs -top-2">Saving Group</span>
              </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className="py-2 border-b-2 border-white">
              Home
            </NavLink>
            <a href="#" className="py-2 hover:border-b-2 hover:border-white">
              About
            </a>
            <a href="#" className="py-2 hover:border-b-2 hover:border-white">
              Mission
            </a>
            <a href="#" className="py-2 hover:border-b-2 hover:border-white">
              How to
            </a>
            <Link to="/login" className="py-2 hover:border-b-2 hover:border-white">
              Login
            </Link>
            <div id="google_translate_element" ref={googleTranslateRef}></div>
          </div>
        </div>
      </nav>

  )
}

export default Header