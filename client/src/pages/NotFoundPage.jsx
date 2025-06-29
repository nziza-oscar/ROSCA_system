import { Link } from "react-router-dom"
// import s404 from "../assets/404.png"
const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center h-screen">
      <div className="max-w-5xl gap-2">
        {/* <div>
          <img src={s404} alt="" />
        </div> */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
          <Link to="/" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

