import React, { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";

const DropMenu = ({ children, buttonClass = "" }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        className={`w-8 h-8 flex justify-center items-center rounded-full shadow-sm cursor-pointer hover:bg-gray-100 ${buttonClass}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <EllipsisVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-10  top-0 z-40 mt-2 border border-gray-100 bg-white rounded 
        shadow p-2 flex flex-col gap-2 min-w-[160px]">
          {children}
        </div>
      )}
    </div>
  );
};

export default DropMenu;
