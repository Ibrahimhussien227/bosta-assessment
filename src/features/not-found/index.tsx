import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-300 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Oops! Page not found
      </h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
      <div className="mt-10">
        <img
          src="https://undraw.co/api/illustrations/404-page"
          alt="404 illustration"
          className="max-w-xs mx-auto"
        />
      </div>
    </div>
  );
}
