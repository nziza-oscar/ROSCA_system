import React, { useEffect, useRef, useState } from 'react'
import TableSection from '../components/TableSection'
import { useDispatch, useSelector } from 'react-redux'
import { Edit, Trash2, X } from 'lucide-react'
import {Form, FormikProvider, useFormik} from "formik"
import * as YUP from  "yup"
import { createDeposit, deleteDeposit } from '../../actions/dashboard'
import { search, useSearch,sort, filter } from "use-search-react"
import DeleteModal from '../components/DeleteModal'
import { clearSuccessError } from '../../reducers/dashboard/DepositSlice'

const Savings = () => {
  const {user} = useSelector((state)=>state.auth)
  const {data,loading,error,success,stats} = useSelector((state)=>state.deposit)
  const photoInput = useRef(null)
  const [showModal,setShowModal] = useState(false)
  const [query,setQuery] = useState('')
  const [field, setField] = useState("depositedAt")
  const [order, setOrder] = useState("desc")
  const [statusFilter,setStatusFilter] = useState("all")
  const [allowed,setAllowed] = useState(false)
  const results = useSearch(
    data,
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
    console.log(fieldName)

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

useEffect(()=>{
     const today = new Date().toDateString()
     if(data){
        const toDayDeposit = data.find((data)=>new Date(data.depositedAt).toDateString() === today)
        if(toDayDeposit){
           setAllowed(false)
        }
        else{
          setAllowed(true)
        }
     }
},[data])

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
      user && user.role == "admin" && <div className="banner flex py-5 bg-navy-900 px-5 text-gray-100 rounded flex  justify-between items-center z-10 ">
         <div>
           <h4>Amount Balance</h4>
          <h3 className='text-2xl text-gray-400 font-bold'>{stats?.approvedAmount?.toLocaleString()} FRW</h3>
         </div>
         { !(["admin"].includes(user.role)) && allowed &&  <div><button className='btn bg-purple-500 relative' onClick={handleModal}>Deposit</button></div> }
      </div>
    }

      <div className="my-3">
        
          {success && <div className='success'>{success}</div>}
          {error && <div className='error'>{error}</div>}
        
        <TableSection title="Deposits">

         <div className="flex gap-2">
          <div>
             <select className='input text-xs' translate='no' onChange={(e)=>handleFilter(e.target.value)}>
             <option>Sort By</option>
             <option value="depositedAt-desc">Newest</option>
             <option value="depositedAt-asc">Oldest</option>
             <option value="amount-desc">High to low </option>
             <option value="amount-asc">Low to high </option>
          </select>
          </div>
          <div>
             <select className='input text-xs' onChange={(e)=>handleShow(e.target.value)}>
             <option>Show</option>
             <option value="pending">Pending</option>
             <option value="approved">Approved</option>
             <option value="rejected">Rejected</option>
             <option value="cancelled">Cancelled</option>
          </select>
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
                 <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                   results.length != 0 && results.map((deposit,index)=>(
                    <tr key={index}>

                      <td>{index+1}</td>
                      <td><div  translate="no">{deposit?.depositedBy?.name}</div></td>
                      <td><div  translate="no">{deposit?.depositedBy?.email}</div></td>
                      <td>{deposit.amount.toLocaleString()} {deposit.currency}</td>
                      <td>{new Date(deposit.depositedAt).toDateString()}</td>
                      <td>{deposit.status}</td>
                      <td>
                        <div>
                           <img src={deposit?.proof?.url} className='w-8 h-8 rounded' />
                        </div>
                      </td>
                      <td>
                        <div className='flex gap-2'>
                         { 
                          deposit.status === "pending" &&    <button className='text-blue-500 p-1 rounded hover:bg-blue-100 cursor-pointer' onClick={()=>handleEdit(deposit._id)}><Edit size={16}/></button>
                         }
                          {
                     
                            deposit.status !== "approved" &&      <button className='text-red-500 p-1 rounded hover:bg-red-200 cursor-pointer' onClick={()=>handleDelete(deposit._id)}><Trash2 size={16}/></button>
                          }
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