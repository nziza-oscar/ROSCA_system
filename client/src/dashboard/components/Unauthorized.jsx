import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
        <div className="flex justify-center mb-4">
          <Lock className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
