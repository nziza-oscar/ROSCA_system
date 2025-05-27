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

const Balance = () => {
  const {user} = useSelector((state)=>state.auth)
  const {data,loading,error,success,stats} = useSelector((state)=>state.deposit)
  const photoInput = useRef(null)
  const [showModal,setShowModal] = useState(false)
  const [query,setQuery] = useState('')
  const [field, setField] = useState("depositedAt")
  const [order, setOrder] = useState("desc")
  const [statusFilter,setStatusFilter] = useState("all")
  const [allowed,setAllowed] = useState(false)
  const [showMarque,setShowMarque] = useState(false)
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
        const toDayDeposit = data.find((data)=>new Date(data.depositedAt).toDateString() === today && data.status === "approved")
        const doIhavePending = data.find((data)=>new Date(data.depositedAt).toDateString() === today && data.status === "approved")
         
        if(doIhavePending){
          setShowMarque(true)
        }
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
      user && <div className="banner flex py-5 bg-navy-900 px-5 text-gray-100 rounded flex  justify-between items-center z-10 ">
         <div>
           <h4>Amount Balance</h4>
          <h3 className='text-2xl text-gray-400 font-bold'>{stats?.approvedAmount?.toLocaleString()} FRW</h3>
         </div>
         { !(["admin"].includes(user.role)) && allowed &&  <div><button className='btn bg-purple-500 relative' onClick={handleModal}>Deposit</button></div> }
      </div>
    }

  
  {
    showMarque && <marquee>Hello , <b>{user?.name}</b> You have a pending deposit request for today, please wait for admin to review and approve your deposit. Thanks!</marquee>

  }
  <div className={`${showModal?`modal`:`hidden`}`}>
      <div className="modal-content modal-sm">
          <div className="modal-header">
             <h3 className='title uppercase font-bold'>Deposit</h3>
             <div>
              <button className='modal-close btn' onClick={handleModal}><X size={16}/></button>
             </div>
          </div>

         <FormikProvider value={formik} className="py-3">
           
           {success && <div className='success'>{success}</div>}
           {error && <div className='error'>{error}</div>}

            <Form encType="multipart/form-data">
                <div>
                <label className='label'>Amount</label>
                <input type='number' step={0.001} name='amount' className='input bg-gray-200' placeholder='Enter amount....'
                 {...formik.getFieldProps("amount")}
                 readOnly
                />
                {
                  formik.errors.amount && formik.touched.amount && <div className='py-1 text-red-500 text-sm'>{formik.errors.amount}</div>
                }
              </div>

              <div>
                <label className='label'>Proof</label>
                <input type='file' step={0.001} name='proof' className='input'
                   ref={photoInput}
                  onChange={(event)=>{
                    formik.setFieldValue("proof",event.currentTarget.files[0])
                  }}
                accept="image/*"
              
                />
                 {
              formik.errors.proof && <div className="text-red-500 py-2 font-bold">{formik.errors.proof}*</div>
            }
              </div>

              <div className="py-2 border-b border-gray-200">
                <button disabled={loading} type='submit' className='btn bg-purple-500 w-64 text-center'>{loading ?"Saving":"Send"}</button>

              </div>
            </Form>
         </FormikProvider>
 
        <div className='py-2 flex gap-3 items-center'>
          <h3 className='text-sm'>Phone Number: <b>*182*1*1*0780389968#</b></h3>
          <span className='text-gray-400'>|</span>
          <h3 className='text-sm'>Names: <b>Rutagengwa Augustin</b></h3>
        </div>
        <marquee><b className='text-sm'>N.B: Remember to take phone screenshoot photo after paying</b>.</marquee>
      </div>
  </div>

  <DeleteModal showDelete={showDelete} cancel={handleCancel} confirm={handleConfirm} message="Are you sure you want to delete this deposit?" title="Delete Deposit"/>

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
                  {/* <th>Transaction Id</th> */}
                { (["admin"].includes(user.role)) &&  <><th>Names</th><th>Email</th><th>Phone</th></> }
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
                      {/* <td><small translate="no">{deposit.transactionId}</small></td> */}
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

export default Balance