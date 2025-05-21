import React, { useState } from 'react'
import TableSection from '../components/TableSection'
import { Book, Plus, X } from 'lucide-react'
import Select from "react-select"
const Debtors = () => {
     const transactions = [
    { id: 1, user: "John Doe", amount: 1200, date: "2023-05-15", status: "Completed" },
    { id: 2, user: "Jane Smith", amount: 8500, date: "2023-05-14", status: "Pending" },
    { id: 3, user: "Robert Johnson", amount: 2000, date: "2023-05-13", status: "Completed" },
    { id: 4, user: "Emily Davis", amount: 5000, date: "2023-05-12", status: "Failed" },
  ]

  const options = [
  { value: 'chocolate', label: 'John' },
  { value: 'strawberry', label: 'Jane' },
  { value: 'vanilla', label: 'Robert' },
  { value: 'Johnson', label: 'Johnson' },
  { value: 'Emily', label: 'Emily' },
]
const [showModal, setShowModal] = useState(false)


  return (
   <div>
    <TableSection title="Debtors">

        <div className='flex justify-between py-2'>
            <div className='flex gap-2 items-center'>
                <button className='flex items-center gap-1 bg-green-500 px-2 py-1 rounded text-white btn'> <Book size={16}/> Excel</button>
                <button className='btn bg-navy-900 flex' onClick={()=> setShowModal(true)}> <Plus size={16}/> Add</button>
            </div>
            <div>
            <input type='text' placeholder='Search...' className='w-64 border px-1 py-2 rounded border-gray-300 placeholder:text-sm focus:outline-indigo-500 text-slate-600'/>
            </div>
        </div>
         <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="">#</th>
            <th className="">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expire Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction,index) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.user}</td>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.amount.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableSection>

    <div className={`modal ${!showModal&& `hidden`}`}>
        <div className="modal-content modal-sm">
            <div className="modal-header">
                <h3 className='uppercase font-bold text-slate-700'>Add Debt</h3>
                <button className='modal-close btn' onClick={()=>setShowModal(false)}><X size={16}/></button>
            </div>
          
          <div className="modal-body py-3 px-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                 <div>
                    <label className='label'>Debtors: </label>
                    <Select isMulti name='debtors' options={options} className='basic-multi-select w-full' classNamePrefix="select" />
        
                 </div>
                 <div>
                    <label className='label'>Amount: </label>
                    <input type='number' placeholder='Enter amount...' step="0.0001" name='amount' className='input'/>
                 </div>
              </div>

                <div>
                    <label className='label'>Payment Date:</label>
                    <input type='date' name='date' className='input' />
                </div>

                <div>
                    <label className='label'>Comment: </label>
                    <textarea rows={6} placeholder='Comment' className='input'></textarea>
                </div>
                <button className='btn bg-navy-900'>Save</button>
          </div>

        </div>
    </div>
   </div>
  )
}

export default Debtors