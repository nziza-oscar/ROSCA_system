import React, { useState } from 'react'
import AddressPage from '../../pages/AddressPage'
import ConfirmationDialog from "./ConfirmationDialog"
import { Edit, Trash } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { deleteUserAddressThunk } from '../../actions/users'

const Addresses = ({user,show,setShow, error,success}) => {
    const [dialog,setDialog] = useState(false)
    const [message,setMessage] = useState("")
    const [id,setId] = useState(null)
    const dispatch = useDispatch()
    const [edit,setEdit] = useState(null)
    
    const Confirm = (id)=>{
         if(!id){
          alert("Failed to delete")
            return null
         }
       dispatch(deleteUserAddressThunk(id))
       setDialog(false)
       
    }
    const onCancel = ()=>{
        setDialog(false)
        
    }
    const handleDelete = (id)=>{
        setDialog(true)
        setMessage("Are you sure you to delete this address?")
        setId(id)
    }
    
    const handleEdit = (address)=>{
      setShow()
      setEdit(address)
    }

    const handleShow = ()=>{
      setShow()
      setEdit(null)
    }
  return (
    <div className="bg-white rounded-lg shadow">
        
  {
    dialog &&  <ConfirmationDialog message={message} onCancel={onCancel} onConfirm={Confirm} id={id}/>
  }
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-semibold">My Addresses</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage your shipping addresses</p>
                </div>
               
               {
                user.address.length < 3 &&  <button className="btn px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700" onClick={setShow}>
                Add New Address
              </button>
               }
              </div>

              <div>
                   {error && <div className='border border-red-500 bg-red-100 m-1 px-2 rounded text-sm py-1 capitalize'>{error}</div>}

                   {success && <div className='border border-green-500 bg-green-100 m-1 px-2 rounded text-sm py-1 capitalize'>{success}</div>}
                </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.address && user.address.map((address) => (
                    <div key={address._id} className="border border-gray-200 rounded-lg p-4 relative">
                      {address.isDefault && (
                        <span className="absolute top-4 right-4 bg-green-100 text-green-800
                         text-xs px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                      <h3 className={`font-medium text-gray-900`}>{address.type}</h3>
                      <div className="mt-2 text-gray-500">
                        <p>{address.street}</p>
                        <p>
                          {address.province}, {address.district}
                        </p>
                        <p>{address.country}</p>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <span className={`font-semibold  uppercase ${address.status == `inactive`?` text-red-600  bg-red-100`: ` text-primary  bg-yellow-100`}
                         text-sm px-2 py-1 block rounded text-xs`}>{address.status}</span>
                        <span className="text-gray-300">|</span>
                        <button className="text-purple-600 hover:text-purple-700 
                        text-sm font-medium cursor-pointer" type='button' onClick={()=>handleEdit(address)}><Edit size={16}/></button>
                        <span className="text-gray-300">|</span>
                        <button type='button' className="text-red-600 hover:text-red-700 text-sm font-medium  cursor-pointer"  onClick={()=>handleDelete(address._id)}><Trash size={16}/></button>
                        
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {
                show &&
                <div className="fixed top-0 z-40 left-0 top-0 h-full  bg-gray-800/30  w-full  flex items-center justify-center">
                <AddressPage setShow={handleShow} edit={edit}/>
                </div>
              }
            </div>
  )
}

export default Addresses