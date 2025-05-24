import { Form, FormikProvider, useFormik } from "formik"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import * as YUP from "yup"
import { createPaymentMethod } from "../../../actions/dashboard"
export default function PaymentMethodForm({error,success, onSubmit, onCancel, initialData }) {
   const checkboxRef = useRef()
   const dispatch = useDispatch()
    const formik = useFormik({
      initialValues:{
        name:"",
        type:"",
        description:"",
        instructions:"",
        isActive:false
      },
      onSubmit: (values,{resetForm})=>{
         dispatch(createPaymentMethod(values))
         resetForm();
      },
      validationSchema:YUP.object({
        name:YUP.string().required("Name is required"),
        type:YUP.string().required("Type is required"),
        description:YUP.string().required("Description is required"),
        instructions:YUP.string().required("Instructions are required")
        
      })
    })
    const handleChange = (field, value) => {
      setIsActive(value)
      // setFormData({ ...formData, [field]: value })
    }
  
    const [isActive,setIsActive] = useState(false)
  
  
    return (
      <FormikProvider value={formik}>
        { success &&  <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}
        <Form  className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="e.g. Credit Card Payment"
          
            className="text-sm placeholder:text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
            {...formik.getFieldProps("name")}
          />
        { formik.errors.name && formik.touched.name && <div className="text-xs text-red-500">*{formik.errors.name}</div> }
        </div>
  
        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Payment Type
          </label>
          <select
            id="type"
          
            required
            className="text-sm placeholder:text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
            {...formik.getFieldProps("type")}
          >
            <option value="" disabled>
              Select payment type
            </option>
              <option value="MobileMoney">MOMO</option>
              <option value="BankTransfer">BANK</option>
              <option value="PayPal">PayPal</option>
              <option value="Card">Card</option>
              <option value="CASH">CASH</option>
          
          </select>
          { formik.errors.type && formik.touched.type && <div className="text-xs text-red-500">*{formik.errors.type}</div> }
        </div>
  
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Brief description of the payment method"
            
            rows={2}
            className="text-sm placeholder:text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none resize-none "
            {...formik.getFieldProps("description")}
          ></textarea>
            { formik.errors.description && formik.touched.description && <div className="text-xs text-red-500">*{formik.errors.description}</div> }
        </div>
  
        <div className="space-y-2">
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
            Instructions
          </label>
          <textarea
            id="instructions"
            placeholder="Instructions for using this payment method"
          
            rows={3}
            className="text-sm placeholder:text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none resize-none"
            {...formik.getFieldProps("instructions")}
          ></textarea>
            { formik.errors.instructions && formik.touched.instructions && <div className="text-xs text-red-500">*{formik.errors.instructions}</div> }
        </div>
  
        <div className="flex items-center space-x-2">
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
              className="sr-only"
              ref={checkboxRef}
            />

            <div onClick={()=>checkboxRef.current.click()} className="cursor-pointer">
            <div className="block bg-gray-200 w-10 h-6 rounded-full"></div>
            <div
              className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
                isActive ? "translate-x-4 bg-blue-600" : "bg-white"
              }`}
            ></div>
            </div>

          </div>
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            { isActive ? "Active":"Inactive"}
          </label>
        </div>
  
        <div className="flex justify-end space-x-2 pt-4">
        <button
            type="submit"
            className="btn px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {initialData ? "Update" : "Save"} 
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn bg-red-500 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700  hover:bg-gray-50"
          >
            Cancel
          </button>
          
        </div>
      </Form>
      </FormikProvider>
    )
  }
  