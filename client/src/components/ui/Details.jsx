import React,{useEffect, useState} from 'react'
import { trendingProducts } from "../../assets";
import product3 from "../../assets/image-6.png"
import product6 from "../../assets/image-9.png"
import product5 from "../../assets/image-8.png"
import product7 from "../../assets/image-10.png"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus } from 'lucide-react';
import { addToCartThunk } from '../../actions/dashboard';
import { minimizeLongText } from '../../tools';

const Details = ({product, similarProducts}) => {
    
    const {loading} = useSelector((state)=>state.products)
    const { cart } = useSelector((state)=>state.cart)
    const [showReturns,setShowReturns] = useState(false)
    const dispatch = useDispatch()

    const limit = 8;
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = ()=>{
        if(window.confirm("Are you sure? to this item to your cart")){
             const data = {quantity: quantity, productId: product._id}
             dispatch(addToCartThunk(data))
        }

    }


    



    useEffect(()=>{
        if(quantity > limit){
             alert("You have reached the limit of 8")
             setQuantity(1)
        }
    },[quantity])
    
    useEffect(()=>{
            if(cart){
                if(cart.items){
                    const findProductInCart =  cart.items.find((p)=>p.product._id == product._id)
                    if(findProductInCart){
                        setQuantity(findProductInCart.quantity)
                    }
                }
            }
    },[product, cart])


  return (
    <div className="flex flex-col lg:flex-row gap-8">
    <div className="lg:w-2/3">
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-orange-500 mb-6">Product details</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <div className="bg-white rounded-lg mb-4 square">
                        <img src={product?.photo?.url} alt="Product" className="w-full object-fit" />
                    </div>
              
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-xl font-semibold mb-2">{product?.name}</h2>
                    <p className="text-gray-600 mb-4">{product?.description}</p>
                    <p className="text-2xl font-bold text-blue-600 mb-4">{product?.price?.toLocaleString()} RWF</p>
                  
                    <div className="flex items-center gap-4 mb-6">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 cursor-pointer bg-red-500 text-white hover:bg-red-600 rounded-full">-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 text-white  rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 ">+</button>
                    </div>
                    <div className="flex gap-4">
                        <button className="btn flex-1 bg-blue-400 text-blue-600 rounded-full " onClick={handleAddToCart}>Add to cart</button>
                        <button className="btn flex-1 bg-primary text-white py-3 px-6 rounded-full ">Buy now</button>
                    </div>
                    <div className="py-2">
                        <div className="flex justify-between py-2 cursor-pointer" onClick={()=>setShowReturns((prev)=>!prev)}>
                            <h3 className='text-blue-500  font-bold'># Returns </h3>
                            <button className='bg-gray-100 p-2 rounded cursor-pointer'> { showReturns ? <Minus size={16}/> : <Plus size={16}/> } </button>
                        </div>
                       {
                        showReturns &&  <ol className='list-decimal px-4 text-sm text-gray-600 space-y-1 py-2'>
                        <li>Easy return requests</li>
                        <li>Pre-paid shipping label included</li>
                        <li>10% restocking fee for returns</li>
                        <li>60 day return window</li>
                    </ol>
                       }
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-lg py-6 px-2 shadow-sm">
            <div className="flex justify-between">
                <h2 className="text-md  text-slate-500 mb-6 uppercase font-bold px-3">Similar Products</h2>
                <Link to="?type=product" className="text-sm  text-blue-400">View All</Link>
            </div>
            <div className="space-y-4 ">
                {
                    loading ? <div>Loading....</div> : similarProducts.map((product)=>(
                        <Link to={`/details/${product._id}`} key={product._id} className="flex items-center gap-4 bg-white p-2 rounded">
                        <img src={product.photo.url} alt={product.name} className="w-16 rounded-lg" />
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-800 pb-2 ">{product.name}</h3>
                            <p className='text-xs'>{minimizeLongText(product.description, 25)}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-medium text-primary  ">{product.price.toLocaleString()} FRW</p>
                        </div>
                        
                    </Link>
                    ))
                    
                }
            </div>
        </div>
    </div>

    
</div>
  )
}

export default Details