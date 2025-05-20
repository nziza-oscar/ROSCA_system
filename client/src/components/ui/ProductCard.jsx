import React,{useState} from 'react'
import { Heart, HeartIcon, ShoppingCart, Star, StarIcon } from "lucide-react"
import { Link } from "react-router-dom"

const ProductCard = ( { product }) => {

    const [favorite,setFavorite] = useState([])
  
  const handleFavorite = (product)=>{
    const isExist = favorite.find((p)=>p == product.id)
    console.log(isExist)
    if(isExist){
        const f = favorite.filter((p)=>p == isExist.id)
        setFavorite(f)
    }
    else{
      setFavorite((prev)=>[...prev,product.id])
    }
  }


  return (
    <div  className="bg-white rounded-lg py-2  shadow-sm hover:shadow-md transition-shadow relative">
              <button className="absolute right-2 top-2" onClick={()=>handleFavorite(product)}>
              {
                    favorite.includes(product.id) ? <svg width="30" height="30" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>:<HeartIcon/>
                  
                   }
              </button>
              <Link to={`/details/${product._id}`}>
                <img
                  src={product?.photo?.url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-32 mx-auto h-32 object-contain mb-4"
                />
                <div className="px-2">
                <h3 className="text-gray-800 font-medium text-sm mb-2">{product.name}</h3>
                </div>
            
                <div className="flex items-end justify-between px-2">
                    <div className='flex-1'>
                        <p className="text-orange-500 font-bold">{product.price.toLocaleString()} FRW</p>
                        <div className='flex gap-2 py-2 justify-around '>
                            <div className='flex gap-1 items-center'>
                                <StarIcon size={14} className='font-bold text-yellow-500' />
                                <p className='text-xs'>1.5</p>
                            </div>
                            <small className='text-xs text-gray-500'>45 orders</small>
                        </div>
                    </div>
                    <button className="mt-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <ShoppingCart size={16}/>
                    </button>
                </div>
                </Link>
            </div>
  )
}

export default ProductCard