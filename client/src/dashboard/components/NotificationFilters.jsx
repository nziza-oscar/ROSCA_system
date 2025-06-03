"use client"

import { Search, Filter, CheckCircle, Trash2 } from "lucide-react"

export default function NotificationFilters({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
  selectedCategory,
  setSelectedCategory,
  onMarkAllAsRead,
  onDeleteAll,
  unreadCount,
}) {
  const filters = [
    { value: "all", label: "All Notifications" },
    { value: "unread", label: "Unread" },
    { value: "read", label: "Read" },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "new_account", label: "New Users" },
    { value: "deposit", label: "Payments" },
    { value: "withdrawals", label: "Withdrawal" },
  ]

  const priorities = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" },
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onMarkAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <CheckCircle size={16} className="mr-2" />
              Mark All Read
            </button>
            <button
              onClick={onDeleteAll}
              className="flex items-center px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 size={16} className="mr-2" />
              Delete All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
