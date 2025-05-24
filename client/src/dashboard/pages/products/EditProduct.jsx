"use client"

import { useEffect, useRef, useState } from "react"
import { Save, Upload } from "lucide-react"
import Textarea from "../../../components/ui/textarea"
import Input from "../../../components/ui/Input"
import { Form, FormikProvider, useFormik } from "formik"
import * as YUP from "yup"
import { useDispatch, useSelector } from "react-redux"
import { createProduct } from "../../../actions/dashboard"

export default function NewProducts() {
  const photoInput = useRef()
  const {categories} = useSelector((state)=>state.categories)
  const {loading} = useSelector((state)=>state.products)

  const d = useSelector((state)=>state.auth)
  console.log(d)
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues:{
      photo:'',
      name:'',
      description:'',
      quantity:'',
      category:'',
      price:'',
      cost:'',
      status:''
    },
    onSubmit:(values)=>{
        dispatch(createProduct(values))
      
    },
    validationSchema:YUP.object({
      photo:YUP.mixed().required("Image is required").test("fileType",'Only JPG,JPEG,PNG files are allowed',(value)=>{
      return value && ['image/jpeg','image/jpg','image/png'].includes(value.type)
      }).test("fileSize", "file size must be less 5MB",(value)=>{
        return value && value.size <=  5 * 1024 * 1024  
      }),
      name: YUP.string().required("Product name is required!"),
      description: YUP.string().required("Product Description is required ").max(500, "Product description can not exceed 500 characters"),
      category:YUP.string().required("Category is required !"),
      quantity:YUP.number().required("Product Quantity is required!").min(1,"Atleast 1 product must be in the stock"),
      price: YUP.number().required("Price is required").min(500,"Price must be atleast 500FRW").max(2000000,"Price can not exceed 2000,000frw"),
      cost: YUP.number().required("Cost price is required").min(500,"At least 500FRW").max(2000000,"Can not exceed 2000,000frw"),
      status:YUP.string().required("Choose status").oneOf(['ACTIVE','INACTIVE'],"Choose Active or Inactive")
    })
  })
 
// useEffect(()=>{
//     console.log(createProduct.fulfilled)
// },dispatch)


  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 uppercase text-primary">Update Product</h1>
      </div>

      <div className="bg-white p-3 rounded shadow-sm">
      <FormikProvider value={formik}>
        <Form encType="multipart/form-data">
            {/* Image Upload Area */}
            <div className="border-2 border-dashed border-blue-200 cursor-pointer
            rounded-lg p-12 mb-8 flex flex-col items-center justify-center text-center" onClick={()=>photoInput.current.click()}>
              <input type="file" name="photo" hidden ref={photoInput}
              onChange={(event)=>{
                formik.setFieldValue("photo",event.currentTarget.files[0])
              }}
              />
              <div className="bg-orange-400 p-3 rounded-full mb-4 " 
              >
                <Upload className="h-6 w-6 text-white" />
              </div>

              <p className="text-gray-600 text-lg mb-2">
                Drop your images here, or <span className="text-orange-400 font-medium">click to browse</span>
              </p>
              <p className="text-gray-500 text-sm">recommended: PNG, JPG and JPGE files are allowed</p>
              <p className="text-purple-600 font-bold">{formik.getFieldMeta('photo').value?.name}</p>
            {
              formik.errors.photo && <div className="text-red-500 py-2 font-bold">{formik.errors.photo}*</div>
            }
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-gray-600 text-sm font-bold" htmlFor="productName">Product Name:</label>
                <Input id="productName" placeholder="Enter Product Name" className="mt-1"
                  {...formik.getFieldProps('name')}
                />
                {
                  formik.errors.name && formik.touched.name && <div className="px-2  text-xs text-red-500">{formik.errors.name}</div>
                }
              </div>


            
              <div className="flex-1">
                <label className="text-gray-600 text-sm font-bold" htmlFor="price">Price:</label>
                <Input type="number" id="price" placeholder="Enter Product price" className="mt-1"   {...formik.getFieldProps('price')}
                />
                {
                  formik.errors.price && formik.touched.price && <div className="px-2  text-xs text-red-500">{formik.errors.price}</div>
                }
              </div>
              
            
            

              <div className="flex-1">
                <label className="text-gray-600 text-sm font-bold" htmlFor="price">Cost:</label>
                <Input type="number" id="price" placeholder="Enter Product price" className="mt-1"   {...formik.getFieldProps('cost')}
                />
                {
                  formik.errors.cost && formik.touched.cost && <div className="px-2  text-xs text-red-500">{formik.errors.cost}</div>
                }
              </div>
              
        
            

              <div>
                <label className="text-gray-600 text-sm font-bold pb-2 block" htmlFor="size2">Category:</label>
                <select
                  {...formik.getFieldProps('category')} className="w-full border border-gray-300 py-2 text-sm px-2 rounded">
                    <option value="">Choose</option>
              
                    {
                      categories.map((category,index)=>(<option value={category._id} key={index}>{category.name}</option>
                      ))
                    }

                </select>

                {
                  formik.errors.category && formik.touched.category && <div className="px-2 text-xs text-red-500 font-bold">{formik.errors.category}</div>
                }
              </div>


              <div>
                <label className="text-gray-600 text-sm font-bold" htmlFor="stock">InStock:</label>
                <Input id="stock" placeholder="Enter Stock Quantity" className="mt-1"   {...formik.getFieldProps('quantity')}
                />
                {
                  formik.errors.quantity && formik.touched.quantity && <div className="px-2  text-xs text-red-500">{formik.errors.quantity}</div>
                }
              </div>

              <div>
                <label className="text-gray-600 text-sm font-bold" >Status: </label>
                <select className="w-full py-2 px-2 outline-none bg-white border rounded border-gray-300 text-sm" 
                {...formik.getFieldProps('status')}
                >
                  <option value="">Choose Status</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="ACTIVE">Active</option>
                </select>
                {
                  formik.errors.status && formik.touched.status && <div className="px-2  text-xs text-red-500">{formik.errors.status}</div>
                }
              </div>

            

              


              
            </div>

            <div className="mb-8">
              <label className="text-gray-600 text-sm font-bold" htmlFor="description">Description:</label>
              <Textarea id="description" placeholder="Short Description of product" className="mt-1 h-40 bg-slate-100"
                {...formik.getFieldProps('description')}
              />
              {
                formik.errors.description && formik.touched.description && <div className="text-xs pt-2 text-red-500">{formik.errors.description}</div>
              }
            </div>

            <div>
              <button type="submit" className="btn bg-primary flex gap-2  items-center">
                  <Save size={16}/>
                  <span>Save</span>
              </button>
            </div>
        </Form>
      </FormikProvider>
      </div>
    </div>
  )
}

