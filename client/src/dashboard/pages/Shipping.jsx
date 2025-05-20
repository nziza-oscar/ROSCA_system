"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Package,
  CheckCircle,
  AlertTriangle,
  Truck,
  RefreshCw,
  MapPin,
  Calendar,
  MoreHorizontal,
  X,
  Clock,
  CheckCircle2,
  PackageCheck,
  PackageOpen,
  Warehouse,
  ArrowRight,
} from "lucide-react"
import { filter, search, useSearch } from "use-search-react"

export default function ShippingManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showTrackingModal, setShowTrackingModal] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState(null)

  // Sample data
  const stats = [
    { title: "Total Shipments", value: "1,248", icon: Package, color: "bg-purple-100 text-purple-600" },
    { title: "In Transit", value: "312", icon: Truck, color: "bg-blue-100 text-blue-600" },
    { title: "Delivered", value: "876", icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { title: "Delayed", value: "60", icon: AlertTriangle, color: "bg-amber-100 text-amber-600" },
  ]

  const data = [
    {
      id: "SHP-39281",
      customer: "John Smith",
      date: "Apr 8, 2025",
      status: "delivered",
      items: 3,
      address: "123 Main St, New York, NY 10001",
      carrier: "FedEx",
      trackingNumber: "FDX7283910456",
      estimatedDelivery: "Apr 7, 2025",
      actualDelivery: "Apr 7, 2025",
      total: "$129.99",
      trackingHistory: [
        {
          date: "Apr 7, 2025 - 10:32 AM",
          status: "Delivered",
          location: "New York, NY",
          description: "Package delivered to recipient",
        },
        {
          date: "Apr 7, 2025 - 8:15 AM",
          status: "Out for Delivery",
          location: "New York, NY",
          description: "On FedEx vehicle for delivery",
        },
        {
          date: "Apr 6, 2025 - 9:42 PM",
          status: "At Local Facility",
          location: "New York, NY",
          description: "Arrived at FedEx facility",
        },
        {
          date: "Apr 5, 2025 - 3:17 PM",
          status: "In Transit",
          location: "Memphis, TN",
          description: "Departed FedEx hub",
        },
        {
          date: "Apr 4, 2025 - 6:24 PM",
          status: "Shipped",
          location: "Chicago, IL",
          description: "Picked up by FedEx",
        },
      ],
    },
    {
      id: "SHP-39280",
      customer: "Sarah Johnson",
      date: "Apr 7, 2025",
      status: "in-transit",
      items: 1,
      address: "456 Park Ave, Boston, MA 02108",
      carrier: "UPS",
      trackingNumber: "1Z9827361037291",
      estimatedDelivery: "Apr 10, 2025",
      actualDelivery: null,
      total: "$59.99",
      trackingHistory: [
        {
          date: "Apr 7, 2025 - 2:45 PM",
          status: "In Transit",
          location: "Hartford, CT",
          description: "Departed UPS facility",
        },
        {
          date: "Apr 7, 2025 - 9:30 AM",
          status: "In Transit",
          location: "Philadelphia, PA",
          description: "Arrived at UPS facility",
        },
        { date: "Apr 6, 2025 - 5:12 PM", status: "Shipped", location: "Atlanta, GA", description: "Picked up by UPS" },
      ],
    },
    {
      id: "SHP-39279",
      customer: "Michael Brown",
      date: "Apr 7, 2025",
      status: "processing",
      items: 2,
      address: "789 Oak St, Chicago, IL 60007",
      carrier: "USPS",
      trackingNumber: "9400111202934723457823",
      estimatedDelivery: "Apr 12, 2025",
      actualDelivery: null,
      total: "$89.50",
      trackingHistory: [
        {
          date: "Apr 7, 2025 - 11:20 AM",
          status: "Processing",
          location: "Chicago, IL",
          description: "Shipping label created",
        },
      ],
    },
    {
      id: "SHP-39278",
      customer: "Emily Davis",
      date: "Apr 6, 2025",
      status: "delayed",
      items: 4,
      address: "321 Pine St, Seattle, WA 98101",
      carrier: "DHL",
      trackingNumber: "DHL7391028465",
      estimatedDelivery: "Apr 8, 2025",
      actualDelivery: null,
      total: "$212.75",
      trackingHistory: [
        {
          date: "Apr 7, 2025 - 9:15 AM",
          status: "Delayed",
          location: "Portland, OR",
          description: "Delivery exception - weather delay",
        },
        {
          date: "Apr 6, 2025 - 4:30 PM",
          status: "In Transit",
          location: "Sacramento, CA",
          description: "Departed DHL facility",
        },
        {
          date: "Apr 6, 2025 - 10:45 AM",
          status: "In Transit",
          location: "Los Angeles, CA",
          description: "Arrived at DHL facility",
        },
        {
          date: "Apr 5, 2025 - 2:20 PM",
          status: "Shipped",
          location: "San Diego, CA",
          description: "Picked up by DHL",
        },
      ],
    },
    {
      id: "SHP-39277",
      customer: "Robert Wilson",
      date: "Apr 5, 2025",
      status: "delivered",
      items: 2,
      address: "654 Maple Ave, Austin, TX 78701",
      carrier: "FedEx",
      trackingNumber: "FDX8273645019",
      estimatedDelivery: "Apr 8, 2025",
      actualDelivery: "Apr 5, 2025",
      total: "$76.25",
      trackingHistory: [
        {
          date: "Apr 5, 2025 - 2:10 PM",
          status: "Delivered",
          location: "Austin, TX",
          description: "Package delivered to recipient",
        },
        {
          date: "Apr 5, 2025 - 9:30 AM",
          status: "Out for Delivery",
          location: "Austin, TX",
          description: "On FedEx vehicle for delivery",
        },
        {
          date: "Apr 4, 2025 - 8:45 PM",
          status: "At Local Facility",
          location: "Austin, TX",
          description: "Arrived at FedEx facility",
        },
        {
          date: "Apr 3, 2025 - 5:20 PM",
          status: "Shipped",
          location: "Houston, TX",
          description: "Picked up by FedEx",
        },
      ],
    },
  ]
  const [query,setQuery] = useState("")
  const shipments = useSearch(
    data,
    query,
    search({fields:['customer','date','address','status','id']}),
    filter({field:''})

  )
  const openDetailsModal = (shipment) => {
    setSelectedShipment(shipment)
    setShowDetailsModal(true)
  }

  const openTrackingModal = (shipment, e) => {
    e.stopPropagation()
    setSelectedShipment(shipment)
    setShowTrackingModal(true)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-purple-100 text-purple-800"
      case "delayed":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "in-transit":
        return <Truck className="h-4 w-4" />
      case "processing":
        return <RefreshCw className="h-4 w-4" />
      case "delayed":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getTrackingStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "out for delivery":
        return <Truck className="h-5 w-5 text-blue-600" />
      case "in transit":
        return <RefreshCw className="h-5 w-5 text-blue-600" />
      case "at local facility":
        return <Warehouse className="h-5 w-5 text-purple-600" />
      case "shipped":
        return <PackageCheck className="h-5 w-5 text-purple-600" />
      case "processing":
        return <PackageOpen className="h-5 w-5 text-gray-600" />
      case "delayed":
        return <AlertTriangle className="h-5 w-5 text-amber-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Shipping Management</h1>
        <p className="text-gray-500 mt-1">Monitor and manage all your shipments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-5 flex items-center">
            <div className={`${stat.color} p-3 rounded-full mr-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <h2 className="text-lg font-medium">Shipments</h2>
              <div className="ml-4 flex space-x-1">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1 text-sm rounded-md ${activeTab === "all" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("in-transit")}
                  className={`px-3 py-1 text-sm rounded-md ${activeTab === "in-transit" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  In Transit
                </button>
                <button
                  onClick={() => setActiveTab("delivered")}
                  className={`px-3 py-1 text-sm rounded-md ${activeTab === "delivered" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  Delivered
                </button>
                <button
                  onClick={() => setActiveTab("delayed")}
                  className={`px-3 py-1 text-sm rounded-md ${activeTab === "delayed" ? "bg-amber-100 text-amber-700" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  Delayed
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  onChange={(e)=>setQuery(e.target.value)}
                  type="text"
                  placeholder="Search shipments..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => openDetailsModal(shipment)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(shipment.status)}`}
                    >
                      {getStatusIcon(shipment.status)}
                      {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1).replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => openTrackingModal(shipment, e)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <Truck className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
                <span className="font-medium">24</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-purple-50 text-sm font-medium text-purple-600 hover:bg-purple-100">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  8
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Details Modal */}
      {showDetailsModal && selectedShipment && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-72 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium">Shipment Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Shipment Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Shipment ID:</span> {selectedShipment.id}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Date:</span> {selectedShipment.date}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Status:</span>{" "}
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedShipment.status)}`}
                      >
                        {getStatusIcon(selectedShipment.status)}
                        {selectedShipment.status.charAt(0).toUpperCase() +
                          selectedShipment.status.slice(1).replace("-", " ")}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Items:</span> {selectedShipment.items}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Total:</span> {selectedShipment.total}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Name:</span> {selectedShipment.customer}
                    </p>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-500" />
                      <span>{selectedShipment.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-medium text-gray-900 mb-3">Shipping Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 flex-shrink-0 text-gray-500" />
                      <span>
                        <span className="font-medium text-gray-700">Carrier:</span> {selectedShipment.carrier}
                      </span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Tracking Number:</span>{" "}
                      {selectedShipment.trackingNumber}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 flex-shrink-0 text-gray-500" />
                      <span>
                        <span className="font-medium text-gray-700">Est. Delivery:</span>{" "}
                        {selectedShipment.estimatedDelivery}
                      </span>
                    </div>
                    {selectedShipment.actualDelivery && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        <span>
                          <span className="font-medium">Delivered:</span> {selectedShipment.actualDelivery}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowDetailsModal(false)
                  setShowTrackingModal(true)
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Track Package
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Tracking Modal */}
      {showTrackingModal && selectedShipment && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-72 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium">Track Package</h3>
              <button onClick={() => setShowTrackingModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Shipment #{selectedShipment.id}</h4>
                    <p className="text-sm text-gray-500">
                      {selectedShipment.carrier} - {selectedShipment.trackingNumber}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(selectedShipment.status)}`}
                    >
                      {getStatusIcon(selectedShipment.status)}
                      {selectedShipment.status.charAt(0).toUpperCase() +
                        selectedShipment.status.slice(1).replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">FROM</p>
                      <p className="text-sm font-medium">Warehouse</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">TO</p>
                      <p className="text-sm font-medium">{selectedShipment.address}</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  {selectedShipment.trackingHistory.map((event, index) => (
                    <div key={index} className="flex mb-6 relative">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full p-2 bg-white border-2 border-purple-500 z-10">
                          {getTrackingStatusIcon(event.status)}
                        </div>
                        {index < selectedShipment.trackingHistory.length - 1 && (
                          <div className="h-full w-0.5 bg-gray-200"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between mb-1">
                            <h5 className="font-medium text-gray-900">{event.status}</h5>
                            <span className="text-sm text-gray-500">{event.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{event.location}</p>
                          <p className="text-sm text-gray-500">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-2">
              <button
                onClick={() => setShowTrackingModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
