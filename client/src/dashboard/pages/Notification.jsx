"use client"

import { useState } from "react"
import NotificationCard from "../components/NotificationCard"
import NotificationFilters from "../components/NotificationFilters"
import { Bell } from "lucide-react"
import { fetchNotifications } from "../../API/dashboardApi"
import {useEffect} from "react"
import { useSelector } from "react-redux"
export default function Notification() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const {user} = useSelector((state)=>state.auth)

  // Sample notifications data
  const [notifications, setNotifications] = useState([])

  // Filter notifications based on search term, filter, and category
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.description.toLowerCase().includes(searchTerm.toLowerCase()) || notification.from.name.toLowerCase().includes(searchTerm.toLowerCase()) || notification.not_type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "unread" && !notification.readBy.includes(user._id)) ||
      (selectedFilter === "read" && notification.readBy.includes(user._id))

    const matchesCategory = selectedCategory === "all" || notification.not_type === selectedCategory

    return matchesSearch && matchesFilter && matchesCategory
  })

  const unreadCount = notifications.filter((n) => n.unread).length

  const getNotifications = async ()=>{
    try {
        const {data} = await fetchNotifications()
        setNotifications(data)
        console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, unread: !notification.unread } : notification,
      ),
    )
  }

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, unread: false })))
  }

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all notifications? This action cannot be undone.")) {
      setNotifications([])
    }
  }

  useEffect(()=>{
      getNotifications()
  },[])


  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <Bell size={24} className="text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        </div>
        <p className="text-gray-600">
          Manage all your notifications in one place. You have {unreadCount} unread notifications.
        </p>
      </div>

      {/* Filters */}
      <NotificationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDeleteAll={handleDeleteAll}
        unreadCount={unreadCount}
      />

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
              user={user}
            />
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Bell size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedFilter !== "all" || selectedCategory !== "all"
                ? "Try adjusting your filters or search terms."
                : "You're all caught up! No new notifications."}
            </p>
          </div>
        )}
      </div>

   
      {/* {notifications.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Notification Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{notifications.filter((n) => !n.unread).length}</div>
              <div className="text-sm text-gray-500">Read</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{unreadCount}</div>
              <div className="text-sm text-gray-500">Unread</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {notifications.filter((n) => n.priority === "high").length}
              </div>
              <div className="text-sm text-gray-500">High Priority</div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}
