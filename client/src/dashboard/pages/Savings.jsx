import React, { useEffect, useRef, useState } from 'react'
import TableSection from '../components/TableSection'
import { useDispatch, useSelector } from 'react-redux'
import { BookA, Edit, Search, Trash2, X } from 'lucide-react'
import {Form, FormikProvider, useFormik} from "formik"
import * as YUP from  "yup"
import { createDeposit, deleteDeposit, fetchDeposits } from '../../actions/dashboard'
import { search, useSearch,sort, filter } from "use-search-react"
import DeleteModal from '../components/DeleteModal'
import { clearSuccessError } from '../../reducers/dashboard/DepositSlice'
import ExportSavingsExcel from '../components/func/ExportSavingsExcel'

const Savings = () => {
  const {user} = useSelector((state)=>state.auth)
  const {data,loading,error,success,stats} = useSelector((state)=>state.deposit)
  const photoInput = useRef(null)
  const [showModal,setShowModal] = useState(false)
  const [query,setQuery] = useState('')
  const [field, setField] = useState("depositedAt")
  const [order, setOrder] = useState("desc")
  const [statusFilter,setStatusFilter] = useState("all")
  const [imgSrc , setImageSrc] = useState(null)
  const [dates,setDates] = useState({startDate:'', endDate:''})
  
  const results = useSearch(
    data,
    query,
    search({
     fields:['name','amount','status','depositedAt',"depositedBy.name","depositedBy.email","depositedBy.phone"],
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

  const formik = useFormik({
    initialValues:{
      amount:user.position * 1000,
      proof:null
    },
    onSubmit:(values)=>{
        dispatch(createDeposit(values))
       
    },
    validationSchema: YUP.object({
      amount: YUP.number().required("Amount is required").min(1000, "Amafaranga ni make. shyiramo byibuze 1000FRW"),
      proof:YUP.mixed().required("Proof is required").test("fileType",'Only JPG,JPEG,PNG files are allowed',(value)=>{
            return value && ['image/jpeg','image/jpg','image/png'].includes(value.type)
            }).test("fileSize", "file size must be less 5MB",(value)=>{
              return value && value.size <=  5 * 1024 * 1024  
            })
    })
  })



const handleModal = ()=>{
  setShowModal((prev)=>!prev)
}

const handleShow = (val)=>{
    setStatusFilter(val)
}

const handleFilter = (val)=>{
const [fieldName,value] = val.split("-")
    setField(fieldName)
    setOrder(value)


}

const [showDelete,setShowDelete] = useState(false)
const [id, setId] = useState(null)
const handleDelete = (ids)=>{
   setShowDelete(true)
   setId(ids)
}
const handleCancel = ()=>{
  setId(null)
  setShowDelete(false)
}
const handleConfirm = ()=>{
  dispatch(deleteDeposit(id))
  setId(null)
  setShowDelete(false)
}
const handleEdit = (deposit)=>{

}

useEffect(()=>{

  if(success || error){
    const timeout =  setTimeout(()=>{
      dispatch(clearSuccessError())
      formik.resetForm()
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
const getStatusBadgeClass = (status) => {
      switch (status) {
        case "approved":
          return "bg-green-200 text-xs text-green-800 px-1  rounded-full"
        case "inactive":
          return "bg-gray-100 text-gray-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }

  return (
    <div>
    
<div className={`${imgSrc ? "fixed":"hidden"} z-72 inset-0 overflow-y-auto bg-black/30   w-full h-screen flex justify-center items-center;`}>

    <div className=' lg:w-1/2 bg-white '>
        <div className='flex py-4 justify-between  px-4 border-b border-gray-300'>
            <h3 className='uppercase font-bold'>Proof View</h3>
            <button className='btn bg-red-500' onClick={()=>setImageSrc(null)}><X size={16}/></button>
        </div>
        <img src={imgSrc} className='w-full'/>
    </div>
</div>

   {
      user && user.role == "admin" && 
      <div className="banner flex flex-col sm:flex-row gap-6 py-5 bg-navy-900 px-5 text-gray-100 rounded justify-between items-start lg:items-center z-10">
         <div className='flex-1 w-full'>
           <h4>Amount Balance</h4>
          <h3 className='text-2xl text-gray-400 font-bold'>{stats?.approvedAmount?.toLocaleString()} FRW</h3>
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

      <div className="my-3">
        
          {success && <div className='success'>{success}</div>}
          {error && <div className='error'>{error}</div>}
        
        <TableSection title="SAVINGS">

           
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
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Proof</th>
          
                </tr>
              </thead>
              <tbody>
                {
                   results.length != 0 && results.map((deposit,index)=>(
                    <tr key={index}>

                      <td>{index+1}</td>
                      <td><div  translate="no">{deposit?.depositedBy?.name}</div></td>
                      <td><div  translate="no">{deposit?.depositedBy?.email}</div></td>
                      <td><div  translate="no">{deposit?.depositedBy?.phone}</div></td>
                      <td>{deposit.amount.toLocaleString()} {deposit.currency}</td>
                      <td>{new Date(deposit.depositedAt).toDateString()}</td>
                      <td><span className={`${getStatusBadgeClass(deposit.status)}`}>{deposit.status}</span></td>
                      <td>
                        <div>
                           <img src={deposit?.proof?.url}  className='cursor-pointer w-8 h-8' onClick={()=> setImageSrc(deposit?.proof?.url)}/>
                        </div>
                      </td>
                      
                     

                    </tr>
                  ))
                }
              </tbody>
           </table>
        </TableSection>
      </div>
    </div>
  )
}

export default Savings