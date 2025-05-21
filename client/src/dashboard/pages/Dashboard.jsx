"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import StatCard from "../components/StatCard"
import TableSection from "../components/TableSection"
import TransactionsTable from "../components/TransactionsTable"
import ActivitiesTable from "../components/ActivitiesTable"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (

      <div className="flex-1 flex flex-col overflow-hidden">
      
        <main className="flex-1 overflow-y-auto p-4">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="System Users" value="15" color="blue" />
            <StatCard title="borrowers" value="5" color="purple" />
            <StatCard title="Money SAVINGS" value="120,000frw" color="red" />
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TableSection title="Recent transactions">
              <TransactionsTable />
            </TableSection>

            <TableSection title="Recent activities">
              <ActivitiesTable />
            </TableSection>
          </div>
        </main>
      </div>

  )
}
