"use client"

import { useState } from "react"
import NotificationCard from "../../../components/NotificationCard"
import NotificationFilters from "../../../components/NotificationFilters"
import { Bell } from "lucide-react"

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New message from John Doe",
      description:
        "You have received a new message regarding the project update. Please check your inbox for more details.",
      time: "2 minutes ago",
      unread: true,
      priority: "high",
      category: "user",
    },
    {
      id: 2,
      type: "alert",
      title: "System maintenance scheduled",
      description:
        "Scheduled maintenance will begin at 2:00 AM EST. The system will be unavailable for approximately 2 hours.",
      time: "1 hour ago",
      unread: true,
      priority: "medium",
      category: "system",
    },
    {
      id: 3,
      type: "success",
      title: "Payment received",
      description: "You have successfully received a payment of $150.00 from client ABC Corp.",
      time: "3 hours ago",
      unread: false,
      priority: "low",
      category: "payment",
    },
    {
      id: 4,
      type: "alert",
      title: "Security alert",
      description: "Unusual login activity detected from a new device. Please verify if this was you.",
      time: "5 hours ago",
      unread: true,
      priority: "high",
      category: "security",
    },
    {
      id: 5,
      type: "message",
      title: "New user registered",
      description: "Jane Smith has successfully registered and joined your platform.",
      time: "1 day ago",
      unread: false,
      priority: "low",
      category: "user",
    },
    {
      id: 6,
      type: "success",
      title: "Backup completed",
      description: "Daily backup has been completed successfully. All data is secure.",
      time: "1 day ago",
      unread: false,
      priority: "low",
      category: "system",
    },
    {
      id: 7,
      type: "alert",
      title: "Failed payment attempt",
      description: "A payment attempt of $75.00 has failed due to insufficient funds.",
      time: "2 days ago",
      unread: false,
      priority: "medium",
      category: "payment",
    },
    {
      id: 8,
      type: "message",
      title: "Profile updated",
      description: "Your profile information has been successfully updated.",
      time: "3 days ago",
      unread: false,
      priority: "low",
      category: "user",
    },
  ])

  // Filter notifications based on search term, filter, and category
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "unread" && notification.unread) ||
      (selectedFilter === "read" && !notification.unread)

    const matchesCategory = selectedCategory === "all" || notification.category === selectedCategory

    return matchesSearch && matchesFilter && matchesCategory
  })

  const unreadCount = notifications.filter((n) => n.unread).length

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
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
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

      {/* Stats */}
      {notifications.length > 0 && (
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
      )}
    </div>
  )
}
