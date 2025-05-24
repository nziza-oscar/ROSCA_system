"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "../components/ui/Input"
import FormGroup from "../components/ui/FormGroup"
import logo from "../assets/logo.png"
import { Form, FormikProvider, useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import {signIn} from "../actions/users/index"
const LoginPage = () => {


   const {error,loading} = useSelector((state)=>state.auth)
   const dispatch = useDispatch()
   const navigate = useNavigate()

  const formik = useFormik({
    initialValues:{
      email:"",password:""
    },
    onSubmit: (values)=>{
      dispatch(signIn(values))
      
      
       
    },
    validationSchema:Yup.object({
      email: Yup.string().email("Enter valid email").required("Email is required"),
      password:Yup.string().min(8,"Password must be 8 characters long").required("Password is required!")
    })
  })


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 rounded-full h-16 w-16 flex items-center justify-center">
                 <img src={logo} alt='LOGO' className='rounded-full h-full'/>
              </div>
              <div className="flex flex-col gap-0">
                <span className="font-bold text-xl">ISHEMA</span>
                <span className="font-bold text-xs -top-2">Saving Group</span>
              </div>
            </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         
        {
          error &&  <div className="bg-red-100 px-2 py-3 mb-2 rounded font-bold  text-red-600">
                      <p>{error}</p>
                    </div>
        }
         <FormikProvider value={formik}>
         <Form className="space-y-6" >
          
              <div>
               
                    <label htmlFor="" className="block text-sm text-gray-500">Email: </label>
                      <Input
                      id="email"
                      name="email"
                      type="email"
                      label="Email address"
                      placeholder="Enter your email"
                      autoComplete="email"
                      {...formik.getFieldProps("email")}
                    />

                    {formik.touched.email && formik.errors.email && (
                      <div className="text-xs font-bold text-red-500">{formik.errors.email}</div>
                    )}
               

              </div>

             <div>
              <label htmlFor="password" className="text-sm text-gray-600">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password &&  formik.errors.password && (
                <div className="font-bold text-xs text-red-500">{formik.errors.password}</div>
              )}
      
             </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
             
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </Form>

         </FormikProvider>

          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span className="ml-2">Facebook</span>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1.294 15.755v-6.17h-2.062v-2.07h2.062V7.986c0-1.742.955-3.22 3.216-3.22.9 0 1.55.07 1.77.1v1.96h-1.22c-.94 0-1.12.45-1.12 1.11v1.46h2.35l-.31 2.07h-2.04v6.29h-2.65z" />
                  </svg>
                  <span className="ml-2">Google</span>
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default LoginPage

