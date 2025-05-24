import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {ArrowLeft, ArrowRight} from "lucide-react"
import { Link } from 'react-router-dom';

export default function FlashSales({ products}) {
    return (
     
        <div className="relative max-w-3xl" >
          <Swiper 
                  modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]} 
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
                  breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 5 },
                    640: { slidesPerView: 2, spaceBetween: 10 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                  }}
                  slidesPerView={4} 
  
                  spaceBetween={60} 
                  loop={true} 
                  >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <Link to="/details/products" className="product-card min-w-[150px] shadow bg-white  ">
                  <div className="mb-4 bg-white rounded-md p-4 flex items-center justify-center ">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-32 object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="text-gray-500 mb-2 text-red-500 font-bold">Price {product.price}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
  
          
          <button  className="prev-btn absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 bg-amber-500 text-white rounded-full 
                  shadow-md flex items-center justify-center z-10  cursor-pointer">
                      <ArrowLeft className='text-white'/>
                  </button>
                  <button  className="next-btn absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 bg-amber-500 rounded-full 
                  shadow-md flex items-center justify-center z-10 cursor-pointer text-white">
                      <ArrowRight/>
                  </button>
  
        </div>
  
    );
  }
  