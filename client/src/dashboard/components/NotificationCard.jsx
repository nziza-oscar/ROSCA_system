"use client"

import { MessageSquare, AlertCircle, Mail, CheckCircle, Trash2, MoreVertical } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function NotificationCard({ notification, onMarkAsRead, onDelete }) {
  const [showActions, setShowActions] = useState(false)
  const actionsRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowActions(false)
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
        return <MessageSquare size={20} className="text-blue-500" />
      case "alert":
        return <AlertCircle size={20} className="text-red-500" />
      case "success":
        return <CheckCircle size={20} className="text-green-500" />
      default:
        return <Mail size={20} className="text-gray-500" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (
    <div
      className={`bg-white rounded-lg shadow border-l-4 ${getPriorityColor(notification.priority)} p-6 ${
        notification.unread ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
              {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  notification.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : notification.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                {notification.priority}
              </span>
            </div>
            <p className="text-gray-600 mb-3">{notification.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{notification.time}</span>
                <span>•</span>
                <span className="capitalize">{notification.category}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative" ref={actionsRef}>
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreVertical size={16} />
          </button>

          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
              <div className="py-2">
                <button
                  onClick={() => {
                    onMarkAsRead(notification.id)
                    setShowActions(false)
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <CheckCircle size={16} className="mr-3" />
                  {notification.unread ? "Mark as read" : "Mark as unread"}
                </button>
                <button
                  onClick={() => {
                    onDelete(notification.id)
                    setShowActions(false)
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} className="mr-3" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
