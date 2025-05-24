import { Trash, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ShoppingCart = ({ cartItems, subtotal, deliveryFee, total, decrementQuantity, incrementQuantity, removeItem, newCart, loading, error }) => {
  // console.log(cartItems)

  return (
    <div className="w-5/6 mx-auto">
      <h1 className="text-2xl font-bold text-orange-500 mt-8 mb-3 uppercase">Shopping cart</h1>

          <p className='text-red-500 text-sm font-bold py-2' > * {error}</p>
      <div className="flex flex-col flex-col-reverse  lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-4">
          { cartItems.length !== 0 && cartItems.map((item,index) => (
            <div key={index} className="border border-gray-100 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32">
                  <img src={item.product.photo.url} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                 <div className="flex items-center gap-2">
                   <p className="text-orange-500  font-bold">{item.price} FRW</p>
                   <p>x</p>
                   <p>{item.quantity}</p>
                 </div>
                  <div className="flex items-center gap-4 mt-4">
                    <button onClick={() => decrementQuantity(item.product._id)} className="btn flex items-center justify-center rounded hover:bg-gray-100 bg-primary">
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.product._id)} className="btn flex items-center justify-center rounded hover:bg-gray-100 bg-primary">
                      <Plus size={16} />
                    </button>
                  </div>
                  
                </div>
                <div>
                <button onClick={() => removeItem(item.product._id)} className="btn bg-red-500">
                   { loading ? "Removing.." : <Trash size={15} /> }
                    
                  </button>
                </div>
              </div>
            </div>
          ))}
          {
            !cartItems.length && <p>No items in cart</p>
          }
        </div>

        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col gap-3">
              {
                newCart.length != 0 && <button className="btn bg-blue-500 text-sm p-1">Update Cart</button>
              }
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Item Subtotal</span>
                <span className="font-medium">{subtotal.toLocaleString()} FRW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">{deliveryFee.toLocaleString()} FRW</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-900 font-medium">Total</span>
                  <span className="font-bold">{total.toLocaleString()} FRW</span>
                </div>
              </div>
              <Link to="/checkout">
              <button className="btn w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors block text-center">
                
                    Go to checkout
              </button>
                </Link>
              <p className="text-sm text-gray-600 mt-4">
                By placing your order, you agree to our
                <a href="/terms" className="text-blue-600 hover:underline"> Terms of Service </a>
                and
                <a href="/privacy" className="text-blue-600 hover:underline"> Privacy Policy</a>
              </p>
              <a href="https://wa.me/" className="inline-flex items-center text-green-600 hover:text-green-700">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Contact us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
