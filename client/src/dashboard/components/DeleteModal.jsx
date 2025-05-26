import { X } from 'lucide-react'
import React from 'react'

const DeleteModal = ({showDelete,confirm,cancel,message, title}) => {
  return (
    <div className={`${showDelete?`modal`:`hidden`}`}>
      <div className="modal-content w-md ">
          <div className="modal-header">
             <h3 className='title uppercase font-bold'>{title}</h3>
             
          </div>

        <div className="py-4">
            <p>{message}</p>
        </div>
        <div className='border-t border-gray-300 pt-3 flex gap-3'>
            <button className='btn bg-navy-900' onClick={confirm}>Confirm</button>
            <button className='btn bg-red-900' onClick={cancel}>Cancel</button>
        </div>
      </div>
  </div>
  )
}

export default DeleteModal