"use client"

import { useState } from "react"
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  DollarSign,
  Smartphone,
  Gift,
  Package,
  X,
  BarChart3,
  Users,
  Settings,
  Menu,
  Bell,
} from "lucide-react"

export default function POSSalesInterface() {
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [amountReceived, setAmountReceived] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Sample product data
  const products = [
    {
      id: "P-1001",
      name: "Organic Coffee Beans",
      category: "beverages",
      price: 12.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1002",
      name: "Wireless Earbuds",
      category: "electronics",
      price: 59.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1003",
      name: "Cotton T-Shirt",
      category: "apparel",
      price: 24.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1004",
      name: "Stainless Steel Water Bottle",
      category: "accessories",
      price: 19.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1005",
      name: "Bluetooth Speaker",
      category: "electronics",
      price: 45.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1006",
      name: "Yoga Mat",
      category: "fitness",
      price: 29.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1007",
      name: "Protein Powder",
      category: "nutrition",
      price: 34.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1008",
      name: "Leather Wallet",
      category: "accessories",
      price: 39.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1009",
      name: "Scented Candle",
      category: "home",
      price: 15.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1010",
      name: "Notebook Set",
      category: "stationery",
      price: 9.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1011",
      name: "Facial Cleanser",
      category: "beauty",
      price: 22.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "P-1012",
      name: "Ceramic Mug",
      category: "home",
      price: 8.99,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  // Categories
  const categories = [
    { id: "all", name: "All Products" },
    { id: "beverages", name: "Beverages" },
    { id: "electronics", name: "Electronics" },
    { id: "apparel", name: "Apparel" },
    { id: "accessories", name: "Accessories" },
    { id: "fitness", name: "Fitness" },
    { id: "nutrition", name: "Nutrition" },
    { id: "home", name: "Home" },
    { id: "beauty", name: "Beauty" },
    { id: "stationery", name: "Stationery" },
  ]

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || product.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxRate = 0.08
  const tax = subtotal * taxRate
  const total = subtotal + tax

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Process payment
  const processPayment = () => {
    // In a real app, this would handle payment processing
    console.log("Processing payment:", {
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod,
      amountReceived: Number.parseFloat(amountReceived) || 0,
      customerName,
    })

    // Reset state
    setCart([])
    setShowPaymentModal(false)
    setPaymentMethod("card")
    setAmountReceived("")
    setCustomerName("")
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
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700"
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
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                  <p className="text-xs font-medium text-gray-500">Store Manager</p>
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
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-blue-50 text-blue-700"
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
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                  Search Products
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 ml-3" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-10 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search products by name or ID..."
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

        <main className="flex-1 flex overflow-hidden">
          {/* Product catalog */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Categories */}
            <div className="bg-white border-b border-gray-200">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="py-3 flex items-center overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-3 py-1.5 mr-2 text-sm font-medium rounded-md whitespace-nowrap ${
                        activeCategory === category.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8 bg-gray-50">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => addToCart(product)}
                  >
                    <div className="p-4 flex flex-col items-center">
                      <div className="w-20 h-20 mb-3 flex items-center justify-center">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="max-h-full max-w-full"
                        />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 text-center">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{product.id}</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart sidebar */}
          <div className="w-full md:w-96 flex-shrink-0 border-l border-gray-200 bg-white flex flex-col">
            <div className="h-16 flex-shrink-0 px-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Current Sale</h2>
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-800 flex items-center">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </button>
              )}
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
                  <p className="text-sm text-gray-500">Add products by clicking on them in the catalog</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.id}</p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-2 text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Cart summary */}
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between text-base text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base text-gray-900">
                <p>Tax (8%)</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={cart.length === 0}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Payment</h3>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name (Optional)</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter customer name"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className={`flex flex-col items-center justify-center p-3 border rounded-md ${
                            paymentMethod === "card" ? "bg-blue-50 border-blue-500" : "border-gray-300"
                          }`}
                        >
                          <CreditCard
                            className={`h-6 w-6 ${paymentMethod === "card" ? "text-blue-500" : "text-gray-500"}`}
                          />
                          <span className="text-xs mt-1">Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("cash")}
                          className={`flex flex-col items-center justify-center p-3 border rounded-md ${
                            paymentMethod === "cash" ? "bg-blue-50 border-blue-500" : "border-gray-300"
                          }`}
                        >
                          <DollarSign
                            className={`h-6 w-6 ${paymentMethod === "cash" ? "text-blue-500" : "text-gray-500"}`}
                          />
                          <span className="text-xs mt-1">Cash</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("mobile")}
                          className={`flex flex-col items-center justify-center p-3 border rounded-md ${
                            paymentMethod === "mobile" ? "bg-blue-50 border-blue-500" : "border-gray-300"
                          }`}
                        >
                          <Smartphone
                            className={`h-6 w-6 ${paymentMethod === "mobile" ? "text-blue-500" : "text-gray-500"}`}
                          />
                          <span className="text-xs mt-1">Mobile</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("gift")}
                          className={`flex flex-col items-center justify-center p-3 border rounded-md ${
                            paymentMethod === "gift" ? "bg-blue-50 border-blue-500" : "border-gray-300"
                          }`}
                        >
                          <Gift className={`h-6 w-6 ${paymentMethod === "gift" ? "text-blue-500" : "text-gray-500"}`} />
                          <span className="text-xs mt-1">Gift Card</span>
                        </button>
                      </div>
                    </div>

                    {paymentMethod === "cash" && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount Received</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            value={amountReceived}
                            onChange={(e) => setAmountReceived(e.target.value)}
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                          />
                        </div>
                        {Number.parseFloat(amountReceived) > total && (
                          <div className="mt-2 text-sm text-gray-700">
                            Change due: ${(Number.parseFloat(amountReceived) - total).toFixed(2)}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="bg-gray-50 p-3 rounded-md mb-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900 pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={processPayment}
                  disabled={paymentMethod === "cash" && (Number.parseFloat(amountReceived) < total || !amountReceived)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Complete Sale
                </button>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
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
    