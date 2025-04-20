import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-orange-500">404</h1>
      <p className="text-2xl md:text-3xl font-semibold my-4">Oops! Page doesn't exist.</p>
      <p className="text-gray-500 mb-6">The page you're looking for might have been removed or is temporarily unavailable.</p>
      <Link to="/" className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
        Go to Home
      </Link>
    </div>
  );
}

export default Notfound;