import { useEffect, useState } from "react"
import {
  CreditCard,
  Package,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react"
import PersonalInfo from "../components/ui/PersonalInfo"
import Addresses from "../components/ui/Addresses"
import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../components/ui/Sidebar"
import { updateUserInfoThunk } from "../actions/users"
import { clearSuccessError } from "../reducers/users/authSlice"
function Profile() {
  const [activeTab, setActiveTab] = useState("personal-info")
  const [showAddress,setShowAddress] = useState(false)
  const {user, loading, success, error } = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  const handleUpdate = (data)=>{
     dispatch(updateUserInfoThunk(data))
  }
  // Mock user data


  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return (
          <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Delivered
          </span>
        )
      case "processing":
        return (
          <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </span>
        )
      case "cancelled":
        return (
          <span className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded text-xs">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </span>
        )
      default:
        return null
    }
  }

 

  useEffect(()=>{

    window.scrollTo({
      top:0,
      left:0,
      behavior:'smooth'
    })

     if(success){
        const timeout =  setTimeout(()=>{
          dispatch(clearSuccessError())
        },2000)
        return ()=> clearTimeout(timeout)
     }

},[success,error,dispatch])




  if(!user){
    return <p>Wait a moment...</p>
  }

  return (
    <div className="max-w-7xl mx-auto  px-4 my-2 py-2 rounded">
      <h1 className="text-2xl font-bold mb-6 text-primary">My Profile</h1>
        
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Sidebar user={user} setActiveTab={setActiveTab} activeTab={activeTab}/>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Personal Info */}
          {activeTab === "personal-info" && (
             <PersonalInfo user={user} handleUpdate={handleUpdate} loading={loading} error={error} success={success}/>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">My Orders</h2>
                <p className="text-sm text-gray-500 mt-1">View and track your orders</p>
              </div>

              <div className="p-6">
                {user.orders.length > 0 ? (
                  <div className="space-y-6">
                    {user.orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Order ID</p>
                            <p className="font-medium">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">{order.date}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-medium">{order.total}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <div className="mt-1">{getStatusBadge(order.status)}</div>
                          </div>
                          <div>
                            <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50">
                              View Details
                            </button>
                          </div>
                        </div>

                        <div className="p-4 border-t border-gray-200">
                          <h3 className="font-medium mb-3">Order Items</h3>
                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center">
                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-gray-900">{item.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
                    <div className="mt-6">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                        Browse Products
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Addresses */}
          {activeTab === "addresses" && (
            <Addresses user={user} show={showAddress} setShow={()=>setShowAddress((prev)=>!prev)} success={success} error={error}/>
          )}

          {/* Payment Methods */}
          {activeTab === "payment" && (
            <div className="bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-semibold">Payment Methods</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage your payment methods</p>
                </div>
             
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {user.paymentMethods && user.paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                          <CreditCard className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{method.name}</h3>
                          <p className="text-sm text-gray-500">
                            {method.type === "Credit Card" ? `Expires ${method.expiryDate}` : method.number}
                          </p>
                          {method.isDefault && (
                            <span className="inline-block mt-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">Edit</button>
                        {!method.isDefault && (
                          <>
                            <span className="text-gray-300">|</span>
                            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                              Set as Default
                            </button>
                            <span className="text-gray-300">|</span>
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Notification Preferences</h2>
                <p className="text-sm text-gray-500 mt-1">Manage how you receive notifications</p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-gray-500">Receive updates about your orders</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotions and Deals</p>
                          <p className="text-sm text-gray-500">Receive special offers and discounts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Account Updates</p>
                          <p className="text-sm text-gray-500">Receive updates about your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium mb-4">SMS Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-gray-500">Receive SMS updates about your orders</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotions and Deals</p>
                          <p className="text-sm text-gray-500">Receive SMS for special offers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Security Settings</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your account security</p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your current password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium mb-4">Login Sessions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-gray-500">Kigali, Rwanda • Chrome on Windows</p>
                          <p className="text-xs text-green-600 mt-1">Active now</p>
                        </div>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">End Session</button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-gray-500">iPhone 15 Pro • iOS 17</p>
                          <p className="text-xs text-gray-500 mt-1">Last active: 2 hours ago</p>
                        </div>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">End Session</button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Log out of all sessions
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

