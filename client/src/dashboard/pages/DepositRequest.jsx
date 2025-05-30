

import React, { useEffect, useState } from 'react'
import TableSection from '../components/TableSection'
import { useDispatch, useSelector } from 'react-redux'
import { Edit, Search, Trash2, X } from 'lucide-react'
import {Form, FormikProvider, useFormik} from "formik"
import * as YUP from  "yup"
import { search, useSearch,sort, filter } from "use-search-react"
import DeleteModal from '../components/DeleteModal'
import { clearSuccessError } from '../../reducers/dashboard/DepositSlice'
import { approveDeposit, getPendingDeposits } from '../../API/dashboardApi'
import Loader from '../../lib/Loader'

const DepositRequest = () => {
  const {user} = useSelector((state)=>state.auth)
  const {data,error,success,stats} = useSelector((state)=>state.deposit)
  const [imgSrc , setImageSrc] = useState(null)
  const [query,setQuery] = useState('')
  const [field, setField] = useState("depositedAt")
  const [order, setOrder] = useState("desc")
  const [statusFilter,setStatusFilter] = useState("all")
  const [allowed,setAllowed] = useState(false)
  const [dates,setDates] = useState({startDate:'', endDate:''})
  const[deposits,setDeposits] = useState([])
  const [loading, setLoading] = useState(true)
  const [reject,setReject] = useState(false)
  const[rejectModal,setRejectModal] = useState(false)
  const [deposit,setDeposit] = useState(null)
  const formik = useFormik({
    initialValues:{
        reason:""
    },
    onSubmit:async(values)=>{
        console.log(values)
    }
  })

  const results = useSearch(
    deposits,
    query,
    search({
     fields:['name','amount','status','depositedAt'],
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




const handleModal = ()=>{
  setShowModal((prev)=>!prev)
}

const handleShow = (val)=>{
    setStatusFilter(val)
}

const Cancel = ()=>{
        setReject(false)
        setRejectModal(false)
        setDeposit(null)
}

const handleFilter = (val)=>{
const [fieldName,value] = val.split("-")
    setField(fieldName)
    setOrder(value)
    console.log(fieldName)

}


useEffect(()=>{

  if(success || error){
    const timeout =  setTimeout(()=>{
      dispatch(clearSuccessError())
     
    },4000)
    return ()=> clearTimeout(timeout)
  }

},[success,error,dispatch])



useEffect(()=>{
    const dates = new Date();
    const yyyyMmDd = dates.toISOString().split('T')[0];
    const [year,month,day] = yyyyMmDd.split("-")
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);
  setDates({startDate: startDate.toISOString().split("T")[0] ,endDate: endDate.toISOString().split("T")[0]})
},[])
const [approving, setApproving] = useState({error:null,success:null, loading: false,data:null})

 async function fetchPendingDeposits(startDate,endDate){
         try {
            const {data} = await getPendingDeposits(startDate,endDate)
    
            setDeposits(data)
            setLoading(false)
            console.log(data)
         } catch (error) {
            setLoading(false)
             console.log(error.message)
         }
      }

const handleApprove = async(deposit)=>{
    try {
       const {data} = await approveDeposit(deposit)
      setApproving({error:null, success: "Successfully Approved", loading: false, data})
    } catch (error) {
      console.log(error)
      setApproving({error:error.message, success:null, loading: false,data:null})
    }
}

const handleSubmit = (e)=>{
    e.preventDefault()
    setLoading(true)
    fetchPendingDeposits(dates.startDate, dates.endDate)
}

const handleRejectDeposit = (data)=>{
   setDeposit(data)
   setRejectModal(true)
}

useEffect(()=>{
      if(dates.startDate && dates.endDate){
          fetchPendingDeposits(dates.startDate, dates.endDate)
      }
},[dates])


useEffect(() => {
  if (approving.success || approving.error) {
    const timeout = setTimeout(() => {
      setApproving({ success: null, error: null, loading: null, data: null });
      fetchPendingDeposits(dates.startDate, dates.endDate);
    }, 4000);

    return () => clearTimeout(timeout);
  }
}, [approving.success, approving.error]);


  return (
    <div>
    {
      user && user.role == "user" && <div className="banner flex py-5 bg-navy-900 px-5 text-gray-100 rounded flex  justify-between items-center z-10 ">
         <div>
           <h4>Amount Balance</h4>
          <h3 className='text-2xl text-gray-400 font-bold'>{stats?.approvedAmount?.toLocaleString()} FRW</h3>
         </div>
         { !(["admin"].includes(user.role)) && allowed &&  <div><button className='btn bg-purple-500 relative' onClick={handleModal}>Deposit</button></div> }
      </div>
    }

   {
      user && user.role == "admin" && <div className="banner flex flex-col sm:flex-row gap-6 py-5 bg-navy-900 px-5 text-gray-100 rounded justify-between items-start lg:items-center z-10 ">
         <div className='flex-1 w-full'>
           <h4>Amount Balance</h4>
          <h3 className='text-2xl text-gray-400 font-bold' translate='no'>{stats?.approvedAmount?.toLocaleString()} FRW</h3>
         </div>
         <div className='flex-1 w-full'>
            <form className='flex flex-col lg:flex-row gap-2 items-start lg:items-end' onSubmit={handleSubmit}>
                <div className='flex-1 w-full'>
                    <label htmlFor="" className='text-white block text-sm'>From Date: </label>
                    <input type='date' value={dates.startDate}
                     onChange={(e)=>setDates((prev)=>({...prev, startDate: e.target.value}))} 
                     name='start' className='py-2 text-xs outnline-none bg-white text-gray-500 px-2 rounded outline-none w-full'/>
                </div>
                <div className='flex-1 w-full'>
                    <label htmlFor="" className='text-white block text-sm'>End Date: </label>
                    <input type='date' value={dates.endDate}
                     onChange={(e)=>setDates((prev)=>({...prev, endDate: e.target.value}))} 
                     name='end' className='py-2 text-xs outnline-none bg-white text-gray-500 px-2 rounded outline-none w-full'/>
                </div>
                <div>
                    <button className='btn bg-green-500 px-2 py-1 rounded ' type='submit'
                    >Send</button>
                </div>
            </form>
         </div>
      </div>
    }

<div className={`${imgSrc ? "fixed":"hidden"} z-72 inset-0 overflow-y-auto bg-black/30   w-full h-screen flex justify-center items-center;`}>

    <div className=' lg:w-1/2 bg-white '>
        <div className='flex py-4 justify-between  px-4 border-b border-gray-300'>
            <h3 className='uppercase font-bold'>Proof View</h3>
            <button className='btn bg-red-500' onClick={()=>setImageSrc(null)}><X size={16}/></button>
        </div>
        <img src={imgSrc} className='w-full'/>
    </div>
</div>



<div className={`${rejectModal?"fixed":"hidden"} z-72 inset-0 overflow-y-auto bg-black/30   w-full h-screen flex justify-center items-center;`}>

    <div className='w-full lg:w-1/2 bg-white self-center rounded'>
        <div className='flex py-4 justify-between  px-4 border-b border-gray-300 items-center'>
            <h3 className='uppercase font-bold'>Reject Deposit</h3>
            <button className='btn bg-red-500' onClick={Cancel}><X size={16}/></button>
        </div>
        <div className="modal-content">
            {
                !reject && <div className='flex flex-col px-3'>
                <span className=' text-xs px-2'>Are you sure you want to reject this person amount deposited?</span>
                <div className='flex py-2'>
                    <button className='btn bg-green-500 mx-2' onClick={()=>setReject(true)}>Yes</button>
                    <button className='btn bg-rose-500 mx-2' onClick={()=>setRejectModal(false)}>No</button>
                </div>
            </div>
            }
           {
            reject && 
            <FormikProvider value={formik}>
                <Form>
                    <div>
                        <label className='label'>Reason:</label>
                        <textarea placeholder='Enter reasons for rejecting this deposit....'
                         className='w-full border border-gray-400 px-2 outline-none rounded py-2 placeholder:text-xs text-sm resize-none' rows={6}></textarea>
                    </div>
                    <div className='space-x-2'>
                        <button className='btn bg-green-700' type='submit'> Confirm</button>
                        <button type='button' className='btn bg-red-700' onClick={Cancel}>Cancel</button>
                    </div>
                </Form>
            </FormikProvider>
           }
        
        </div>
    </div>
</div>




      <div className="my-3">
        
          {success && <div className='success'>{success}</div>}
          {error && <div className='error'>{error}</div>}
        
        <TableSection title="Unapproved Amounts">

         
         <div className="search flex flex-col lg:flex-row justify-between pb-4 gap-3">
            <div className='flex items-center border border-gray-400 px-2 rounded'>
                <Search size={16} className='text-gray-600'/>
                <input type='text' name='search' 
                className='border-none outline-none px-2 placeholder:text-sm text-sm text-gray-500 py-2' 
                placeholder='Search...' onChange={(e)=>setQuery(e.target.value)}/>
            </div>
            <div className="flex gap-2">
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
             <option value="pending">Pending</option>
             <option value="approved">Approved</option>
             <option value="rejected">Rejected</option>
             <option value="cancelled">Cancelled</option>
          </select>
          </div>
         </div>
         </div>

           {
            approving.success && <div className='success'>{approving.success}</div>
           }
           {
            approving.error && <div className='error'>{approving.error}</div>
           }
          {
            loading ? <Loader/> :  <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Names</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Proof</th>
                 <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                    results.length == 0 && <tr>
                      <td colSpan={9}>
                          <p className='text-center font-bold'>No pending deposits available </p>
                      </td>
                      </tr>
                }
                {
                  results && results.map((deposit,index)=>(
                    <tr key={index+1}>
                        <td>{index+1}</td>
                        <td><div className='text-sm'>{deposit?.depositedBy?.name}</div></td>
                        <td><div className='text-sm'>{deposit?.depositedBy?.email}</div></td>
                        <td><div className='text-sm'>{deposit?.depositedBy?.phone}</div></td>
                        <td><div className='text-sm'>{deposit?.amount?.toLocaleString()} {deposit?.currency}</div></td>
                        <td><div className='text-sm'>{deposit?.depositedAt?.split("T")[0]}</div></td>
                        <td><div className='text-sm'>{deposit?.status}</div></td>
                        <td><div className='text-sm'><img src={deposit?.proof?.url} className='cursor-pointer' onClick={()=> setImageSrc(deposit?.proof?.url)}/></div></td>
                        <td>
                            <div className='text-sm flex gap-2'>
                                <button className='btn bg-green-500' onClick={()=>handleApprove(deposit)}>{approving.loading ? "Processing...": "Approve"}</button>
                                <button className='btn bg-red-500' onClick={()=>handleRejectDeposit(deposit)}>Reject</button>
                            </div>
                        </td>
                    </tr>
                  ))
                }
              </tbody>
           </table>
          }
        </TableSection>
      </div>
    </div>
  )
}

export default DepositRequest