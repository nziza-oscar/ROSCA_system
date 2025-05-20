import React from 'react'
import Button from './Button'
import product1 from '../../assets/image-9.png';
import product2 from '../../assets/image-10.png';
import { Link } from 'react-router-dom';
const Cart = ({cart, totals}) => {
  // console.log(totals,"sda")

  return (
    <div className="absolute left-1/2 right-1/2 transform -translate-x-1/2 sm:right-0  mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Your Cart</h3>
                      <div className="space-y-3">
                        {cart.length != 0 && cart.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="h-10 w-10 bg-gray-200 rounded">
                              <img src={item?.product?.photo?.url} alt={item.name} className='h-full' />
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">{item?.product?.name}</p>
                              <p className="text-sm text-gray-500">{item?.product?.price?.toLocaleString()} x {item?.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="my-2 pt-3 border-t border-gray-200">
                        <div className="flex justify-between text-sm font-medium">
                          <p>Subtotal</p>
                          <p>RWF {totals?.subTotal?.toLocaleString()}</p>
                        </div>
                      </div>
                      <Button className="w-full bg-primary py-2 text-white btn">
                           <Link to="/cart"> View </Link>
                      </Button>
                    </div>
                  </div>
  )
}

export default Cart