import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-2xl text-gray-700 mb-4">Oops! Page not found.</p>
        <p className="text-lg text-gray-500 mb-6">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="bg-blue-500 text-white text-lg px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
