
import { Form, FormikContext, useFormik } from 'formik'
import {  Save, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as YUP from "yup"
import {clearSuccessError} from '../../../reducers/dashboard/CategorySlice'
import { addSubCategory } from '../../../actions/dashboard'
const SubcategoryForm = ({setShow,title,data,handleChange, sub_id}) => {

    
  const dispatch = useDispatch() 
  const {success,error,loading} = useSelector((state)=>state.categories)
  
  // console.log(error)
  const formik = useFormik({
    initialValues:{
        name:"",
        description:"",
        sub_id:sub_id
    },
    validationSchema:YUP.object({
      name: YUP.string().required("Category name is required!"),
      description: YUP.string().required("Description is required!"),
      sub_id: YUP.string().required("Subcategory is required!")
    }),
    onSubmit:(values,{restForm})=>{
        dispatch(addSubCategory(values))
        console.log(values)
    } 
   })


    useEffect(()=>{
        if(error || success){
            const timeout = setTimeout(()=>{
              dispatch(clearSuccessError())
              formik.resetForm()
            }, 4000)
            
            return ()=> clearTimeout(timeout)
        }
    },[success,error,dispatch])

  return (
    <div className="w-1/2">
        
        <div className="bg-white p-6 rounded-lg shadow-sm w-">
        <header className='flex justify-between items-center mb-3'>
            <h2 className='text-primary uppercase text-xl font-bold mb-2'>{title}</h2>
            <button className='btn bg-red-600 p-2' onClick={setShow}>
            <X size={16} />
            </button>
        </header>
        <hr className='border-gray-200' />

          <FormikContext value={formik}>
              <Form>
               
                { success &&  <div className="border-2 my-2 p-2 border-green-500 rounded bg-green-100 text-sm">{success}</div>}
                { error &&  <div className="border-2 my-2 p-2 border-red-500 rounded bg-red-100 text-smw">{error}</div>}
                {loading && <div className='bg-blue-500 text-white p-2 rounded my-1'>Saving......</div>}

              <div className="space-y-2 grid grid-cols-1 sm:grid-cols-1  gap-2 my-4">
              <input type='hidden' value={sub_id} name='sub_id' />
            <div>
              <label className="block font-semibold text-gray-700 mb-1 text-sm">Name:</label>
              <input 
                type="text" 
                placeholder="Enter subcategory name..." 
                value={data?.name}
                name='name'
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                {...formik.getFieldProps("name")}
              />
              {
                formik.errors.name && formik.touched.name && <div className='text-xs text-red-500 pt-1  font-bold'> *{formik.errors.name}</div>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                {...formik.getFieldProps('description')}
              />
              {
                formik.errors.description && formik.touched.description && <div className='text-xs text-red-500 pt-1 font-bold'> *{formik.errors.description}</div>
              }
            </div>

     

            </div>
            <button type='submit' className="mt-3 flex items-center justify-center gap-2 btn bg-primary w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
                <Save size={16}/> Save
            </button>
              </Form>
          </FormikContext>
        </div>
        
      </div>
  )
}

export default SubcategoryForm