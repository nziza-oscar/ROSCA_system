"use client"

import { EllipsisVertical, Eye } from "lucide-react"
import { useState } from "react"


export default function ProductCard({ product, onDelete, onUpdate, onViewOrders }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      onDelete(product.id)
      setIsLoading(false)
      setIsDropdownOpen(false)
    }, 500)
  }

  const handleUpdate = () => {
    onUpdate(product.id)
    setIsDropdownOpen(false)
  }

  const handleViewOrders = () => {
    onViewOrders(product.id)
    setIsDropdownOpen(false)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product img */}
      <div className="relative aspect-square">
        <img
          src={product.photo.url || ""}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      {
        product.quantity > 0 ? <span className="absolute right-2 top-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
        {product.quantity} Instock
      </span> : 
      <span className="absolute right-2 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
         Outstock
      </span>

      }
        
        
      </div>

      {/* Product Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
          </div>

          {/* Dropdown Menu */}
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-1 rounded-full hover:bg-blue-100 cursor-pointer text-blue-600">
               <EllipsisVertical/>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1 text-sm">
                  <p className="px-4 py-2 text-gray-500 font-medium border-b border-gray-100">Actions</p>

                  <button
                    onClick={handleUpdate}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Update
                  </button>

                  <button
                    onClick={handleViewOrders}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    View Orders
                  </button>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={handleDelete}
                    className="flex items-center w-full px-4 py-2 hover:bg-red-50 text-red-600 text-left"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Footer */}
      <div className="flex justify-between items-center p-4 pt-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-gray-500">{product.price} FRW</span>
{/*          
            {product.quantity > 0 ?  
                  <span className="text-xs text-green-600 font-bold">{product.quantity} in stock</span> 
                  :  <span className="text-xs text-gray-600">Out of stock</span> }
        */}
       
        </div>
        {/* <button
          className={`px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
            <Eye size={16}/>
        </button> */}
      </div>
    </div>
  )
}
