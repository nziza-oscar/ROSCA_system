
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
              Welcome to <span translate="no" className="font-bold">Ishema Saving Group</span> where your savings are safe, simple, and always within reach. Whether you save daily or randomly, Ishema is here to help you grow your money and access it whenever you need it. Join a trusted community built on accountability, transparency, and empowerment. Your financial freedom starts here.
            </p>
            <div className="flex space-x-4">

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">Sign In</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-blue-600 mb-16">ABOUT</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden lg:block rounded-lg">
             <img src={img2} className="w-"/>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <p className="mb-8">
                <span translate="no" className="font-bold">Ishema Saving Group</span> is a community-driven financial support system designed to make saving money easy and reliable for everyone. We offer a flexible savings model where members can contribute daily or whenever they choose. 
              </p>
              <p>
             Members have full access to their savings records, including deposits and withdrawals, empowering them with transparency and control over their finances.
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
