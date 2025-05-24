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
  Lock,
  Phone,
  Calendar,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Save,
  EyeIcon,
  Edit2,
  EditIcon,
} from "lucide-react"

import { Form, FormikContext, useFormik } from "formik"
 import * as YUP from "yup"
import { useDispatch, useSelector } from "react-redux"
import { createUser } from "../../actions/users"

export default function UserManagement() {
 
  const { users } = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showFilters, setShowFilters] = useState(false)


  const [showPass,setShowPass] = useState(false)

  const handlePass = ()=>{
    setShowPass((prev)=>!prev)
  }

  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      role:'',
      department:'',
      phonenumber:'',
      status:'',
      password:''

    },
    onSubmit:(values)=>{
        dispatch(createUser(values))

    },

    validationSchema:YUP.object({
      name:YUP.string().required("User fullname required*"),
      email:YUP.string().required("Email is required").email("Invalid Email"),
      role:YUP.string().required("Role is required").oneOf(["manager","admin","cashier",'inventory','manager']),
      department:YUP.string().required("Department is required"),

      phonenumber:YUP.string().required("Phonenumber is required").min(10,"Phonenumber has to be 10 digit").max(13,"Phonenumber can not execeed 13 digits"),
      status:YUP.string().required("Status is required").oneOf(["ACTIVE","INACTIVE"]),
      password:YUP.string().required("Password is required").min(5,"At least 5 characters long").max(8,"Do not exceed 8 characters")
    
    })

  })

  const roles = [
    { id: "all", name: "All Roles" },
    { id: "admin", name: "Administrator" },
    { id: "manager", name: "Manager" },
    { id: "cashier", name: "Cashier" },
    { id: "inventory", name: "Inventory Specialist" },
  ]


  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = filterRole === "all" || user.role === filterRole
      const matchesStatus = filterStatus === "all" || user.status === filterStatus
      return matchesSearch && matchesRole && matchesStatus
    })
    .sort((a, b) => {
      let comparison = 0
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "role") {
        comparison = a.role.localeCompare(b.role)
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status)
      } else if (sortBy === "lastLogin") {
        // Simple string comparison for demo purposes
        comparison = a.lastLogin.localeCompare(b.lastLogin)
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    const getRoleBadgeClass = (role) => {
      switch (role) {
        case "admin":
          return "bg-purple-100 text-purple-800"
        case "manager":
          return "bg-blue-100 text-blue-800"
        case "cashier":
          return "bg-green-100 text-green-800"
        case "inventory":
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


    const handleSort = (field) => {
      if (sortBy === field) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
      } else {
        setSortBy(field)
        setSortOrder("asc")
      }
    }
  
    const openUserDetails = (user) => {
      setSelectedUser(user)
      setShowDetailsModal(true)
    }



  return (
    <div>
    <main className="flex-1 pb-8">
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
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
                setSelectedUser(null)
                setShowAddModal(true)
              }}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mt-4 bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                id="role-filter"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
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
                  setFilterRole("all")
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

      {/* Users Table */}
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
                     #
                  </div>
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Names
                    {sortBy === "name" && <ArrowUpDown className="ml-1 h-4 w-4 text-gray-400" />}
                  </div>
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("role")}
                >
                  <div className="flex items-center">
                    Role
                    {sortBy === "role" && <ArrowUpDown className="ml-1 h-4 w-4 text-gray-400" />}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortBy === "status" && <ArrowUpDown className="ml-1 h-4 w-4 text-gray-400" />}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("lastLogin")}
                >
                  <div className="flex items-center">
                   Phone
                    {sortBy === "lastLogin" && <ArrowUpDown className="ml-1 h-4 w-4 text-gray-400" />}
                  </div>
                  
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("savings")}
                >
                  <div className="flex items-center">
                    Savings
                    {sortBy === "savings" && <ArrowUpDown className="ml-1 h-4 w-4 text-gray-400" />}
                  </div> 
                </th>


                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => openUserDetails(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff` || "/placeholder.svg"}
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(
                        user.role,
                      )}`}
                    >
                      {user.role === "admin"
                        ? "Administrator"
                        : user.role === "manager"
                          ? "Manager"
                          : user.role === "cashier"
                            ? "Cashier"
                            : "Inventory Specialist"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        user.status,
                      )}`}
                    >
                      {user.status === "active" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
                     
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openUserDetails(user)
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
                <span className="font-medium">{filteredUsers.length}</span> of{" "}
                <span className="font-medium">{filteredUsers.length}</span> results
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

    {/* Add User Modal */}
    {showAddModal && (
        <div className="fixed z-72 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
   
            <FormikContext value={formik}>
                <Form>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-xl  leading-6 font-medium text-primary uppercase mb-4">Add New User</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name: </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md 
                          focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Enter full name"
                          name="name"
                          {...formik.getFieldProps("name")}
                        />
                        {
                          formik.errors.name && formik.touched.name && <div className="text-xs text-red-600 pt-2">*{formik.errors.name}</div>
                        }
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm  text-gray-700 mb-1">Email: </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Enter email address"
                          {...formik.getFieldProps('email')}
                        />
                         {
                          formik.errors.email && formik.touched.email && <div className="text-xs text-red-600 pt-2">*{formik.errors.email}</div>
                        }
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                         focus:ring-blue-500 focus:border-blue-500 text-sm" {...formik.getFieldProps('role')} >
                          <option value="">Choose</option>
                          <option value="admin">Administrator</option>
                          <option value="user">User</option>
                         
                        </select>
                        {
                          formik.errors.role && formik.touched.role && <div className="text-xs text-red-600 pt-2">*{formik.errors.role}</div>
                        }
                      </div>

                     

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter phone number"
                          {...formik.getFieldProps('phonenumber')}
                        />
                         {
                          formik.errors.phonenumber && formik.touched.phonenumber && <div className="text-xs text-red-600 pt-2">*{formik.errors.phonenumber}</div>
                        }
                      </div>

                     

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                          <input
                            type={`${showPass?`text`:`password`}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter password"
                            {...formik.getFieldProps('password')}
                          />
                          <button type="button" className="cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" onClick={handlePass}>
                            {
                              showPass ? <EyeIcon className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />
                            }
                          </button>
                        </div>
                      </div>

                      {
                          formik.errors.password && formik.touched.password && <div className="text-xs text-red-600">*{formik.errors.password}</div>
                        }

                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                <button
                  type="submit"
                  className="btn bg-primary flex items-center gap-2"
                >
                  <Save size={16}/>
                  <span className="text-md uppercase">Save</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-red-500 btn"
                >
                  Cancel
                </button>
              </div>
            </div>

                </Form>
            </FormikContext>
          </div>
        </div>
      )}







      {/* User Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed z-72 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg leading-6 text-primary uppercase font-bold">User Details</h3>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          selectedUser.status,
                        )}`}
                      >
                        {selectedUser.status === "active" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {selectedUser?.status?.charAt(0)?.toUpperCase() + selectedUser?.status?.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center mb-6">
                      <div className="flex-shrink-0 h-16 w-16">
                        <img
                          className="h-16 w-16 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${selectedUser.name}&background=0D8ABC&color=fff`}
                          alt={selectedUser.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-xl font-medium text-gray-900">{selectedUser.name}</div>
                        <div className="text-sm text-gray-500">{selectedUser.email}</div>
                        <span
                          className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(
                            selectedUser.role,
                          )}`}
                        >
                          {selectedUser.role === "admin"
                            ? "Administrator"
                            : selectedUser.role === "manager"
                              ? "Manager"
                              : selectedUser.role === "cashier"
                                ? "Cashier"
                                : "Inventory Specialist"}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            Phone
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedUser.phone}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Created On
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedUser.createdAt}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Department</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedUser.department}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Last Login
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedUser.lastLogin}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <Lock className="h-4 w-4 mr-1" />
                            Permissions
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {selectedUser?.permissions?.includes("all") ? (
                              <span className="text-purple-600 font-medium">Full System Access</span>
                            ) : (
                              <div className="flex flex-wrap gap-1">
                                {selectedUser?.permissions?.map((permission) => (
                                  <span
                                    key={permission}
                                    className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-800"
                                  >
                                    {permission?.charAt(0)?.toUpperCase() + permission?.slice(1)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // Handle edit action
                  }}
                  className="btn bg-primary flex gap-2 items-center"
                >
                  <EditIcon size={16}/>
                  <span>Edit User</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowDetailsModal(false)}
                  className="btn bg-red-600 "
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  </div>
  )

}