import { Edit, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Input from "./Input"
import { useDispatch } from 'react-redux'
import { fetchUsers, updateUserInfoThunk } from '../../actions/users'
const PersonalInfo = ({user,loading, success,error}) => {
    const [edit,setEdit]  = useState(false)
    const dispatch = useDispatch()

    const [formData,setFormdata] = useState({
         name:'' ,
         email:'',
         phone:'',
         dob:'',
         language:'',
         currency:''

    })

     const handleChange = (e)=>{
        const {name,value} = e.target
        setFormdata({
            ...formData,
            [name]:value
        })
     }

     const handleSubmit = (e)=>{
        e.preventDefault()
        // handleUpdate(formData)
        dispatch(updateUserInfoThunk(formData))
        // console.log("sdfds")
        window.scrollTo({
          top:0,
          left:0,
          behavior:"instant"
        })
     }

     useEffect(()=>{
        if(user){
          // formik.setFieldValue("name", user.names)
          // console.log(user)
          // setFormdata((prev)=>{...prev, dob: new Date(user.dob).toISOString().split('T')[0]}))
          const dob =  user.dob ? new Date(user.dob).toISOString().split('T')[0] : null
          setFormdata((prev)=>({...prev,
            name:user.name,
            email:user.email,
            phone:user.phone,
            dob:dob,
            
            language:user?.settings?.language,
            currency:user?.settings?.currency, }))
        }
     },[user])

  return (
    <div className="bg-white rounded-lg shadow">
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-lg font-semibold">Personal Information</h2>
      {
        !edit ? (
    <button className="btn bg-purple-500 flex items-center " onClick={()=>setEdit((prev)=>!prev)}>
        <Edit className="w-4 h-4 mr-1" />
        <span>Edit</span>
      </button>
        ):
        (
            <button className="btn flex items-center bg-red-600 rounded px-2 py-2 " onClick={()=>setEdit((prev)=>!prev)}>
        
        <span>Cancel</span>
      </button>
        )
      }
    </div>

<div>
  {error && <div className='border border-red-500 py-2 px-2 bg-red-50 my-2 rounded text-sm'>{error}</div>}
  {loading && <div className='inline-flex bg-blue-500 text-white p-2 rounded'>Saving...</div>}
  {success && <div className='border border-green-500 py-2 px-2 bg-green-50 my-2 rounded capitalize text-sm'>{success}</div>}
</div>
   
    <form className="p-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <Input type="text" name="name" placeholder="Enter fullnames...."  disabled={!edit} value={formData.name} onChange={handleChange}/>
         
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <Input type="email" name="email" placeholder="Enter fullnames...." disabled={!edit} onChange={handleChange} value={formData.email}/>
         
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
           <Input type="text" name="phone" placeholder="Enter phonenumber..."  disabled={!edit} onChange={handleChange}
            value={formData.phone}/>
         
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <Input type="date" name="dob" disabled={!edit} onChange={handleChange} value={formData.dob} />
         
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-md font-medium mb-4">Account Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Language</p>
              <p className="text-sm text-gray-500">Select your preferred language</p>
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-1" name='language'
             onChange={handleChange} value={formData.language}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="kin">Kinyarwanda</option>
            </select>
            
                
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Currency</p>
              <p className="text-sm text-gray-500">Select your preferred currency</p>
            </div>
            <select name='currency' className="border border-gray-300 rounded-md px-3 py-1" value={formData.currency} onChange={handleChange}>
              <option value="FRW">Rwandan Franc (FRW)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>

          <div>
          <button type='submit' className={`btn flex items-center ${edit?`bg-primary text-purple-600`:` bg-gray-200 text-gray-600 `} 
           hover:text-purple-700 w-64 justify-center `} disabled={!edit} 
          >
                <Save className="w-4 h-4 mr-1" />
                <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </form>

  </div>
  )
}

export default PersonalInfo