"use client"

import { useState } from "react"
import { Link} from "react-router-dom"
import Input from "../components/ui/Input"
import FormGroup from "../components/ui/FormGroup"
import logo from "../assets/logo.png"
import { Form, FormikProvider, useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import {signIn, signUp} from "../actions/users/index"
import { clearSuccessError } from "../reducers/users/authSlice"
import { useEffect } from "react"
const LoginPage = () => {


   const {error,loading} = useSelector((state)=>state.auth)
   const dispatch = useDispatch()

  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      position:"",
      phone:"",
      idno:"",
      names:"",
    },
    onSubmit: (values)=>{
      dispatch(signUp(values))
      
      
       
    },
    validationSchema:Yup.object({
      names:Yup.string().required("Names are required"),
      idno:Yup.number().required("ID number is required"),
      phone:Yup.number().required("Phone number is required"),
      position:Yup.number().required("Position you choosed is required"),
      email: Yup.string().email("Enter valid email").required("Email is required"),
      password:Yup.string().min(8,"Password must be 8 characters long").required("Password is required!")

    })
  })

  
    useEffect(()=>{
           if(error){
             const timeout = setTimeout(()=>{
                 dispatch(clearSuccessError())
             },4000)
             return ()=>clearTimeout(timeout)
           }
    },[error])
  


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
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
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-5">
         
        {
          error &&  <div className="bg-red-100 px-2 py-3 mb-2 rounded font-bold  text-red-600">
                      <p>{
                         error.toString().includes("idno_1 dup key") ? "ID number already given by other person":error
                        }</p>
                    </div>
        }
         <FormikProvider value={formik}>
         <Form className="space-y-6" >
          
             <div className="flex flex-col lg:flex-row gap-2">
                 <div className="w-full">
               
                    <label htmlFor="" className="block text-sm text-gray-500">Names: </label>
                      <Input
                      id="names"
                      name="names"
                      type="text"
                      label="Names"
                      placeholder="Enter your names"
                      autoComplete="names"
                      {...formik.getFieldProps("names")}
                    />

                    {formik.touched.names && formik.errors.names && (
                      <div className="text-xs font-bold text-red-500">{formik.errors.names}</div>
                    )}
               

              </div>
               <div className="w-full">
               
                    <label htmlFor="" className="block text-sm text-gray-500">ID number: </label>
                      <Input
                      id="idno"
                      name="idno"
                      type="number"
                      label=""
                      placeholder="Enter your national id"
                      autoComplete="idno"
                      {...formik.getFieldProps("idno")}
                    />

                    {formik.touched.idno && formik.errors.idno && (
                      <div className="text-xs font-bold text-red-500">{formik.errors.idno}</div>
                    )}
               

              </div>
             </div>

            <div className="flex  flex-col lg:flex-row gap-2">
                <div className="w-full">
               
                    <label htmlFor="" className="block text-sm text-gray-500">Phonenumber: </label>
                      <Input
                      id="telphone"
                      name="phone"
                      type="tel"
                      label=""
                      placeholder="Enter your phonenumber"
                      autoComplete="phone"
                      {...formik.getFieldProps("phone")}
                    />

                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-xs font-bold text-red-500">{formik.errors.phone}</div>
                    )}
               

              </div>

           <div className="w-full">
               
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

            </div>
           
           <div className="flex  flex-col lg:flex-row gap-2">
             <div className="w-full">
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
              <div className="w-full">
               
                    <label htmlFor="" className="block text-sm text-gray-500">Position: </label>
                      <Input
                      id="place"
                      name="place"
                      type="number"
                      label=""
                      placeholder="Enter position you want"
                      autoComplete="phone"
                      {...formik.getFieldProps("position")}
                    />

                    {formik.touched.position && formik.errors.position && (
                      <div className="text-xs font-bold text-red-500">{formik.errors.position}</div>
                    )}
               

              </div>


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
                {
                  loading ? "Processing...": "Sign up"
                }
              </button>
            </div>
          </Form>

         </FormikProvider>

        
        </div>
      </div>
    </div>
  )
}

export default LoginPage

