import { Form, FormikProvider, useFormik } from 'formik'
import { CloudUpload, Save, X } from 'lucide-react'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as YUP from "yup"
import { addCategory } from '../../../actions/dashboard'
const CategoryForm = ({setShow,title,data,handleChange}) => {
    const fileUploader = useRef()
    const {error,success,loading} = useSelector((state)=>state.categories)
    const dispatch = useDispatch()
    const formik = useFormik({
      initialValues:{
        name:"",
        description:"",
        photo:""
      },
      onSubmit: async(values)=>{
          dispatch(addCategory(values))
          formik.initialValues = {
            name:"",
            description:"",
            photo:""
          }
          
      },
      validationSchema:YUP.object({
        name:YUP.string().required("Category name is required!.."),
        description:YUP.string().required("Category name is required!..").max(100, "Can not exceed 100 characters"),
        photo: YUP.mixed()
        .required("Image is required")
        .test("fileType", "Only JPG, JPEG, PNG files are allowed", (value) => {
            // console.log(value)
          return value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        })
        .test("fileSize", "File size must be less than 2MB", (value) => {
          return value && value.size <= 2 * 1024 * 1024; // 2MB
        })
      })
    })



  return (
    <div className=" w-full sm:w-1/2">
        
        <div className="bg-white p-6 rounded-lg shadow-sm w-">
        <header className='flex justify-between items-center mb-3'>
            <h2 className='text-primary uppercase text-xl font-bold mb-2'>{title}</h2>
            <button className='btn bg-red-600 p-2' onClick={setShow}>
            <X size={16} />
            </button>
        </header>
        <hr className='border-gray-200' />
        {
          success && <div className='bg-green-100 py-2 px-2 mt-2 border-2 border-green-500 rounded capitalize text-slate-600 font-bold text-sm'>
          <p>{success}</p>
        </div>
        }
       
       {
        error &&  <div className='bg-red-100 py-2 px-2 mt-2 border-2 border-red-500 rounded capitalize text-slate-600 font-bold text-sm'>
        <p>{error}</p>
      </div>
       }

        <FormikProvider value={formik}>
            <Form encType='multipart/form-data'>
            <div className="space-y-2 grid grid-cols-1 sm:grid-cols-1  gap-2 my-4">
            <input type='file' className='hidden' ref={fileUploader}
              onChange={(event) => {
                formik.setFieldValue("photo", event.currentTarget.files[0]);
              }}
              
            /> 
            <div onClick={()=> fileUploader.current.click()} className='flex justify-center items-center gap-2 border-2 border-dashed py-6 rounded-xl border-gray-300'>
                <CloudUpload size={50} className='text-primary'/>
                <p>Upload Photo</p>
                {formik.errors.photo && formik.touched.photo && (
                    <div style={{ color: 'red' }}>{formik.errors.photo}</div>
                  )}
                  <p className='italic px-3 text-purple-500'>{formik.getFieldMeta("photo").value.name}</p>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1 text-sm">Title:</label>
              <input 
                type="text" 
                placeholder="Enter Title..." 
                value={data?.name}
                name='name'
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...formik.getFieldProps("name")}
              />
              {
                formik.errors.name && formik.touched.name && (
                   <div className="text-red-500 text-sm font-bold">{formik.errors.name}</div>
                )
              }
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1 text-sm">Description:</label>
              <input 
                type="text" 
                name='description'
                value={data?.description}
                onChange={handleChange}
                placeholder="Enter description" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...formik.getFieldProps("description")}
              />
              {
                formik.errors.description && formik.touched.description && (
                   <div className="text-red-500 font-bold text-sm ">{formik.errors.description}</div>
                )
              }
            </div>

     

            </div>
                {
                  !loading && <button type='submit' className="mt-3 flex items-center justify-center gap-2 btn bg-primary w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
                            <Save size={16}/> Save
                          </button>
                }

                {
                  loading && <button type="button" class="bg-primary btn w-full" disabled>
                                Saving....
                          </button>
                }


            </Form>
        </FormikProvider>
        </div>
        
      </div>
  )
}

export default CategoryForm