import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-red-200 text-center p-6">
      <img
        src="https://i.ibb.co/2nFjz5h/404.png"
        alt="404 Not Found"
        className="w-72 md:w-96 mb-6"
      />
      <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! The page you are looking for doesn't exist.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow transition"
      >
        <FaArrowLeft /> Go Back Home
      </Link>
    </div>
  );
};

export default Error;
