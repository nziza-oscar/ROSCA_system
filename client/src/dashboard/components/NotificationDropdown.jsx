"use client"

import { Bell, MessageSquare, AlertCircle, Mail } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New message from John Doe",
      description: "You have received a new message",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "alert",
      title: "System maintenance scheduled",
      description: "Maintenance will start at 2:00 AM",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "info",
      title: "New user registered",
      description: "Jane Smith has joined the platform",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "message",
      title: "Payment received",
      description: "You received a payment of $150",
      time: "5 hours ago",
      unread: false,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const getNotificationIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageSquare size={16} className="text-blue-500" />
      case "alert":
        return <AlertCircle size={16} className="text-red-500" />
      default:
        return <Mail size={16} className="text-gray-500" />
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${notification.unread ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                      {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
