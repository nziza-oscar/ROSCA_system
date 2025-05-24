import React, { createContext, useContext, useState, useRef, useEffect } from "react"

const SelectContext = createContext(null)

export function Select({ children, defaultValue, value, onValueChange }) {
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || "")
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])
  
  const handleSelect = (value) => {
    setSelectedValue(value)
    if (onValueChange) {
      onValueChange(value)
    }
    setOpen(false)
  }
  
  return (
    <SelectContext.Provider value={{ selectedValue, open, setOpen, handleSelect }}>
      {children}
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className = "", ...props }) {
  const { open, setOpen, selectedValue } = useContext(SelectContext)
  
  return (
    <button
      type="button"
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  )
}

export function SelectValue({ placeholder }) {
  const { selectedValue } = useContext(SelectContext)
  
  return (
    <span className="truncate">
      {selectedValue || placeholder}
    </span>
  )
}

export function SelectContent({ children, className = "", ...props }) {
  const { open, setOpen } = useContext(SelectContext)
  const ref = useRef(null)
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setOpen])
  
  if (!open) return null
  
  return (
    <div 
      ref={ref}
      className={`absolute z-50 min-w-[20rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md animate-in fade-in-80 ${className}`}
      {...props}
    >
      <div className="p-1">
        {children}
      </div>
    </div>
  )
}

export function SelectItem({ children, value, className = "", ...props }) {
  const { selectedValue, handleSelect } = useContext(SelectContext)
  const isSelected = selectedValue === value
  
  return (
    <div
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-gray-100 ${isSelected ? 'bg-gray-100' : ''} ${className}`}
      onClick={() => handleSelect(value)}
      {...props}
    >
      <span>{children}</span>
      {isSelected && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="h-4 w-4 ml-auto"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
    </div>
  )
}
