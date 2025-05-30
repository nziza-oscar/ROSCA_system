"use client"

import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import StatCard from "../components/StatCard"
import TableSection from "../components/TableSection"
import TransactionsTable from "../components/TransactionsTable"
import ActivitiesTable from "../components/ActivitiesTable"
import { useSelector } from "react-redux"

export default function Dashboard() {

const {user,users,loading} = useSelector((state)=>state.auth)
const {data,stats} = useSelector(state=>state.deposit)
const [haveDebt,setHaveDebt] = useState(false)

useEffect(() => {
  if (data && data.length > 0) {
    const today = new Date().toDateString();

    const findDebt = data.find((deposit) => {
      const depositDate = new Date(deposit.depositedAt).toDateString();
      return depositDate === today;
    });

    setHaveDebt(!findDebt);
  }
}, [data]);


  return (

        <main className="flex-1 overflow-y-auto p-4 min-h-screen">
          {/* Stats Section */}
          {
          user &&   user.role == "admin" &&  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="System Users" value={users.length} color="blue" />
            <StatCard title="borrowers" value="5" color="purple" />
            <StatCard title="Money SAVINGS" value={`${stats?.approvedAmount?.toLocaleString()} FRW`} color="red" />
          </div>
          }

          {
           user && user.role == "user" &&  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
           
            <StatCard icon="SAVINGS" title="Money savings" value={`${stats?.approvedAmount?.toLocaleString()} FRW`} color="red" />
            {  haveDebt && <StatCard title="Borrowed" value="5" color="purple" /> }
            <StatCard icon="POSITION" title={`Positions: ${user?.position}`} value={`${(user?.position * 1000 ).toLocaleString()}frw per day`} color="sky" />
          </div>
          }

       
            {
            user &&   user.role == "admin" &&    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> <TableSection title="Recent transactions">
              <TransactionsTable />
            </TableSection>

            <TableSection title="Recent activities">
              <ActivitiesTable />
            </TableSection>
          </div>
            }
        </main>


  )
}
