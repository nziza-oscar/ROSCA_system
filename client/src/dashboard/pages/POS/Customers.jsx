"use client"

import { useState } from "react"
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Edit,
  Menu,
  X,
  ArrowUpDown,
  Filter,
  MoreHorizontal,
  UserPlus,
  Phone,
  Calendar,
  Eye,
  Mail,
  MapPin,
  Tag,
  DollarSign,
  ShoppingBag,
  Download,
  Send,
} from "lucide-react"

export default function CustomerManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGroup, setFilterGroup] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("info")

  // Sample customer data
  const customers = [
    {
      id: "CUST-1001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      group: "retail",
      status: "active",
      totalSpent: 1245.67,
      lastPurchase: "Today, 10:45 AM",
      joinDate: "Jan 15, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      orders: [
        {
          id: "ORD-5678",
          date: "Today, 10:45 AM",
          items: 3,
          total: "$129.99",
          status: "completed",
        },
        {
          id: "ORD-5432",
          date: "Mar 15, 2023",
          items: 2,
          total: "$85.50",
          status: "completed",
        },
        {
          id: "ORD-4987",
          date: "Feb 28, 2023",
          items: 4,
          total: "$210.75",
          status: "completed",
        },
      ],
      notes: "Prefers to be contacted via email. Interested in new product launches.",
    },
    {
      id: "CUST-1002",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 234-5678",
      address: "456 Park Ave, Boston, MA 02108",
      group: "wholesale",
      status: "active",
      totalSpent: 5432.1,
      lastPurchase: "Yesterday, 3:30 PM",
      joinDate: "Nov 5, 2022",
      avatar: "/placeholder.svg?height=40&width=40",
      orders: [
        {
          id: "ORD-5677",
          date: "Yesterday, 3:30 PM",
          items: 10,
          total: "$450.00",
          status: "completed",
        },
        {
          id: "ORD-5430",
          date: "Mar 10, 2023",
          items: 15,
          total: "$675.50",
          status: "completed",
        },
      ],
      notes: "Wholesale customer for restaurant supplies. Orders in bulk monthly.",
    },
    {
      id: "CUST-1003",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 (555) 345-6789",
      address: "789 Oak St, Chicago, IL 60007",
      group: "retail",
      status: "active",
      totalSpent: 876.45,
      lastPurchase: "Mar 28, 2023",
      joinDate: "Feb 12, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      orders: [
        {
          id: "ORD-5433",
          date: "Mar 28, 2023",
          items: 2,
          total: "$95.45",
          status: "completed",
        },
      ],
      notes: "",
    },
    {
      id: "CUST-1004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 456-7890",
      address: "321 Pine St, Seattle, WA 98101",
      group: "retail",
      status: "inactive",
      totalSpent: 432.2,
      lastPurchase: "Jan 15, 2023",
      joinDate: "Dec 5, 2022",
      avatar: "/placeholder.svg?height=40&width=40",
      orders: [
        {
          id: "ORD-4567",
          date: "Jan 15, 2023",
          items: 1,
          total: "$45.99",
          status: "completed",
        },
        {
          id: "ORD-4321",
          date: "Dec 20, 2022",
          items: 3,
          total: "$125.75",
          status: "completed",
        },
      ],
      notes: "Customer has moved out of state. Account marked as inactive.",
    },
    {
      id: "CUST-1005",
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      phone: "+1 (555) 567-8901",
      address: "654 Maple Ave, Austin, TX 78701",
      group: "corporate",
      status: "active",
      totalSpent: 7654.32,
      lastPurchase: "Today, 9:15 AM",
      joinDate: "Oct 10, 2022",
      avatar: "/placeholder.svg?height=40&width=40",
      orders: [
        {
          id: "ORD-5676",
          date: "Today, 9:15 AM",
          items: 8,
          total: "$345.88",
          status: "completed",
        },
        {
          id: "ORD-5431",
          date: "Mar 20, 2023",
          items: 12,
          total: "$560.45",
          status: "completed",
        },
        {
          id: "ORD-5187",
          date: "Feb 15, 2023",
          items: 15,
          total: "$780.99",
          status: "completed",
        },
      ],
      notes: "Corporate account for Wilson Enterprises. Tax exempt status verified.",
    },
    {
      id: "CUST-1006",
      name: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      phone: "+1 (555) 678-9012",
      address: "987 Madison Ave, New York, NY 10075",
      group: "retail",
      status: "active",
      totalSpent: 543.21,
      lastPurchase: "Mar 25, 2023",
      joinDate: "Jan 20, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      orders: [
        {
          id: "ORD-5188",
          date: "Mar 25, 2023",
          items: 2,
          total: "$87.50",
          status: "completed",
        },
      ],
      notes: "Frequent online shopper. Prefers home delivery.",
    },
    {
      id: "CUST-1007",
      name: "David Martinez",
      email: "david.martinez@example.com",
      phone: "+1 (555) 789-0123",
      address: "135 West End Ave, New York, NY 10023",
      group: "wholesale",
      status: "active",
      totalSpent: 4321.09,
      lastPurchase: "Yesterday, 1:30 PM",
      joinDate: "Sep 15, 2022",
      avatar: "/placeholder.svg?height=40&width=40",
      orders: [
        {
          id: "ORD-5675",
          date: "Yesterday, 1:30 PM",
          items: 20,
          total: "$890.00",
          status: "completed",
        },
        {
          id: "ORD-5189",
          date: "Mar 1, 2023",
          items: 15,
          total: "$675.50",
          status: "completed",
        },
      ],
      notes: "Wholesale customer for Martinez Catering. Has special pricing agreement.",
    },
    {
      id: "CUST-1008",
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      phone: "+1 (555) 890-1234",
      address: "246 Elm St, Chicago, IL 60614",
      group: "retail",
      status: "active",
      totalSpent: 765.43,
      lastPurchase: "Mar 20, 2023",
      joinDate: "Feb 5, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      orders: [
        {
          id: "ORD-5190",
          date: "Mar 20, 2023",
          items: 3,
          total: "$125.75",
          status: "completed",
        },
      ],
      notes: "",
    },
    {
      id: "CUST-1009",
      name: "Thomas Jackson",
      email: "thomas.jackson@example.com",
      phone: "+1 (555) 901-2345",
      address: "789 Broadway, San Francisco, CA 94109",
      group: "corporate",
      status: "active",
      totalSpent: 8765.43,
      lastPurchase: "Today, 11:45 AM",
      joinDate: "Aug 10, 2022",
      avatar: "/placeholder.svg?height=40&width=40",
      orders: [
        {
          id: "ORD-5674",
          date: "Today, 11:45 AM",
          items: 10,
          total: "$450.00",
          status: "completed",
        },
        {
          id: "ORD-5429",
          date: "Mar 15, 2023",
          items: 12,
          total: "$560.45",
          status: "completed",
        },
        {
          id: "ORD-5191",
          date: "Feb 28, 2023",
          items: 15,
          total: "$780.99",
          status: "completed",
        },
      ],
      notes: "Corporate account for Jackson Industries. Requires PO number for all orders.",
    },
    {
      id: "CUST-1010",
      name: "Amanda White",
      email: "amanda.white@example.com",
      phone: "+1 (555) 012-3456",
      address: "321 5th Ave, Seattle, WA 98101",
      group: "retail",
      status: "inactive",
      totalSpent: 321.09,
      lastPurchase: "Dec 10, 2022",
      joinDate: "Nov 15, 2022",
      avatar: "/placeholder.svg?height=40&width=40",
      orders: [
        {
          id: "ORD-4322",
          date: "Dec 10, 2022",
          items: 1,
          total: "$45.99",
          status: "completed",
        },
      ],
      notes: "Customer requested account deactivation on Jan 5, 2023.",
    },
  ]

  // Customer groups for filtering
  const groups = [
    { id: "all", name: "All Customers" },
    { id: "retail", name: "Retail" },
    { id: "wholesale", name: "Wholesale" },
    { id: "corporate", name: "Corporate" },
  ]

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGroup = filterGroup === "all" || customer.group === filterGroup
      const matchesStatus = filterStatus === "all" || customer.status === filterStatus
      return matchesSearch && matchesGroup && matchesStatus
    })
    .sort((a, b) => {
      let comparison = 0
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "totalSpent") {
        comparison = a.totalSpent - b.totalSpent
      } else if (sortBy === "lastPurchase") {
        // Simple string comparison for demo purposes
        comparison = a.lastPurchase.localeCompare(b.lastPurchase)
      } else if (sortBy === "joinDate") {
        comparison = a.joinDate.localeCompare(b.joinDate)
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const openCustomerDetails = (customer) => {
    setSelectedCustomer(customer)
    setShowDetailsModal(true)
    setActiveTab("info")
  }

  const getGroupBadgeClass = (group) => {
    switch (group) {
      case "retail":
        return "bg-blue-100 text-blue-800"
      case "wholesale":
        return "bg-purple-100 text-purple-800"
      case "corporate":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOrderStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white pt-5 overflow-y-auto border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-bold text-gray-800">RetailPro POS</span>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                Dashboard
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                Point of Sale
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Package className="mr-3 h-5 w-5" />
                Inventory
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700"
              >
                <Users className="mr-3 h-5 w-5" />
                Customers
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                Reports
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </a>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div className="inline-block h-9 w-9 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=36&width=36"
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Alex Johnson</p>
                  <p className="text-xs font-medium text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`md:hidden fixed inset-0 flex z-40 ${sidebarOpen ? "" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-xl font-bold text-gray-800">RetailPro POS</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <BarChart3 className="mr-4 h-6 w-6" />
                Dashboard
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <ShoppingCart className="mr-4 h-6 w-6" />
                Point of Sale
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Package className="mr-4 h-6 w-6" />
                Inventory
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-blue-50 text-blue-700"
              >
                <Users className="mr-4 h-6 w-6" />
                Customers
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <BarChart3 className="mr-4 h-6 w-6" />
                Reports
              </a>
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Settings className="mr-4 h-6 w-6" />
                Settings
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b border-gray-200">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow md:border-b md:shadow-none">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <label htmlFor="search-field" className="sr-only">
                  Search Customers
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 ml-3" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-10 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search by name, email, phone, or ID..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=32&width=32"
                        alt="User avatar"
                        className="h-full w-full rounded-full"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 pb-8">
          <div className="mt-8 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-semibold text-gray-900">Customer Management</h1>
                <p className="mt-2 text-sm text-gray-700">
                  View and manage customer information, purchase history, and account details.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    Filters
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCustomer(null)
                      setShowAddModal(true)
                    }}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Customer
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 bg-white shadow rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="group-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Group
                    </label>
                    <select
                      id="group-filter"
                      value={filterGroup}
                      onChange={(e) => setFilterGroup(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="status-filter"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setFilterGroup("all")
                        setFilterStatus("all")
                        setSearchTerm("")
                      }}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Customers Table */}
            <div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Customer
                          {sortBy === "name" && <ArrowUpDown className="ml-1 h-4 w-4 text-gray-400" />}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("totalSpent")}
                      >
                        <div className="flex items-center">
                          Total Spent
                          {sortBy === "totalSpent" && <ArrowUpDown className="ml-1 h-4 w-4 text-gray-400" />}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("lastPurchase")}
                      >
                        <div className="flex items-center">
                          Last Purchase
                          {sortBy === "lastPurchase" && <ArrowUpDown className="ml-1 h-4 w-4 text-gray-400" />}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Group
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => openCustomerDetails(customer)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={customer.avatar || "/placeholder.svg"}
                                alt={customer.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                              <div className="text-sm text-gray-500">{customer.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{customer.email}</div>
                          <div className="text-sm text-gray-500">{customer.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${customer.totalSpent.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastPurchase}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getGroupBadgeClass(
                              customer.group,
                            )}`}
                          >
                            {customer.group.charAt(0).toUpperCase() + customer.group.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                openCustomerDetails(customer)
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                // Handle edit action
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                // Handle more options
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">{filteredCustomers.length}</span> of{" "}
                      <span className="font-medium">{filteredCustomers.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <ChevronDown className="h-5 w-5 rotate-90" />
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <ChevronDown className="h-5 w-5 -rotate-90" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Customer Details Modal */}
      {showDetailsModal && selectedCustomer && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Details</h3>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          selectedCustomer.status,
                        )}`}
                      >
                        {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center mb-6">
                      <div className="flex-shrink-0 h-16 w-16">
                        <img
                          className="h-16 w-16 rounded-full"
                          src={selectedCustomer.avatar || "/placeholder.svg"}
                          alt={selectedCustomer.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-xl font-medium text-gray-900">{selectedCustomer.name}</div>
                        <div className="text-sm text-gray-500">{selectedCustomer.id}</div>
                        <span
                          className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getGroupBadgeClass(
                            selectedCustomer.group,
                          )}`}
                        >
                          {selectedCustomer.group.charAt(0).toUpperCase() + selectedCustomer.group.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-4">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                          onClick={() => setActiveTab("info")}
                          className={`${
                            activeTab === "info"
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                          Customer Information
                        </button>
                        <button
                          onClick={() => setActiveTab("orders")}
                          className={`${
                            activeTab === "orders"
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                          Order History
                        </button>
                        <button
                          onClick={() => setActiveTab("notes")}
                          className={`${
                            activeTab === "notes"
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                          Notes
                        </button>
                      </nav>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "info" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">Contact Information</h4>
                          <dl className="space-y-3">
                            <div className="flex items-start">
                              <dt className="flex-shrink-0">
                                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                              </dt>
                              <dd className="text-sm text-gray-900">{selectedCustomer.email}</dd>
                            </div>
                            <div className="flex items-start">
                              <dt className="flex-shrink-0">
                                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                              </dt>
                              <dd className="text-sm text-gray-900">{selectedCustomer.phone}</dd>
                            </div>
                            <div className="flex items-start">
                              <dt className="flex-shrink-0">
                                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                              </dt>
                              <dd className="text-sm text-gray-900">{selectedCustomer.address}</dd>
                            </div>
                          </dl>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">Account Information</h4>
                          <dl className="space-y-3">
                            <div className="flex items-start">
                              <dt className="flex-shrink-0">
                                <Tag className="h-5 w-5 text-gray-400 mr-2" />
                              </dt>
                              <dd className="text-sm text-gray-900">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getGroupBadgeClass(
                                    selectedCustomer.group,
                                  )}`}
                                >
                                  {selectedCustomer.group.charAt(0).toUpperCase() + selectedCustomer.group.slice(1)}
                                </span>
                              </dd>
                            </div>
                            <div className="flex items-start">
                              <dt className="flex-shrink-0">
                                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                              </dt>
                              <dd className="text-sm text-gray-900">
                                <span className="font-medium">Joined:</span> {selectedCustomer.joinDate}
                              </dd>
                            </div>
                            <div className="flex items-start">
                              <dt className="flex-shrink-0">
                                <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                              </dt>
                              <dd className="text-sm text-gray-900">
                                <span className="font-medium">Total Spent:</span> $
                                {selectedCustomer.totalSpent.toFixed(2)}
                              </dd>
                            </div>
                            <div className="flex items-start">
                              <dt className="flex-shrink-0">
                                <ShoppingBag className="h-5 w-5 text-gray-400 mr-2" />
                              </dt>
                              <dd className="text-sm text-gray-900">
                                <span className="font-medium">Last Purchase:</span> {selectedCustomer.lastPurchase}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    )}

                    {activeTab === "orders" && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-medium text-gray-500">Order History</h4>
                          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </button>
                        </div>
                        {selectedCustomer.orders.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Order ID
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Items
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Total
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Status
                                  </th>
                                  <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {selectedCustomer.orders.map((order) => (
                                  <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                      {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusBadgeClass(
                                          order.status,
                                        )}`}
                                      >
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <button className="text-blue-600 hover:text-blue-900">View</button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                            <p className="mt-1 text-sm text-gray-500">This customer hasn't made any purchases yet.</p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "notes" && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-medium text-gray-500">Customer Notes</h4>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          {selectedCustomer.notes ? (
                            <p className="text-sm text-gray-700">{selectedCustomer.notes}</p>
                          ) : (
                            <p className="text-sm text-gray-500 italic">No notes available for this customer.</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="new-note" className="block text-sm font-medium text-gray-700 mb-1">
                            Add a note
                          </label>
                          <textarea
                            id="new-note"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter notes about this customer..."
                          ></textarea>
                          <div className="mt-2 flex justify-end">
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <Send className="h-4 w-4 mr-1" />
                              Save Note
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    // Handle edit action
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Edit Customer
                </button>
                <button
                  type="button"
                  onClick={() => setShowDetailsModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Customer</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter customer name"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter email address"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter phone number"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter street address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter city"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter state/province"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter postal code"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter country"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Group</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                          <option value="retail">Retail</option>
                          <option value="wholesale">Wholesale</option>
                          <option value="corporate">Corporate</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md h-20 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter any additional notes about this customer..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Customer
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
