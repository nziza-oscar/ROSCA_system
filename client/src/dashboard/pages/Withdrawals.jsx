import React, { useEffect, useRef, useState } from 'react'
import TableSection from '../components/TableSection'
import { useDispatch, useSelector } from 'react-redux'
import { BookA, Edit, Eye, Search, Trash2, X } from 'lucide-react'
import {Form, FormikProvider, useFormik} from "formik"
import * as YUP from  "yup"
import { createDeposit, deleteDeposit, fetchDeposits } from '../../actions/dashboard'
import { search, useSearch,sort, filter } from "use-search-react"
import DeleteModal from '../components/DeleteModal'
import { clearSuccessError } from '../../reducers/dashboard/DepositSlice'
import ExportSavingsExcel from '../components/func/ExportSavingsExcel'
import WithdrawalFormModal from '../components/WithdrawalModal'
import { Link } from 'react-router-dom'

const Savings = () => {
  const {user} = useSelector((state)=>state.auth)
  const {data,loading,error,success,stats} = useSelector((state)=>state.deposit)
  const photoInput = useRef(null)
  const {usersBalance} = useSelector((state)=>state.withdrawals)
 
  const [showModal,setShowModal] = useState(false)
  const [query,setQuery] = useState('')
  const [field, setField] = useState("depositedAt")
  const [order, setOrder] = useState("desc")
  const [statusFilter,setStatusFilter] = useState("all")
 const [withdrawal,setWithdrawal] = useState(null)
  const [dates,setDates] = useState({startDate:'', endDate:''})
  
  const results = useSearch(
    usersBalance,
    query,
    search({
     fields:['totalWithdrawals','balance','totalSavings','depositedAt',"user.name","user.email","user.phone"],
     matchType:"fuzzy" 
    }),
    sort({field:field,order:order}),
    filter({
        conditions: statusFilter === "all" ? [] : [
              { field: "status", operator: "equals", value: statusFilter },
            ],
      missingFieldBehavior: "exclude", // Handle missing fields
    })
  )

  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);


const handleFormSubmit = async (data) => {
  
};


const handleShow = (val)=>{
    setStatusFilter(val)
}

const handleFilter = (val)=>{
const [fieldName,value] = val.split("-")
    setField(fieldName)
    setOrder(value)
}




useEffect(()=>{

  if(success || error){
    const timeout =  setTimeout(()=>{
      dispatch(clearSuccessError())
    
    },4000)
    return ()=> clearTimeout(timeout)
  }

},[success,error,dispatch])



const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(fetchDeposits(dates))
}

useState(()=>{
    const dates = new Date();
    const yyyyMmDd = dates.toISOString().split('T')[0];
    const [year,month,day] = yyyyMmDd.split("-")
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    setDates({startDate: startDate.toISOString().split("T")[0] ,endDate: endDate.toISOString().split("T")[0]})
},[])


const handleWithDrawal = (data)=>{
    setIsOpen(true)
    setWithdrawal(data)
}

  return (
    <div>
    


  

      <WithdrawalFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleFormSubmit} user={withdrawal} />


      <div className="my-3">
        
          {success && <div className='success'>{success}</div>}
          {error && <div className='error'>{error}</div>}
        

    
        <TableSection title="CLIENTS LIST ">

           
                  <div className="search flex flex-col lg:flex-row justify-between pb-4 gap-3">
                     <ExportSavingsExcel fileName={`Savings (${dates.startDate} - ${dates.endDate})`} data={results}/>
                     
                     <div className="flex gap-2">
                      <div className='flex items-center border border-gray-400 px-2 rounded'>
                         <Search size={16} className='text-gray-600'/>
                         <input type='text' name='search' className='border-none outline-none px-2 placeholder:text-sm text-sm 
                         text-gray-500 py-1' placeholder='Search...' onChange={(e)=>setQuery(e.target.value)}/>
                     </div>
                   <div className='w-full'>
                      <select className='input text-xs' translate='no' onChange={(e)=>handleFilter(e.target.value)}>
                      <option>Sort By</option>
                      <option value="depositedAt-desc">Newest</option>
                      <option value="depositedAt-asc">Oldest</option>
                      <option value="amount-desc">High to low </option>
                      <option value="amount-asc">Low to high </option>
                   </select>
                   </div>
                   <div className='w-full'>
                      <select className='input text-xs' onChange={(e)=>handleShow(e.target.value)}>
                      <option>Show</option>
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="cancelled">Cancelled</option>
                   </select>
                   </div>
                  </div>
                  </div>

           <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Names</th>
                  <th>Phone</th>
                  <th className='whitespace-nowrap'>Total Savings</th>
                  <th className='whitespace-nowrap'>Amount withdrew</th>
                  <th className='whitespace-nowrap'>Account Balance</th>
                  <th className='whitespace-nowrap'>Action</th>
                 
          
                </tr>
              </thead>
              <tbody>
                {
                   results.length != 0 && results.map((deposit,index)=>(
                    <tr key={index}>

                    
                      
                      <td>{index+1}</td>
                      <td><div  translate="no" className='capitalize'>{deposit?.user?.name}</div></td>
                      <td><div  translate="no">{deposit?.user?.phone}</div></td>
                      <td><div  translate="no">{deposit?.totalSavings}</div></td>
                      <td><div  translate="no">{deposit?.totalWithdrawals}</div></td>
                      <td><div  translate="no">{deposit?.balance}</div></td>
                      <td>
                        <div className="flex gap-2 ">
                             <button onClick={() => handleWithDrawal(deposit)} 
                         className="btn bg-blue-600 text-white px-4 py-2 rounded">withdrawal</button>
                         <Link to={`/dashboard/transactions/${deposit?.user?.id}/details`} 
                         className="btn bg-amber-500 text-white px-4 py-2 rounded"><Eye size={16}/></Link>
                        </div>
                      </td>

                    </tr>
                  ))
                }
              </tbody>
              <tfoot>
                <tr>
                    <th colSpan={3}>Total</th>
                    <th>{results.reduce((acc,item)=> item.totalSavings + acc, 0)} FRW</th>
                    <th>{results.reduce((acc,item)=> item.totalWithdrawals + acc, 0)} FRW</th>
                    <th>{results.reduce((acc,item)=> item.balance + acc, 0)} FRW</th>
                   
                </tr>
              </tfoot>
           </table>
        </TableSection>
      </div>
    </div>
  )
}

export default Savings