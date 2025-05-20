import { Search  } from "lucide-react"

const SearchInput = ({query,handleSearch}) => {

  return (
    <div className="relative w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-500" />
        </div>

        <input className="block w-full pl-10 pr-3 py-2 border border-gray-300 
        rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none 
        focus:ring-purple-500 focus:border-purple-500 sm:text-sm" 
        placeholder="Search..." type="text" value={query} onChange={handleSearch}/>
    
    </div>
  )
}

export default SearchInput