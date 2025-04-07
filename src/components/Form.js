import React from 'react';
import { Link } from 'react-router-dom';

const Form = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-blue-600 mb-10 text-center animate-fade-in">
        WELCOME
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none">
        <Link to="/signup" className="w-full sm:w-60">
          <button className="w-full py-3 text-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transform transition duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-800">
            Sign Up
          </button>
        </Link>
        <Link to="/login" className="w-full sm:w-60">
          <button className="w-full py-3 text-lg rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg transform transition duration-300 hover:scale-105 hover:from-green-600 hover:to-green-800">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Form;
