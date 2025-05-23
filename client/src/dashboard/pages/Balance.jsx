import React from 'react'
import TableSection from '../components/TableSection'

const Balance = () => {
  return (
    <div>
      <div className="banner flex py-5 bg-navy-900 px-5 text-gray-100 rounded flex  justify-between items-center ">
         <div>
           <h4>Amount Balance</h4>
          <h3 className='text-2xl text-gray-400 font-bold'>500,000 FRW</h3>
         </div>
         <div><button className='btn bg-purple-500'>Deposit</button></div>
      </div>


      <div className="my-3">
        <TableSection title="Deposits">
           <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Proof</th>
                </tr>
              </thead>
           </table>
        </TableSection>
      </div>
    </div>
  )
}

export default Balance