"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"

export default function CategorySidebar({ categories }) {
  const [expandedCategories, setExpandedCategories] = useState({})

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  return (
    <div className="w-full md:w-64 shrink-0">
      <h2 className="text-xl font-bold mb-4 text-gray-700">CATEGORIES</h2>
      <div className="space-y-1">
        {categories.map((category, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => toggleCategory(category.name)}
              className="flex items-center justify-between py-2 px-3 w-full text-left hover:bg-gray-100 rounded-md"
            >
              <span>{category.name}</span>
              {expandedCategories[category.name] ? (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {/* Subcategories */}
            {expandedCategories[category.name] && (
              <div className="ml-4 pl-2 border-l border-gray-200 mb-2">
                {category.subcategories.map((subcategory, subIndex) => (
                  <a
                    key={subIndex}
                    href="#"
                    className="block py-1.5 px-3 text-sm text-gray-600 hover:text-blue-500 hover:bg-gray-50 rounded"
                  >
                    {subcategory}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

