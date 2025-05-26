
import { Mail, Phone, MessageCircle } from "lucide-react"
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto">
      {/* Navigation Bar */}
    
      {/* Welcome Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto flex   gap-9">
         <div className="hidden lg:block rounded-lg">            
  <img src={img1} alt="not found" className="w-[1000px]" />
</div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600 mb-6">WELCOME</h2>
            <p className="mb-6">
              It is a long established fact that are reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using'
            </p>
            <p className="mb-6">Content here, content here', making it look like readable English</p>
            <div className="flex space-x-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">Learn more</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">Sign In</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-blue-600 text-center mb-16">ABOUT</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden lg:block rounded-lg">
             <img src={img2} className="w-"/>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <p className="mb-8">
                We are is a long established fact that a reader will be distracted by the readable content of a page
                when looking at its layout The point of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters,
              </p>
              <p>
                We are is a long established fact that a reader will be distracted by the readable content of a page
                when looking at its layout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-blue-600 text-center mb-16">CONTACT US</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-16">
            <div className="flex items-center text-sm">
              <Mail className="text-gray-500 mr-3" size={26} />
             <div className="block ">
                <span className="text-gray-600 block text-xs">rutagengwaaugustin6422@gmai.com</span>
                <span className="text-gray-600 block text-xs">stevenbyiringiro700@gmai.com</span>
             </div>
            </div>
            <div className="flex items-center">
              <Phone className="text-gray-500 mr-3" size={16} />
              <div className="block">
                <span className="text-gray-600 text-xs block">+250 780 389 968</span>
                <span className="text-gray-600 text-xs block">+250 784 176 888</span>
              </div>
            </div>
            <div className="flex items-center">
              <MessageCircle className="text-green-500 mr-3" size={16} />
              <span className="text-gray-600">+250 780 389 968</span>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  )
}
