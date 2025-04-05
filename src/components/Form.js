import React from 'react'; 
import { Link } from 'react-router-dom';

const Form = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl md:text-8xl font-extrabold text-blue-600 mb-10 animate-fade-in">WELCOME</h1>
      <div className="flex justify-center gap-6">
        <Link to="/signup">
          <button className="w-60 py-3 text-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transform transition duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-800">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="w-60 py-3 text-lg rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg transform transition duration-300 hover:scale-105 hover:from-green-600 hover:to-green-800">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Form;
